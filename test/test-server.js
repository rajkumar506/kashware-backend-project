const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

// to test home route

describe("home page", () => {
  it("should response Hello World", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});

// to test signup and signin routes

describe("Signin (post route)", () => {
  it("For signin please enter credentials ", (done) => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "", password: "" })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
      });
    done();
  });

  it("For signin please enter full credentials ", (done) => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "raj@gmail.com", password: "" })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
      });
    done();
  });

  it("For signin please enter full credentials ", (done) => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "", password: "raj" })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
      });
    done();
  });

  it("to signin correct", (done) => {
    chai
      .request(app)
      .post("/signin")
      .send({ email: "pk@gmail.com", password: "234" })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
      });
    done();
  });
});

// to test imagedownload route

describe("imagedownload route", () => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyZTg0ZGRkYmQ3NDIxMjZlN2Q0ODciLCJpYXQiOjE2MDE0NTYwNjR9.3FPszeRR-hhGNZ6_eHk1x_ELotNB7VXbMryiOj0llyQ";
  it("you can post url and it can download image in image file of your project with correct token", (done) => {
    chai
      .request(app)
      .post("/imagedown")
      .set({ Authorization: token })
      .send({
        url:
          "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
      });
    done();
  });

  it("you can not post url without token ", (done) => {
    chai
      .request(app)
      .post("/imagedown")
      .send({
        url:
          "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
      });
    done();
  });

  it("you can not post url by using wrong token", (done) => {
    chai
      .request(app)
      .post("/imagedown")
      .set({ Authorization: token + "tu" })
      .send({
        url:
          "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
      });
    done();
  });
});

// to test patch update

describe("jsonpatch route", () => {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcyZTg0ZGRkYmQ3NDIxMjZlN2Q0ODciLCJpYXQiOjE2MDE0NTYwNjR9.3FPszeRR-hhGNZ6_eHk1x_ELotNB7VXbMryiOj0llyQ";
  it("to jsonpatch correctly", (done) => {
    chai
      .request(app)
      .post("/patch")
      .set({ Authorization: token })
      .send({
        oldObject: {
          baz: "qux",
          foo: "bar",
        },
        patchObject: [
          { op: "replace", path: "/baz", value: "boo" },
          { op: "add", path: "/hello", value: ["world"] },
          { op: "remove", path: "/foo" },
        ],
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
      });
    done();
  });

  it("wrong token can not patch", (done) => {
    chai
      .request(app)
      .post("/patch")
      .set({ Authorization: token + "yu" })
      .send({
        oldObject: {
          baz: "qux",
          foo: "bar",
        },
        patchObject: [
          { op: "replace", path: "/baz", value: "boo" },
          { op: "add", path: "/hello", value: ["world"] },
          { op: "remove", path: "/foo" },
        ],
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
      });
    done();
  });
});
