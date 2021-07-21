// const requireCurrentUser = require('../middlewares/requireCurrentUser')
// const authRouter = require('./auth')
// const currentUserRouter = require('./currentUser')
const ascentsRouter = require('./ascents')

module.exports = (app) => {
  // app.use('/auth', authRouter)
  // app.use('/currentUser', requireCurrentUser, currentUserRouter)
  app.use('/ascents', ascentsRouter)
}
