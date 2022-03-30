const mongoose = require("mongoose");

const connectionDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log("Database connection established");
};

module.exports = connectionDB;
