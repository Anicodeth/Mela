//Require http
import http from 'http'

//Require config
import config from '../config.js'

//Require app 
import app from './app.js'

//Start Database Connection
import db_conn from './DB.js'

const ingniter = () =>{
    
    //Creating the server
    const server = http.createServer(app)
    
    //Provide the port
    const port = config.PORT || 3000

    //Listening onto the server
    server.listen(port,()=>{
        console.log(`Server running on port ${port}...`)
    })

    // Implementing the Majestic Close
  process.on("SIGINT", () => {
    server.close(() => {
      console.log(`App is closing`);
    });
    db_conn.close(() => {
      console.log(`DB is closing`);
    });
  });
}

export default ingniter;