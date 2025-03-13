const express = require('express');
const connectDB = require('./config/db');
const eventRoutes = require('./controllers/eventcontroller');

const app = express();

var bodyParser = require('body-parser')

app.use(bodyParser.json())


require('dotenv').config();
const cors = require('cors');  // Import CORS package



connectDB();


app.use(cors());  
app.use(express.json());  

app.use(function(req, res, next) {
    var user = auth(req);

    if (user === undefined || user['name'] !== 'username' || user['pass'] !== 'password') {
        res.writeHead(401, 'Access invalid for user', {'Content-Type' : 'text/plain'});
        res.end('Invalid credentials');
    } else {
        next();
    }
});


app.post('/api/events', eventRoutes);  


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});