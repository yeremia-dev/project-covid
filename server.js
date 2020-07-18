// eslint-disable-next-line no-unused-vars
const express = require('express');

// eslint-disable-next-line no-unused-vars
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(`${__dirname}/dist/`));
app.get(/.*/, (req, res) => {
  res.sendfile(`${__dirname}/dist/index.html`);
});
app.listen(port);

console.log('Server started....');
