var passport = require('passport')
var CustomStrategy = require('passport-custom').Strategy;
var httpntlm = require('httpntlm');

passport.use('olin', new CustomStrategy(
  (req, done) => {
    if (req.body.username && req.body.password) {
      var username = req.body.username;
      olinLogin(req.body.username, req.body.password, 
        (err, res) => {

          // TESTING - ADD DELAY
          // var start = Date.now(),
          //     now = start;
          // while (now - start < 2000) {
          //   now = Date.now();
          // }

          if (err) {
            return done(err);
          } else if (res.statusCode != 200) {
            err = res.statusCode;
            return done(err, false);
          } else {
            user = {
            'username': username,
            'dispname': /<t:DisplayName>(.+)<\/t:DisplayName>/g.exec(res.body)[1],
            'email': /<t:EmailAddress>(.+)<\/t:EmailAddress>/g.exec(res.body)[1],
            'department': /<t:Department>(.+)<\/t:Department>/g.exec(res.body)[1],
            'jobtitle': /<t:JobTitle>(.+)<\/t:JobTitle>/g.exec(res.body)[1]
            }
            return done(null, user);
          }
        }
      );
    } else {
      return done(400, false);
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

  // TESTING - SKIP NTLM REQUEST
  // return done(500);

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