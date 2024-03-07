  const keys = require('../keys')
  
  // Session middleware setup
  const sessionConfig = {
    secret: keys.secret,                      // Secret key to sign the session ID cookie
    resave: false,                                  // Don't save session if unmodified
    saveUninitialized: false,                       // Don't create session until something is stored
    cookie: {
      secure: false,                                // Set it to true if your app is served over HTTPS
      httpOnly: true,                               // Cookie accessible only by the web server
      maxAge: 1000 * 60 * 60 *24                               // Session max age in milliseconds (1 hour)
    }
  }
  module.exports = sessionConfig;