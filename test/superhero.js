//Contains the test-cases 
const expect = require('chai').expect;

const baseUrl = require('../helper/config.js').baseUrl;
const userMock = require('../mocks/users.js');
const validator = require('../helper/validators.js');
const queries = require('../helper/queries.js');

const superheroId = '2';

describe('Superhero API Suite', function () {
    describe('GET Request', function () {
        it.only('Should Get Superhero', async function () {
            const user = userMock.user;
            const { body, status } = await queries.get(baseUrl, 'superhero/' + superheroId);

            expect(status).to.equal(200);
            validator.dataValidator(user, body);
        });
    });

    describe.only('POST Request', function () {
        let superheroCreatedId;

        it('Should Create Superhero', async function () {
            const { body, status } = await queries.post(baseUrl, 'superhero/', userMock);

            expect(status).to.equal(201);
            validator.dataTypeValidator(body);
            superheroCreatedId = body.id;
        });

        //Verify the details of created superhero
        after(async function () {
            const { body, status } = await queries.get(baseUrl, 'superhero/' + superheroCreatedId);

            expect(status).to.equal(200);
        });
    });

    describe('PUT Request', function () {
        let name = userMock.name;
        let fName = userMock.fName;
        let lName = userMock.lName;
        let age = userMock.age;
        let powers = userMock.powers;
        let killerNew = userMock.killerTrue;
        let killerOld = userMock.killerFalse;
        let idOfCreatedSuperhero;

        //Create a new Superhero
        before(async function () {
            let requestBody = getRequestBody(name, fName, lName, age, powers, killerOld)
            let res = await queries.post(baseUrl, 'superhero/', requestBody);
            console.log(res.body);
            res.status.should.equal(201);
            idOfCreatedSuperhero = res.body.id;
        });

        //Modify the created superhero details
        it('Should Update Superhero', async function () {
            let requestBody = getRequestBody(name, fName, lName, age, powers, killerNew)
            let res = await queries.put(baseUrl, 'superhero/' + idOfCreatedSuperhero, requestBody);
            console.log(res.body);
            res.status.should.equal(200);
            validator.dataTypeValidator(res);
        });

        //Verify the modifications made
        after(async function () {
            let res = await queries.get(baseUrl, 'superhero/' + idOfCreatedSuperhero);
            console.log(res.body);
            res.status.should.equal(200);
            validator.dataValidator(res, name, fName, lName, age, powers, killerNew);
            validator.dataTypeValidator(res);
        });


    });

    describe('DELETE Request', function () {
        let name = userMock.name;
        let fName = userMock.fName;
        let lName = userMock.lName;
        let age = userMock.age;
        let powers = userMock.powers;
        let killer = userMock.killerFalse;
        let idOfCreatedSuperhero;

        //Create a new superhero
        before(async function () {
            let requestBody = getRequestBody(name, fName, lName, age, powers, killer);
            let res = await queries.post(baseUrl, 'superhero/', requestBody);
            console.log(res.body);
            res.status.should.equal(201);
            idOfCreatedSuperhero = res.body.id;
        });

        //Delete the created superhero
        it('Should Delete Superhero', async function () {
            let res = await queries.delete(baseUrl, 'superhero/' + idOfCreatedSuperhero);
            console.log(res.body);
            res.status.should.equal(200);
        });

        //Verify that the superhero has been deleted
        after(async function () {
            let res = await queries.get(baseUrl, 'superhero/' + idOfCreatedSuperhero);
            console.log(res.body);
            res.status.should.equal(404);
        });

    });
});

const getRequestBody = function (name, fName, lName, age, powers, killer) {
    return {
        "name": name,
        "fName": fName,
        "lName": lName,
        "age": age,
        "powers": powers,
        "killer": killer
    }
};
