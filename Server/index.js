require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const pC = require('./profile_controller');
// const aC = require('./auth_controller');
const axios = require('axios');

//------------------------------------------------------------------Session------------------------------------------------------------------\\

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

//----------------------------------------------------------------------------Auth0------------------------------------------------------------------\\

app.get('/auth/callback', (req,res) => {
    console.log('auth callback has fired')
  const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type:'authorization_code',
      redirect_uri: `http://${req.headers.host}/auth/callback`
  }

  function tradeCodeForAccessToken(){console.log('hello')
      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
  }

   function tradeAccessTokenForUserInfo(accessTokenResponse){
       const accessToken = accessTokenResponse.data.access_token;
       return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessToken}`);
   }

  function storeUserInfoInDatabase(response){console.log('hello')
      const auth0Id = response.data.sub;
      const db = req.app.get('db');
      return db.find_user_by_auth0_id(auth0Id).then(users => {
          console.log('find user has fired')
          if (users.length){
              const user = users[0];
              req.session.user = user;
              res.redirect('/');
          } else {
              const userArray = [
                  auth0Id,
                  response.data.name,
                  response.data.email,
              ];
              return db.create_user(userArray).then(newUser => {console.log('create user has fired')
                  req.session.user = newUser;
                  res.redirect('/');
              }).catch(error => {
                  console.log('Error in db.create_user', error)
                  res.status(500).json('Unexpected error')
              })
          }
      }).catch(error => {
          console.log('Error in find_user', error)
          res.status(500).json('Unexpected error')
      })
   }
  tradeCodeForAccessToken()
  .then(tradeAccessTokenForUserInfo)
  .then(storeUserInfoInDatabase)
  .catch(error => {
    console.log('Error in auth/callback', error)
    res.status(500).json('Unexpected error')

  })
})

app.get('/api/user-data', (req,res) => {
  res.json(req.session.user)
})

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.json();
})


//------------------------------------------------------------------------------Profile Controller------------------------------------------------------------------\\

app.get('/api/profile/:id', pC.getProfile);
app.put('/api/profile/:id', pC.editProfile);
app.post('/api/profile', pC.postProfile);



//------------------------------------------------------------------------------Trail Controller------------------------------------------------------------------\\




//----------------------------------------------------------------------------------DB and Server------------------------------------------------------------\\

massive(process.env.CONNECTION_STRING).then(database => {
    console.log('Hooked up to your database bruhh.🤙')
    app.set('db', database);
}).catch(error => { console.log(error)});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.🏄`)
})





























//bcrypt
// app.post('/register', (req, res) => {
//   const db = req.app.get('db')
//   const { username, password, email } = req.body;
//   bcrypt.hash(password, saltRounds).then(hashedPassword => {
//  db.create_bcrypt_user([username, hashedPassword, email]).then(() => {
//     req.session.user = { username };
//     res.json({ username });
//   }).catch(error => {
//     if (error.message.match(/duplicate key/)) {
//       res.status(409).json({ message: "That user already exists." });
//     } else {
//       res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed.",error });
//     }
//   });
// }).catch(error => {
//     res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed.",error });
// });
// });

// app.post('/login', (req, res) => {
//   const db = req.app.get('db')
//     const { username, password } = req.body;
//     db.find_user([username]).then(data => {
//       if (data.length) {
//         bcrypt.compare(password, data[0].password).then(passwordsMatch => {
//         if (passwordsMatch) {
//           req.session.user = { username };
//           res.json({ username });
//         } else {
//           res.status(403).json({ message: 'Invalid password.' });
//         }
//       }).catch(error => {
//         res.status(500).json({ message: 'An error has occurred; for security reasons it cannot be disclosed.',error })
//       })
//       } else {
//         res.status(403).json({ message: 'Unknown user' });
//       }
//     }).catch(error => {
//       console.log('error', error);
//       res.status(500).json({ message: "An error occurred; for security reasons it can't be disclosed.",error });
//     });
//   });

//   app.post('/logout', (req, res) => {
//     req.session.destroy();
//     res.send();
//   })