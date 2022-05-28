require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = () => {
  // Set mongoDB connection string using env variables
  const mongoDatabaseUrl = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.z162m.mongodb.net/?retryWrites=true&w=majority`;

  // Connections Options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to mongoDB
  mongoose
    .connect(mongoDatabaseUrl, options)
    .then(() => console.log('\x1b[33m%s\x1b[0m', 'Connected to MongoDB'));

  // Bind connection errors so they print to console
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  );
};

module.exports = connectToDatabase;
