const express = require("express");
const crypto = require("crypto");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// sign in or create a new user
recordRoutes.route("/api/account").post(function (req, response) {
    let db_connect = dbo.getDb();

    let myquery = { username: String(req.body.username) };
    db_connect
    .collection("data")
    .findOne(myquery, function (err, result) {
        if (err) throw err;

        // user doesn't exist, let's create one
        if(result === null) {
            let userObj = {
                username: req.body.username,
                password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
                images: Array(),
            };
            db_connect.collection("data").insertOne(userObj, function (err, res) {
                if (err) throw err;
                response.json(res.insertedId.toString());
            });
        }
        else {

            // if the user is found, check for password
            if(crypto.createHash('sha256').update(req.body.password).digest('base64') === result.password)
                response.json(result._id.toString());
            else response.json("PASS_INCORRECT");
        }
    });
});

// to display list of images
recordRoutes.route("/api/images/:id").get(function (req, res) {

    let db_connect = dbo.getDb();
    if(req.params.id.length !== 24) {
        res.json(null);
        return;
    }

    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("data")
        .findOne(myquery, function (err, result) {
          if (err) throw err;
          res.json(result.images);
        });
});

// to update images
recordRoutes.route("/api/update/:id").post(function (req, response) {

    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
        $set: {
            images: req.body
        },
    };

    db_connect
        .collection("data")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            response.json(res);
        });
});

// to display a random image from user's images
recordRoutes.route("/:id").get(function(req, response) {

    let db_connect = dbo.getDb();
    if(req.params.id.length !== 24) {
        response.redirect('https://spiller.vcmp.net/images');
        return;
    }

    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("data")
        .findOne(myquery, function (err, result) {
            if (err) throw err;

            if(result === null) {
                response.redirect('https://spiller.vcmp.net/images');
                return;
            }

            const url = result.images[Math.floor(Math.random()*result.images.length)];  
            response.redirect(url);
        });
});

module.exports = recordRoutes;