const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../app");
const { log } = require("console");
require("dotenv").config();

const expect = chai.expect;
chai.use(chaiHttp);

describe("Poll and Voting Routes", () => {
  let authToken = "";

  before((done) => {
    chai
      .request(app)
      .post("/api/v1/users/login")
      .send({ email: "khaclam2409@gmail.com", password: "123456" })
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        }
        authToken = res.body.token;
        done();
      });
  });

  it("should auth before create poll", (done) => {
    chai
      .request(app)
      .post("/api/v1/polls")
      .send({
        name: "Demo poll",
        description: "Demo poll for testing",
        options: [
          {
            name: "option 1",
          },
          {
            name: "option 2",
          },
          {
            name: "option 3",
          },
        ],
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("should auth before vote poll", (done) => {
    chai
      .request(app)
      .post("/api/v1/votes/1/1")
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("should create a poll", (done) => {
    chai
      .request(app)
      .post("/api/v1/polls")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: "Demo poll",
        description: "Demo poll for testing",
        options: [
          {
            name: "option 1",
          },
          {
            name: "option 2",
          },
          {
            name: "option 3",
          },
        ],
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("status").to.equal("success");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("newPoll");
        const newPoll = res.body.data.newPoll;
        expect(newPoll).to.have.property("id");
        expect(newPoll).to.have.property("name").to.equal("Demo poll");
        expect(newPoll)
          .to.have.property("description")
          .to.equal("Demo poll for testing");
        expect(newPoll).to.have.property("createdAt");
        expect(newPoll).to.have.property("updatedAt");
        done();
      });
  });
});
