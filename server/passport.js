var passport = require('passport')
var CustomStrategy = require('passport-custom').Strategy;
var httpntlm = require('httpntlm');

passport.use('olin', new CustomStrategy(
  (req, done) => {
    if (req.body.username && req.body.password) {
      var username = req.body.username;
      olinLogin(req.body.username, req.body.password, 
        (err, res) => {

          if (err) {
            return done(err);
          } else {
            err = new Error();
            switch (res.statusCode) {
              case 200:
                user = {
                  'username': username,
                  'dispname': /<t:DisplayName>(.+)<\/t:DisplayName>/g.exec(res.body)[1],
                  'email': /<t:EmailAddress>(.+)<\/t:EmailAddress>/g.exec(res.body)[1],
                  'department': /<t:Department>(.+)<\/t:Department>/g.exec(res.body)[1],
                  'jobtitle': /<t:JobTitle>(.+)<\/t:JobTitle>/g.exec(res.body)[1]
                };
                return done(null, user);
              case 500:
                err.message = 'Internal Server Error';
              case 401:
                err.message = 'Unauthorized';
              default:
                err.message = 'Something went wrong';
            }
            err.status = res.statusCode;
            return done(err, false);
          }
        }
      );
    } else {
      err = new Error('Bad Request');
      err.status = 400;
      return done(err, false);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// NTLM authentication through webmail using SOAP
var olinLogin = (username, password, done) => {

  const url = "https://webmail.olin.edu/ews/exchange.asmx";
  const wsdl = `<?xml version="1.0" encoding="utf-8"?>
              <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                             xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
                             xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types">
                <soap:Body>
                  <ResolveNames xmlns="http://schemas.microsoft.com/exchange/services/2006/messages"
                                xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"
                                ReturnFullContactData="true">
                    <UnresolvedEntry>${username}</UnresolvedEntry>
                  </ResolveNames>
                </soap:Body>
              </soap:Envelope>`;

  // // TESTING - ADD DELAY
  // var start = Date.now(),
  //     now = start;
  // while (now - start < 2000) {
  //   now = Date.now();
  // }
  // // TESTING - SKIP NTLM REQUEST
  // err = new Error('Test Error');
  // err.status = 401;
  // return done(err);

  httpntlm.post({
    url: url,
    username: username,
    password: password,
    workstation: '',
    domain: 'MILKYWAY',
    body: wsdl,
    headers: {'Content-Type': 'text/xml; charset=utf-8'}
  }, done);
};

module.exports = passport;
