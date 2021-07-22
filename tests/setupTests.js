require('dotenv').config()
// Make sure the test DB is used
process.env.DATABASE_URL = process.env.DATABASE_URL_TEST

const db = require('../db')
const app = require('../app')

const dbUrlregex =
  /^(?:([^:/?#\s]+):\/{2})?(?:([^@/?#\s]+)@)?([^/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/
const dbName = process.env.DATABASE_URL_TEST.match(dbUrlregex)[4].split('/')[0]

const deleteAllDBData = async () => {
  try {
    // Special fast path to drop data from a postgres database.
    // This is an optimization which is particularly crucial in a unit testing context.
    // This code path takes milliseconds, vs ~7 seconds for a migrate reset + db push
    for (const { tablename } of await db.$queryRaw(
      `SELECT tablename FROM pg_tables WHERE schemaname='${dbName}'`
    )) {
      console.log(tablename)
      await db.$queryRaw(`TRUNCATE TABLE "${dbName}"."${tablename}" CASCADE;`)
    }
    for (const { relname } of await db.$queryRaw(
      `SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='${dbName}';`
    )) {
      await db.$queryRaw(
        `ALTER SEQUENCE "${dbName}"."${relname}" RESTART WITH 1;`
      )
    }
  } catch (error) {
    console.log({ error })
  }
}

const closeApp = () =>
  new Promise((resolve, reject) => {
    app.close((err) => {
      if (err) reject(err)
      else setTimeout(resolve, 0) // Jest seem to detect open handles when they aren't any... Or is it app.close() that triggers the callback before the handle is actually freed ? https://nodejs.org/api/http.html#http_server_close_callback
    })
  })

beforeAll(deleteAllDBData)
afterEach(deleteAllDBData)
afterAll(async () => {
  await db.$disconnect()
  await closeApp()
})
