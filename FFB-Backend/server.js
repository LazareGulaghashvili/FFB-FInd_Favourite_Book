// Import required modules
const express = require('express');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const helmet = require('helmet')
const cors = require('cors')
const MySQLStore = require('express-mysql-session')(session);
const keys = require('../keys')


// Create Express application
const app = express();
const port = 3000;

// import mysql
const mysql = require('mysql2')

// mysql connection
const options = {
  host: keys.db.host,
  user: keys.db.user,
  password: keys.db.pas,
  database: keys.db.database
}
const conn = mysql.createConnection(options)
const sessionStore = new MySQLStore({
  expiration: 10000, // Session expiration time in milliseconds (optional)
  checkExpirationInterval: 1000, // How frequently expired sessions will be cleared (900000 milliseconds or 15 minutes)
  createDatabaseTable: false, // Since you already have the sessions table
  schema: {
    tableName: 'sessions', // Name of the sessions table
    columnNames: {
      session_id: 'session_id', // Name of the column storing session IDs
      expires: 'expires', // Name of the column storing expiration timestamps
      data: 'data' // Name of the column storing serialized session data
    }
  }
}, conn);

// use helmet protection
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Allow resources from the same origin
      scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:8080"], // Allow scripts from the same origin and your Vue app domain
      // Add more directives as per your application requirements
    },
  })
);
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  exposedHeaders: ['set-cookie']
}))

// const sessionConfig = require('./sessionConfig');


app.use(session({
  secret: keys.secret,                      // Secret key to sign the session ID cookie
  resave: false,                                  // Don't save session if unmodified
  saveUninitialized: false,
  store: sessionStore,                       // Don't create session until something is stored
  cookie: {
    secure: false,                                // Set it to true if your app is served over HTTPS
    httpOnly: true,                               // Cookie accessible only by the web server
  }
}))

conn.connect((err) => {
  if (err) {
      console.error("I couldn't connect with mysql server", err)
  } else {
      console.log("It's connected")
  }
})


function checkid(req, res, next) {
  var userId
  if (req.session.userID) {
     userId = req.session.userID
  } else {
    userId = null;
  }
  req.userId = userId;
  next()
}
app.use(checkid)
// import keys 

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

// passport setup
passport.use(new GoogleStrategy({
  callbackURL: '/outh',
  clientID: keys.clientID,
  clientSecret: keys.clientSecret
}, (accessToken, refreshToken, profile, done) => {
  conn.query('SELECT * FROM ffb.users WHERE googleId = ?', [profile.id], (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return done(err);
    }
    if (result.length === 0) {
      conn.query('INSERT INTO ffb.users (username, googleID, Image) VALUES (?, ?, ?)', [profile.displayName, profile.id, profile._json.picture], (error) => {
        if (error) {
          console.error('Error adding new Google user:', error);
          return done(error);
        }
        console.log('Google user added');
        return done(null, profile);
      });
    } else {
      console.log('Record already exists');
      return done(null, profile);
    }
  });
}));

// Serialize and deserialize user
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define route for initiating Google OAuth authentication
app.get('/oauth/google', passport.authenticate('google', { scope: ['profile'] }));

// Define route for handling Google OAuth callback
app.get('/outh',
  passport.authenticate('google', { failureRedirect: 'http:/localhost:8080/SignUp' }),
  function(req, res) {
    conn.query('SELECT * FROM ffb.users WHERE googleId = ?', [req.user.id], (err, result) => {
      if (err) {
        console.error('There is error related to google + api', err)
      } else {
        req.session.userID = JSON.parse(result[0].id)
        req.userId = req.session.userID
            // Successful authentication, redirect to profile page
            res.redirect('http://localhost:8080');
      }
    })
  }
); 

// Route to handle profile page
// app.get('/profile', isAuthenticated, (req, res) => {
//   res.send(`Welcome, ${req.user.displayName}`);
// });

// Middleware to check if user is authenticated
// function isAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/');
// }


function authenticate(req, res, next) {
 if (req.session && req.session.userID) {
  return next()
 } else {
  return res.sendStatus(401)
 }
}


app.post('/check', (req, res) => {
  if (req.userId !== null) {
    res.json({idexistance: true})
  } else {
    res.json({idexistance: false})
  }
})


app.get('/', authenticate, (req, res) => {
  res.send('Hello World!')
})
// count list items
app.post('/countitems',  authenticate, (req, res) => {
  conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is server error when counting list items', err)
    } else {
      var array = []
      const listsarray = JSON.parse(result[0].lists)
      for (var i = 0; i < 3; i++) {
        const len = listsarray[i].length
        array.push(len)
      }
      res.json({Narray: JSON.stringify(array)})
    }
  })
})

// sign out 
app.post('/signout', authenticate, (req, res) => {
  // req.session.userID = null
  // req.userId = req.session.userID
  // res.send('sign out')
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
     res.send('sign out')
     console.log('sign out seccesfully')
    }
  })
})

// remove favourite author form list
app.post('/removeAuthor', authenticate, (req, res) => {
  console.log(req.body.array)
  const newArray = req.body.array.filter((author) => author !== req.body.authorName)
  console.log(newArray)
  const strNewArray = JSON.stringify(newArray)
  conn.query('UPDATE ffb.users SET Authors = ? WHERE id = ?', [strNewArray, req.userId], (error) => {
    if (error) {
      console.error('there is error related to remove author', error)
    } else {
      res.json({array: strNewArray})
      console.log('removed')
    }
  })
})
// remove list
app.post('/removeList', authenticate, (req, res) => {
  conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is error related to remove list', err)
    } else {
      const pList = JSON.parse(result[0].lists)
      const pListnames = JSON.parse(result[0].listnames)
      pList[req.body.index] = []
      pList.splice(req.body.index, 1)
      const nListnames = pListnames.filter((name) => name !== req.body.listname)
      const strlist = JSON.stringify(pList)
      const strlistnames = JSON.stringify(nListnames)
      conn.query('UPDATE ffb.users set lists = ?, listnames = ? WHERE id = ?', [strlist, strlistnames, req.userId], (error) => {
        if (error) {
          console.error('There is error when update list and listnames', error)
        } else {
          res.json({listNames: strlistnames})
          console.log('deleted list')
        }
      })
    }
  })
})


app.post('/delete', authenticate, (req, res) => {
  // const userId = req.session.userID
  conn.query('DELETE FROM ffb.users WHERE id = ?', [req.userId], (err) => {
    if (err) {
      console.error('There is error when attampting to delete account', err)
    } else {
      res.send('seccesfully delatd')
      console.log('deleted')
    }
  })
})

// add into list 
app.post('/addlist', authenticate, (req, res) => {
  const addlist = req.body;
  const listnum = addlist.listname;
  const book = addlist.book;

  conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
      if (err) {
          console.error('There was an error related to addlist:', err);
          res.status(500).send('Internal Server Error');
      } else {
          try {
              const lists = JSON.parse(result[0].lists || '[]'); // If lists is null, use an empty array
              if (Array.isArray(lists[listnum])) {
                  lists[listnum].push(book);
                  const nlist = JSON.stringify(lists);
                  conn.query('UPDATE ffb.users SET lists = ? WHERE id = ?', [nlist, req.userId], (error) => {
                      if (error) {
                          console.error('There was an error when adding new list:', error);
                          res.status(500).send('Internal Server Error');
                      } else {
                          console.log('Book added successfully');
                          res.status(200).send('Book added successfully');
                      }
                  });
              } else {
                  console.error('Invalid list index:', listnum);
                  res.status(400).send('Bad Request');
              }
          } catch (parseError) {
              console.error('Error parsing JSON:', parseError);
              res.status(500).send('Internal Server Error');
          }
      }
  });
});

// delete book from list 
app.post('/deleteB', authenticate, (req, res) => {
  const bookinfo = req.body
  // const userId = req.session.userID;
  conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is error related to remove', err)
    } else {
      const list = JSON.parse(result[0].lists)
      const filteredList = list.map((innerArray, index) => {
        if (index === bookinfo.listnumber) {
            return innerArray.filter((book) => book.id !== bookinfo.bookId);
        } else {
            return innerArray;
        }
    })      
    const stringifyarray = JSON.stringify(filteredList)
      conn.query('UPDATE ffb.users SET lists = ? WHERE id = ?', [stringifyarray, req.userId], (error) => {
        if (error) {
          console.error('There is error when removeing new list', error)
        } else {
          console.log('book removed seccasfully')
        }
      }) 
    }
  })
}) 
// send fontend list array 
app.post('/lists', authenticate, (req, res) => {
   conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is error relate to send list array to frontend', err)
    } else {
      res.json({list: result[0].lists, listnames: result[0].listnames})
    }
   })
})
// check book axistance in lists 
app.post('/checkbook', authenticate, (req, res) => {
  conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is error relaed to check boo existance', err)
    } else {
      var array = JSON.parse(result[0].lists)
      var boolarray = []
      for (var i = 0; i < array.length; i++) {
        const newarray = array[i].filter((book) => book.id == req.body.bookId)
        // console.log(newarray)
        if (newarray.length > 0) {
          boolarray.push(true)
        } else {
          boolarray.push(false)
        }
      }
      res.json({boolarray: boolarray})
    }
  })
})
// add new list 
app.post('/addnewlist', authenticate, (req, res) => {
  // const userId = req.session.userID;
  conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is error related to add new list', err)
    } else {
      const listnamearray = JSON.parse(result[0].listnames)
      const array = JSON.parse(result[0].lists)
      listnamearray.push(req.body.listname)
      array.push([])
      const strlistnames = JSON.stringify(listnamearray) 
      const Newarray = JSON.stringify(array)
      conn.query('UPDATE ffb.users SET lists = ?, listnames = ? WHERE id = ?', [Newarray, strlistnames, req.userId], (error) => {
        if (error) {
          console.error('There is error related to add new list update', error)
        } else {
          res.json({newlistnames: strlistnames})
          console.log('list add')
        }
      })
    }
  })
})
// get user name 
app.post('/getusername', authenticate, (req, res) => {
  conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is error when return username', err)
    } else {
      res.json({username: result[0].username, image: result[0].Image})
    }
  })
})
const nodemailer = require('nodemailer')
app.post('/sendcode', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the appropriate email service
    auth: {
        user: keys.addres,
        pass: keys.password
    }
})

var code = '';
const characters = '0123456789';
const charactersLength = characters.length;
for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength));
}
const message = {
  from: keys.addres,
  to: req.body.email,
  subject: 'Test Email Subject',
  text: 'Your verification code is:' + code
};

// Send email
if (!req.session.vercode) {
  transporter.sendMail(message, (err, info) => {
    if (err) {
        console.log('Error occurred. ' + err.message);
        return res.status(500).send('Error sending email.');
    }
    req.session.vercode = code
    console.log('Email sent: ' + info.response);
    res.json({sendcode: true})
  });
}
})
// Add favourite authors
app.post('/addauthor', authenticate, (req, res) => {
  // const userId = req.session.userID;
  conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is error related to add fav author', err)
    } else {
      if (req.body.author !== '') {
        const authorsarray = JSON.parse(result[0].Authors)
        authorsarray.push(req.body.author)
        const strAuthors = JSON.stringify(authorsarray) 
        conn.query('UPDATE ffb.users SET Authors = ? WHERE id = ?', [strAuthors, req.userId], (error) => {
          if (error) {
            console.error('There is error related to add new author update', error)
          } else {
            res.json({authors: strAuthors})
            console.log('Author add')
          }
        })
       } else {
         res.json({authors: result[0].Authors})
      }
    }
    })
})
// add fav genres array
app.post('/addfavgenre', authenticate, (req, res) => {
  // const userId = req.session.userID
      if (JSON.parse(req.body.favgenres).length !== 0) {
        conn.query('UPDATE ffb.users SET Genres = ? WHERE id = ?', [req.body.favgenres, req.userId], (error) => {
          if (error) {
            console.error('There is error related to add new genres update', error)
          } else {
            res.json({genarray: req.body.favgenres})
            console.log('fav genres add')
          }
        })
       } else {
          conn.query('SELECT * FROM ffb.users WHERE id = ?', [req.userId], (err, result) => {
    if (err) {
      console.error('There is error related to add fav genres', err)
     } else {
          res.json({genarray: result[0].Genres})
     }
  })
       }
  })
// import routs
app.post('/sign', (req, res) => {
  const userinfo = req.body
  if (userinfo.username !== '') {
    if (userinfo.code == req.session.vercode) {
      bcrypt.hash(userinfo.password, 10, (err, hash) => {
          if (err) {
              console.error('There is error when hashing password', err)
          } else {
              conn.query('SELECT * FROM ffb.users WHERE  email = ? ', [userinfo.email], (errm, result) => {
                  if (errm) {
                      console.error('There is error when check existance', errm)
                  } else {
                      if (result.length > 0) {
                          res.json({err: "There is account already"})
                      } else {
                          conn.query('INSERT INTO ffb.users (username, email, password) VALUES (?, ?, ?)', [userinfo.username, userinfo.email, hash], (error) => {
                              if (error) {
                                  console.error('There is error related to insert new record', error)
                              } else {
                                  res.json({err: "Welcome"})
                              }
                          })
                      }
                  }
              })
          }
      })
    } else {
      res.json({err: "Check your verification code"})
    }
  } else {
      conn.query('SELECT * FROM ffb.users WHERE email = ?', [userinfo.email], (err, result) => {
          if (err) {
              console.error('There is error when sign in', err)
          } else {
              if (result.length === 1) {
                  bcrypt.compare(userinfo.password, result[0].password, (error, resulte) => {
                      if (err) {
                          console.error('There is error when compare hashed and real password in db', error)
                      } else if(resulte) {
                          req.session.userID = result[0].id; // Set session data
                          req.userId = req.session.userID
                          res.json({err: result[0].username})
                      } else {
                          res.json({err: "Your password or email is incorrect! Please try agein"})
                      }
                  })
              }
          }
      })
      }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})