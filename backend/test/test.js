const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("./../app");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
require("dotenv").config();

const expect = chai.expect;
chai.use(chaiHttp);

describe("Poll and Voting Routes", () => {
  let mongoServer;
  let authToken;
  let createdPollId;
  const demoPollData = {
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
  };

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Assuming you have a login route that returns an authentication token
    const loginResponse = await chai
      .request(app)
      .post("/api/v1/users/signup")
      .send({ username: "demo", email: "demo@gmail.com", password: "123456" })
      .end((err, res) => {
        if (err) {
          console.error(err);
          done(err);
        }
        authToken = res.body.token;
        done();
      });

    authToken = loginResponse.body.token;
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
      .send(demoPollData)
      .end((err, res) => {
        createdPollId = res.body.data.newPoll._id;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("status").to.equal("success");
        expect(res.body).to.have.property("data");

        expect(res.body.data).to.have.property("newPoll");
        const newPoll = res.body.data.newPoll;
        expect(newPoll).to.have.property("_id");
        expect(newPoll).to.have.property("name").to.equal(demoPollData.name);
        expect(newPoll)
          .to.have.property("description")
          .to.equal(demoPollData.description);
        expect(newPoll).to.have.property("createdAt");
        done();
      });
  });

  it("should return error when creating poll without name", (done) => {
    chai
      .request(app)
      .post("/api/v1/polls")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        description: demoPollData.description,
        options: demoPollData.options,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should return error when creating poll less than 2 options", (done) => {
    chai
      .request(app)
      .post("/api/v1/polls")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: demoPollData.name,
        description: demoPollData.description,
        options: [
          {
            name: "option 1",
          },
        ],
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should return error when creating poll more than 5 options", (done) => {
    chai
      .request(app)
      .post("/api/v1/polls")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        name: demoPollData.name,
        description: demoPollData.description,
        options: [1, 2, 3, 4, 5, 6].map((i) => ({
          name: `Option ${i}`,
        })),
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
