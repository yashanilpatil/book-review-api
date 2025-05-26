const app = require("./app");
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.post('/signup', (req, res) => {
  // Your signup logic here: validate user, save to DB, etc.
  res.send('Signup successful!');
});

