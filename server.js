const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://freecodecamp:freecodecamp2017@ds137220.mlab.com:37220/url-shortener";
const port = process.env.PORT || 3000;
const app = express();

app.get("/new/*", (req, res) => {
  MongoClient.connect(mongoUrl, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', mongoUrl);

      const parameter = decodeURIComponent(req.url.substring(1));

      const responseObject = {

      }

      res.end(JSON.stringify(responseObject, undefined, 2));

      db.close();
    }
  });

});

app.listen(port);