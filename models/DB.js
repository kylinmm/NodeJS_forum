/**
 * 此文本程序库由kylin喵编写
 * 2018.11.11
 */
var mysql  = require('mysql');  
 
var pool = mysql.createPool({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'forum_database' 
}); 

//使用格式xx.SelectDB('SELECT * FROM websites',function(){})
function SelectDB(sql,callback){
	  pool.getConnection(function(err,connection){
        connection.query(sql, function (err,result) {
		 if(err){
         console.log('[Select ERROR] - ',err.message);
        }        
 
		callback(err,result);
            connection.release();
        });
    });
}
//使用格式xx.AddDB('INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)',['kylin', '1222@5522','23453', 'CN'],function(){})
function AddDB(sql,SqlParams,callback){
	 pool.getConnection(function(err,connection){
        connection.query(sql,SqlParams, function (err,result) {
		 if(err){
         console.log('[Add ERROR] - ',err.message);
        }        
 
		callback(err,result);
            connection.release();
        });
    });
}

function DeleteDB(sql,callback){
	  pool.getConnection(function(err,connection){
        connection.query(sql, function (err,result) {
		 if(err){
         console.log('[Delete ERROR] - ',err.message);
        }        
 
		callback(err,result);
            connection.release();
        });
    });
}

function UpdateDB(sql,SqlParams,callback){
	 pool.getConnection(function(err,connection){
        connection.query(sql,SqlParams, function (err,result) {
		 if(err){
         console.log('[Update ERROR] - ',err.message);
        }        
 
		callback(err,result);
            connection.release();
        });
    });
}

function CloseConn(){
	connection.destroy();
	console.log("当前连接池连接数为：",pool._allConnections.length);
}

module.exports = {
 SelectDB,
 UpdateDB,
 DeleteDB,
 AddDB,
 CloseConn
}