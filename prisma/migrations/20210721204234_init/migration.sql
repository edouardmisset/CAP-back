-- CreateTable
CREATE TABLE "Ascent" (
    "id" SERIAL NOT NULL,
    "routeName" VARCHAR(255) NOT NULL,
    "topoGrade" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "crag" VARCHAR(255) NOT NULL,
    "climber" VARCHAR(255) NOT NULL,
    "routeOrBoulder" VARCHAR(255) NOT NULL,
    "numberOfTries" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(100),
    "password" VARCHAR(100) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
