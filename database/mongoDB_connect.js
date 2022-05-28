require('dotenv').config({ path: require('find-config')('.env') });
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  // Set mongoDB connection string using env variables
  const mongoDatabaseUrl = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.z162m.mongodb.net/?retryWrites=true&w=majority`;

  // Connections Options
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to mongoDB
  mongoose.connect(mongoDatabaseUrl, options);

  // Print on success
  mongoose.connection.on('connected', () =>
    console.log(
      '\x1b[33m%s\x1b[0m',
      'Connected to MongoDB express-blog-api cluster0'
    )
  );

  // Handle errors
  mongoose.connection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved');
    }, 1000);
  });
};

module.exports = connectToDatabase;
