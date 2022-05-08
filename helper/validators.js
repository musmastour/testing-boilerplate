//Constains functions to validate the api details

const expect = require('chai').expect;

exports.dataTypeValidator = function (body) {
    body.should.have.property('id').which.is.a.Number();
    body.should.have.property('name').which.is.a.String();
    body.should.have.property('fName').which.is.a.String();
    body.should.have.property('lName').which.is.a.String();
    body.should.have.property('age').which.is.a.Number();
    body.should.have.property('powers').which.is.an.Array().and.not.be.empty();
    body.should.have.property('killer').which.is.a.Boolean();
};

exports.dataValidator = function (user, body) {
    expect(body.name).to.equal(user.name);
    expect(body.fName).to.equal(user.fName);
    expect(body.lName).to.equal(user.lName);
    expect(body.age).to.equal(user.age);
    expect(body.killer).to.equal(user.killer);
};