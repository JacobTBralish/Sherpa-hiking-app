require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
// const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))




//bcrypt

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, saltRounds).then(hashedPassword => {
  app.get('db').create_user([username, hashedPassword]).then(() => {
    req.session.user = { username };
    res.json({ username });
  }).catch(error => {
    if (error.message.match(/duplicate key/)) {
      res.status(409).json({ message: "That user already exists." });
    } else {
      res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed." });
    }
  });
}).catch(error => {
    res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed." });
});
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    app.get('db').find_user([username]).then(data => {
      if (data.length) {
        bcrypt.compare(password, data[0].password).then(passwordsMatch => {
        if (passwordsMatch) {
          req.session.user = { username };
          res.json({ username });
        } else {
          res.status(403).json({ message: 'Invalid password.' });
        }
      }).catch(error => {
        res.status(500).json({ message: 'An error has occurred; for security reasons it cannot be disclosed.'})
      })
      } else {
        res.status(403).json({ message: 'Unknown user' });
      }
    }).catch(error => {
      console.log('error', error);
      res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed." });
    });
  });

  app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send();
  })
  

massive(process.env.CONNECTION_STRING).then(database => {
    console.log('Hooked up to your database bruhh.🤙')
    app.set('db', database);
}).catch(error => { console.log(error)});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.🏄`)
})