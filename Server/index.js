require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const massive = require('massive');
const pC = require('./profile_controller');
const tC = require('./trail_controller');
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


massive(process.env.CONNECTION_STRING).then(database => {
    console.log('Hooked up to your database bruhh.🤙')
    app.set('db', database);
}).catch(error => { console.log(error)});

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
  function tradeCodeForAccessToken(){console.log('traded code for access token')
      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
  }

   function tradeAccessTokenForUserInfo(accessTokenResponse){
       const accessToken = accessTokenResponse.data.access_token;
       return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessToken}`);
   }

  function storeUserInfoInDatabase(response){console.log('Stored user info in db')
      const auth0Id = response.data.sub;
      console.log(auth0Id,'-------Auth0ID-------')
      const db = req.app.get('db');
      return db.find_user_by_auth0_id(auth0Id).then(users => {
          console.log('find user has fired')
          if (users.length){console.log(users)
              const user = users[0];
              req.session.user = user;
              res.redirect('/');
          } else {
              const userArray = [
                  auth0Id,
                  response.data.name,
                  response.data.email,
              ];
              return db.create_user(userArray).then(newUser => {console.log(newUser,'create user has fired')
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

app.get('/api/upload', (req, res) => {

    // get a timestamp in seconds which is UNIX format
        const timestamp = Math.round((new Date()).getTime() / 1000);
    
    // cloudinary API secret stored in the .env file
        const api_secret  = process.env.CLOUDINARY_SECRET_API;
    
    // user built in cloudinary api sign request function to  create hashed signature with your api secret and UNIX timestamp
        const signature = cloudinary.utils.api_sign_request({ timestamp: timestamp }, api_secret);
    
    // make a signature object to send to your react app
        const payload = {
            signature: signature,
            timestamp: timestamp
        };
            res.json(payload);
    })


//------------------------------------------------------------------------------Profile Controller------------------------------------------------------------------\\

app.get('/api/profile/:id', pC.getProfile);
app.put('/api/profile/:id', pC.editProfile);
app.post('/api/profile', pC.postProfile);

//------------------------------------------------------------------------------Trail Controller------------------------------------------------------------------\\

app.get('/api/trailreview/:id', tC.getTrailReviewById);
app.post('/api/trailreview', tC.postReview);



//----------------------------------------------------------------------------------DB and Server------------------------------------------------------------\\


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