const mysql= require('mysql2');
const connectionstring= ({
    host: 'localhost',
    user: 'root',
    password: 'Garima#1105@a',
    database: 'Ecommerce'
});

const connection= mysql.createConnection(connectionstring);
connection.connect((err)=> {
    if(err) {
        console.log('Database not created');
    }
    else {
        console.log('database connected successfully');
    }
})
module.exports= connection;