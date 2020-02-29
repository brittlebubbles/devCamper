const mongoose = require("mongoose");

const connectdb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`Database connnection:  ${conn.connection.host}`);
};

module.exports = connectdb;
