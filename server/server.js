const express = require("express");
const app = express();

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "spiller.vcmp.net"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
    // perform a database connection when server starts
    dbo.connectToServer(function (err) {
        if (err) console.error(err);
    
    });
    console.log(`Server is running on port: ${port}`);
});