const path = require('path');
//require mysql in node modules to use it
const mysql = require('mysql');
var db = require("../Database/database_connect.js");
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

module.exports = function(app){
  app.use(bodyParser.urlencoded({ extended: true }));
        // If no matching route is found default to index.html
        // app.get('/', function(req, res) {
        //     // res.send('Hello from simple-react project');
        //     console.log("Router GET :");
        //     connection.query('SELECT * FROM `geausermaintenancefdw`.IW_CSR_REP;', function(err, data) {
        //         (err)?res.send(err):res.json({users: data});
        //       });
        // });

        // app.get('/users', function(req, res) {
        //   console.log("Router User :");
        //     // res.send('Hello from simple-react project');
        //     connection.query('SELECT * FROM `geausermaintenancefdw`.IW_CSR_REP;', function(err, data) {
        //         (err)?res.send(err):res.json({users: data});
        //       });
        // });
    app.get('/userList', function(req, res) {
      console.log("inserting Record :");
      db((err, connection) => {
        connection.query('SELECT * FROM `geausermaintenancefdw`.IW_CSR_REP;', function(err, data) {
          (err)?res.send(err):res.json({users: data});
        });
        connection.release();
      });
    });

    app.post('/addNewUser', jsonParser, function(req, res) {
      console.log(req.body);
      console.log("inserting Record :" + req.body.ssoidinput);
      console.log("inserting Record :" + req.body.nameinput);
      const employee = { SSO: req.body.usersso,
                        USER_NAME: req.body.username,
                        TEAM: req.body.userteam,
                        ROLE: req.body.userrole,
                        AGENT: req.body.userAgentID,
                        USER_STATUS: req.body.userstatus,
                        CREATED_USER: "Test",
                        UPDATED_USER: "Test"};
      console.log("inserting Record :" + JSON.stringify(employee));
      db((err, connection) => {
        connection.query('INSERT INTO `geausermaintenancefdw`.IW_CSR_REP SET ?', employee, function(err, data) {
          (err)?res.send(err):res.json({users: data});
        });
        connection.release();
      })
    });

    app.get('/teamList', function(req, res) {
      db((err, connection) => {
        connection.query('SELECT * FROM `geausermaintenancefdw`.IW_CSR_TEAM;', function(err, data) {
          (err)?res.send(err):res.json({teams: data});
        });
        connection.release();
      });

    });

    app.post('/addteam', jsonParser, function(req, res) {
      console.log(req.body);
      console.log("inserting Record :" + req.body.teamid);
      console.log("inserting Record :" + req.body.teamleadersso);
      const teamdata = { TEAM: req.body.teamid,
                        TEAM_LEADER_SSO: req.body.teamleadersso,
                        CREATED_DATE: null,
                        CREATED_USER: "Test",
                        UPDATED_DATE: null,
                        UPDATED_USER: "Test"};
      console.log("inserting Record :" + JSON.stringify(teamdata));
      db((err, connection) => {
        connection.query('INSERT INTO `geausermaintenancefdw`.IW_CSR_TEAM SET ?', teamdata , function(err, data) {
          (err)?res.send(err):res.json({users: data});
        });
        connection.release();
      })
    });
}
