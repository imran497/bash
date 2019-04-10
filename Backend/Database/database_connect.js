var mysql = require('mysql');

var pool = mysql.createPool({
  host: 'geausermaintfdw.czvxkoyupsni.us-east-1.rds.amazonaws.com',
  user: 'geausermaintfdw',
  password: 'geausermaintfdw',
  ssl: "Amazon RDS",
  database: 'geausermaintenancefdw'
});

module.exports = (cb) => {
  pool.getConnection((err, connection) => {
    if(err){
      console.log(err);
      return cb(err);
    }
    return cb(null, connection);
  });
};
