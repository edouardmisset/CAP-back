const request = require('supertest')
const faker = require('faker')
const app = require('../app')
const AscentModel = require('../models/AscentModel')

const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const gradeTable = ['7a', '7a+', '7b', '7b+', '7c', '7c+', '8a']

const cragTable = [
  'Buoux',
  'Saint-Léger',
  'Balme de Yenne',
  'Saussois',
  'Calanques',
  'Siurana',
]

const getValidAttributes = () => ({
  routeName: faker.random.words(randomIntFromInterval(1, 3)),
  topoGrade: gradeTable[randomIntFromInterval(0, gradeTable.length - 1)],
  date: faker.date.between('2015/01/01', new Date()),
  crag: cragTable[randomIntFromInterval(0, cragTable.length - 1)],
  climber: `${faker.name.firstName()} ${faker.name.lastName()}`,
  routeOrBoulder: 'route',
  numberOfTries: randomIntFromInterval(1, 10),
})

const createRecord = async (attributes = {}) =>
  AscentModel.create({ ...getValidAttributes(), ...attributes })

let res

describe(`GET /ascents`, () => {
  describe('When there is no data', () => {
    beforeEach(async () => {
      res = await request(app).get('/ascents')
    })

    it('status is 200', async () => {
      expect(res.status).toBe(200)
    })
    it('the returned body is an empty array', async () => {
      expect(Array.isArray(res.body))
      expect(res.body.length).toBe(0)
    })
  })

  describe('When there are ascents in the DB', () => {
    ;(async () => {
      await createRecord()
      await createRecord()
      await createRecord()
      res = await request(app).get('/ascents')
    })()

    it('status is 200', async () => {
      expect(res.status).toBe(200)
    })
    it('the returned body is empty containg 3 elements', async () => {
      expect(Array.isArray(res.body))
      expect(res.body.length).toBe(3)
    })
    it('the returned elements have expected properties', async () => {
      const expectedProps = [
        'routeName',
        'topoGrade',
        'date',
        'crag',
        'climber',
        'routeOrBoulder',
        'numberOfTries',
      ]
      res.body.forEach((element) => {
        expectedProps.forEach((prop) => {
          expect(element[prop]).not.toBe(undefined)
        })
      })
    })
  })
})
