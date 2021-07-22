// const prisma = require('../db')
const AscentModel = require('../models/AscentModel')

// Table of ascents objects
const ascentList = [
  {
    routeName: 'Bodybuilder',
    topoGrade: '7a',
    date: new Date('2015-08-01'),
    crag: 'Gorges de la Jonte',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 5,
  },
  {
    routeName: 'Le Plongeoir',
    topoGrade: '7b',
    date: new Date('2015-08-02'),
    crag: 'Gorges de la Jonte',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 5,
  },
  {
    routeName: 'Siegfried Gauche',
    topoGrade: '7a',
    date: new Date('2017-06-25'),
    crag: 'Vieux-Château',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 1,
  },
  {
    routeName: 'Highway Paradise',
    topoGrade: '7b+',
    date: new Date('2017-08-04'),
    crag: 'Bouilland',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 1,
  },
  {
    routeName: 'Ballade pour Vincent',
    topoGrade: '7a+',
    date: new Date('2018-03-25'),
    crag: 'Calanques',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 1,
  },
  {
    routeName: 'Le Loire',
    topoGrade: '7a',
    date: new Date('2018-06-17'),
    crag: 'Buoux',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 2,
  },
  {
    routeName: 'Cococaline',
    topoGrade: '7a+',
    date: new Date('2018-06-17'),
    crag: 'Buoux',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 1,
  },
  {
    routeName: 'Exquise Esquisse',
    topoGrade: '7b',
    date: new Date('2018-06-18'),
    crag: 'Buoux',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 1,
  },
  {
    routeName: 'Baby',
    topoGrade: '8a',
    date: new Date('2018-11-03'),
    crag: 'Siurana',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 3,
  },
  {
    routeName: 'Cannibale',
    topoGrade: '8a+',
    date: new Date('2020-10-04'),
    crag: 'Balme de Yenne',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 10,
  },
  {
    routeName: "L'homme faible du moment",
    topoGrade: '8a',
    date: new Date('2019-03-23'),
    crag: 'Beausoleil',
    climber: 'Edouard Misset',
    routeOrBoulder: 'route',
    numberOfTries: 10,
  },
]

module.exports = async function seed() {
  // Create default user
  // await prisma.user.create({
  //   username: process.env.USERNAME,
  //   password: process.env.PASSWORD,
  // })

  // Create a few ascents
  // await Promise.all(
  //   ascentList.map(async (ascent) => AscentModel.create({ ...ascent }))
  // )
  console.log(ascentList[0])
  await AscentModel.create({ ...ascentList[0] })
}
