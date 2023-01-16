const express = require("express");
const redis = require("redis");
const axios = require("axios");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
(async () => {
  client.connect();
})();

const app = express();
app.use(express.json());

app.listen(8080, () => {
  console.log("Listening on port 8080!");
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const { key, value } = req.body;
  const response = await client.set(key, value); //sets the key and value in redis database
  res.json(response);
});

app.get("/", async (req, res) => {
  const { key } = req.body;
  const value = await client.get(key);
  res.json(value);
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  const cachedPost = await client.get(`post-${id}`);
  if (cachedPost) {
    return res.json(JSON.parse(cachedPost));
  }
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  client.set(`post-${id}`, JSON.stringify(response.data), {
    EX: 10,
    NX: true,
  }); //expiry after 10 seconds
  return res.json(response.data);
});
