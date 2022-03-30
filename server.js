// packages
const express = require("express");
const app = express();
const dotenv = require("dotenv").config({ path: "./config.env" });

// import/Initials
const middlewares = require("./middlewares");
const connectionDB = require("./config/db");
const PORT = process.env.PORT || 8000;

// middlewares
middlewares(app);
connectionDB();

// heroku
if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//  routes
app.get("/", (req, res) => {
  res.send("API working!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

const server = app.listen(PORT, () =>
  console.log(
    `Server is running successfully in ${process.env.NODE_ENV} on port ${PORT}`
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
