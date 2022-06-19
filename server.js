import app from './app.js';

app.listen(process.env.PORT, () =>
  console.log(`blog-api listening on port ${process.env.PORT}`)
);
