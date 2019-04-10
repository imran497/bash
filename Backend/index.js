var axios = require('axios');
var express = require('express');
var parseString = require('xml2js').parseString;
var app = express();
const mysql = require('mysql');

const htmlRoutes = require("./Routes/html_routes");


// process.env.NODE_TLS_REJECT_UNAUTHORIZED = false

const config = {
   headers: {
       'Content-Type': 'application/json',
       'API_KEY': "asdas578SFG-fwmvobsknaiv60"
   }
  };

  axios.defaults.headers.common['Authorization'] = {'API_KEY': "asdas578SFG-fwmvobsknaiv60"};

  // var getUsers =
  //   axios.get( 'https://sso-name.ext.geappl.io/IPAL/webapi/user/320003817',config )
  //    .then(function (response) {
  //      console.log('Success: '+ response.data);
  //      parseString(response.data, function (err, result) {
  //       console.log(JSON.stringify(result));
  //       console.log(result.users.user[0].givenname);
  //   });
  //    })
  //    .catch(function (error) {
  //      console.log('Error: '+ error);
  //    });

  //CORS
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

    htmlRoutes(app);

    app.listen(3001);

    module.exports = app;
