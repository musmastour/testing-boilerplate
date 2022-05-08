//Constains functions to validate the api details

const expect = require('chai').expect;

exports.dataTypeValidator = function (body) {
    expect(body).to.have.property('id');
    expect(body.user).to.have.property('name');
    expect(body.user).to.have.property('fName');
    expect(body.user).to.have.property('lName');
    expect(body.user).to.have.property('age');
    expect(body.user).to.have.property('powers');
    expect(body.user).to.have.property('killer');
};

exports.dataValidator = function (user, body) {
    expect(body.name).to.equal(user.name);
    expect(body.fName).to.equal(user.fName);
    expect(body.lName).to.equal(user.lName);
    expect(body.age).to.equal(user.age);
    expect(body.killer).to.equal(user.killer);
};