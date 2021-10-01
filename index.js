// Express server

require("dotenv").config();

const express = require("express");
const rateLimit = require("express-rate-limit");
const tts = require("./tts");

const app = express();
app.set("trust proxy", process.env.PROXY || 0);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 25,
  })
);

app.get("/", async (req, res) => {
  if (!req.query.text) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "Missing text parameter",
      })
    );
  }

  const text = req.query.text;
  const voice = req.query.female == "true";
  const response = await tts(text, voice);
  res.writeHead(200, { "Content-Type": "audio/mpeg" });
  return res.end(response);
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server started on port: ${process.env.PORT || 8080}`)
);
