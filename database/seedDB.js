// Require mongoose + db connection
const mongoose = require('mongoose');
const connectToDatabase = require('./mongoDB_connect');

const emoji = require('node-emoji');

// Require models
const User = require('../models/user');
const Blog_Post = require('../models/blog_post');
const Comment = require('../models/comment');

// Require additional libraries
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const DateGenerator = require('random-date-generator');

// Lorem settings
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

// Random number utility function
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Users
const users = [
  {
    username: 'Swilson',
    password: 'Shadow45!',
    email: 'mwilson@example.com',
    first_name: 'Matt',
    last_name: 'Wilson',
    DOB: new Date(9 / 2 / 1991),
    date_joined: new Date(1 / 1 / 2021),
    blog_posts: [],
    comments: [],
  },
  {
    username: 'LyraBug',
    password: 'Shadow45!',
    email: 'lolson@example.com',
    first_name: 'Lyra',
    last_name: 'Olson',
    DOB: new Date(3 / 17 / 1993),
    date_joined: new Date(4 / 11 / 2021),
    blog_posts: [],
    comments: [],
  },
];

const getBlogPost = () => {
  return {
    title: lorem.generateWords(6),
    text: lorem.generateParagraphs(5),
    published: false,
    date_published: DateGenerator.getRandomDate(),
    author: [],
    comments: [],
  };
};

const getComment = () => {
  return {
    text: lorem.generateSentences(2),
    date_published: DateGenerator.getRandomDate(),
    author: {},
    blog_post: {},
  };
};

const seedDB = async () => {
  //! ===Create arrays of models====

  // get array of user models
  const userModels = [new User(users[0]), new User(users[1])];

  // get array of blog-post models
  const blog_posts = [];
  for (let i = 0; i < 16; i++) {
    blog_posts.push(new Blog_Post(getBlogPost()));
  }

  // get array of comment models
  const comments = [];
  for (let i = 0; i < 16 * 10; i++) {
    comments.push(new Comment(getComment()));
  }

  //! ===Link models to each other===

  // link users and blog_posts to comments
  comments.forEach((comment) => {
    comment.author =
      userModels[getRandomIntInclusive(0, userModels.length - 1)]._id;
    comment.blog_post =
      blog_posts[getRandomIntInclusive(0, blog_posts.length - 1)]._id;
  });

  // Link user and comments to blog_posts
  blog_posts.forEach((blog_post) => {
    // Add 10 comments to blog_post
    for (let i = 0; i < 10; i++) {
      blog_post.comments.push(
        comments[getRandomIntInclusive(0, comments.length - 1)]._id
      );
    }
    blog_post.author =
      userModels[getRandomIntInclusive(0, userModels.length - 1)]._id;
  });

  // Link blog_posts and comments to users
  userModels.forEach((user) => {
    // Add half of all blog_posts to user
    for (let i = 0; i < (blog_posts.length - 1) / 2; i++) {
      user.blog_posts.push(
        blog_posts[getRandomIntInclusive(0, blog_posts.length - 1)]._id
      );
    }
    // Add half of all comments to user
    for (let i = 0; i < (comments.length - 1) / 2; i++) {
      user.comments.push(
        comments[getRandomIntInclusive(0, comments.length - 1)]._id
      );
    }
  });

  //! ===Complete DB operations===

  // Connect to DB
  await connectToDatabase();

  // Delete all current DB documents
  await User.deleteMany({});
  console.log('\x1b[31m%s\x1b[0m', 'Users Deleted', emoji.get('boom'));
  await Blog_Post.deleteMany({});
  console.log('\x1b[31m%s\x1b[0m', 'Blogs Deleted', emoji.get('boom'));
  await Comment.deleteMany({});
  console.log('\x1b[31m%s\x1b[0m', 'Comments Deleted', emoji.get('boom'));

  // Save created DB documents
  await User.insertMany(userModels);
  console.log(
    '\x1b[32m%s\x1b[0m',
    'Users Saved',
    emoji.get('white_check_mark')
  );
  await Blog_Post.insertMany(blog_posts);
  console.log(
    '\x1b[32m%s\x1b[0m',
    'Blog Posts Saved',
    emoji.get('white_check_mark')
  );
  await Comment.insertMany(comments);
  console.log(
    '\x1b[32m%s\x1b[0m',
    'Comments Saved',
    emoji.get('white_check_mark')
  );

  // Close DB connection
  mongoose.connection.close(() => {
    console.log('\x1b[33m%s\x1b[0m', 'MongoDB connections succesfully closed');
  });
};

seedDB();
