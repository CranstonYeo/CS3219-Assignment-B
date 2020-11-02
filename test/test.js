let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app.js");

const { expect } = require("chai");

// Configure chai
chai.use(chaiHttp);
chai.should();

let testContact = {
  name: "John Samuel",
  gender: "male",
  email: "johnsamuel@hotmail.com",
  phone: "82348234",
};

describe("Contacts", () => {
  let contacts = {};

  describe("POST /", () => {
    // Test to add a contact record
    it("should post a contact", (done) => {
      chai
        .request(app)
        .post("/api/contacts")
        .send(testContact)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("New contact created!");
          res.body.should.have.property("data");
          res.body.data.should.have.property("name").eql("John Samuel");
          res.body.data.should.have.property("gender").eql("male");
          res.body.data.should.have.property("email").eql("johnsamuel@hotmail.com");
          res.body.data.should.have.property("phone").eql("82348234");
          done();
        });
    });
  });

  describe("GET /", () => {
    // Test to get all contacts record
    it("should get all contacts record", (done) => {
      chai
        .request(app)
        .get("/api/contacts")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.length.should.be.eql(1);
          contacts = res.body.data;
          done();
        });
    });

    // Test to get single contact record
    it("Should get single contact", (done) => {
      let id = contacts[0]._id;
      chai
        .request(app)
        .get(`/api/contacts/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.a.property('data');
          expect(contacts[0]).to.deep.equal(res.body.data);
          done();
        });
    });
  });

  describe("DELETE /", () => {
    // Test to remove a contact record
    it("Should remove a contact record", () => {
      const id = contacts[0]._id;
      let length = contacts.length;
      chai
        .request(app)
        .delete(`/api/contacts/${id}`)
        .end((err, res) => {
          res.should.have.a.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql("success");
          res.body.should.have.property("message").eql("Contact deleted");
          expect(contacts.length).to.not.equal(length);
          done();
        });
    });
  });
});
