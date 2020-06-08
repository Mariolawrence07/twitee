/* eslint-disable no-undef */
import request from "supertest";
import app from "../app";

describe("post route test", () => {
  let token;
  let token1;
  it("should signin a user to get token", async (done) => {
    const res = await request(app).post("/login").send({
      email: "doe@example.com",
      password: "password",
    });
    token = res.body.data.token;
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    done();
  });
  it("should signin a user to get token", async (done) => {
    const res = await request(app).post("/login").send({
      email: "john@example.com",
      password: "password",
    });
    token1 = res.body.data.token;
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    done();
  });

  it("should get all posts", async (done) => {
    const res = await request(app).get("/post").set({
      token: token,
    });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    done();
  });
  it("should not get all posts without token", async (done) => {
    const res = await request(app).get("/post");
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should not get all posts with invalid token", async (done) => {
    const res = await request(app).get("/post").set({
      token: "4edfcdtr4ertfty66yt",
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should get post by id", async (done) => {
    const res = await request(app).get("/post/1").set({
      token: token,
    });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    done();
  });
  it("should not get post by id that does not exist", async (done) => {
    const res = await request(app).get("/post/30").set({
      token: token,
    });
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should not get post by invalid id", async (done) => {
    const res = await request(app).get("/post/er").set({
      token: token,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should create post", async (done) => {
    const res = await request(app)
      .post("/post")
      .set({
        token: token,
      })
      .send({
        post: "its a happy day",
      });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("data");
    done();
  });
  it("should not create post without request body", async (done) => {
    const res = await request(app).post("/post").set({
      token: token,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should not be able to delete a post you did not create", async (done) => {
    const res = await request(app).delete("/post/1").set({
      token: token1,
    });
    expect(res.status).toEqual(401);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should delete a post", async (done) => {
    const res = await request(app).delete("/post/1").set({
      token: token,
    });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    done();
  });
  it("should not delete a post already deleted", async (done) => {
    const res = await request(app).delete("/post/1").set({
      token: token,
    });
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should not delete a post with an invalid id", async (done) => {
    const res = await request(app).delete("/post/er").set({
      token: token,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should comment on a valid post", async (done) => {
    const res = await request(app)
      .post("/post/comment/2")
      .set({
        token: token,
      })
      .send({
        comment: "i just commented",
      });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("data");
    done();
  });
  it("should not comment on an invalid post", async (done) => {
    const res = await request(app)
      .post("/post/comment/1")
      .set({
        token: token,
      })
      .send({
        comment: "i just commented",
      });
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
    done();
  });

  it("should not comment on a post with an invalid id", async (done) => {
    const res = await request(app)
      .post("/post/comment/er")
      .set({
        token: token,
      })
      .send({
        comment: "i just commented",
      });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });

  it("should not comment without request body", async (done) => {
    const res = await request(app).post("/post/comment/1").set({
      token: token,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });
  it("should like a valid post", async (done) => {
    const res = await request(app).post("/post/like/2").set({
      token: token,
    });
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty("data");
    done();
  });
  it("should not like on an invalid post", async (done) => {
    const res = await request(app).post("/post/like/1").set({
      token: token,
    });
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty("error");
    done();
  });

  it("should not like on a post with an invalid id", async (done) => {
    const res = await request(app).post("/post/like/er").set({
      token: token,
    });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    done();
  });
});
