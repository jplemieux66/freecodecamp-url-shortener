const express = require('express');
const shortid = require('shortid');
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://freecodecamp:freecodecamp2017@ds137220.mlab.com:37220/url-shortener";
const port = process.env.PORT || 3000;
const app = express();

app.get("/new/*", (req, res) => {
  MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw err;
    const originalUrl = decodeURIComponent(req.url.replace('/new/', ''));

    const shortId = shortid.generate();
    db.collection("urls").insertOne({
      originalUrl,
      shortId
    }).catch((err) => {
      throw err;
    });

    const shortUrl = `http://localhost:3000/${shortId}`;
    const responseObject = {
      originalUrl,
      shortUrl
    }

    res.end(JSON.stringify(responseObject, undefined, 2));

    db.close();
  });
});

app.get("/*", (req, res) => {
  MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw err;
    const shortId = decodeURIComponent(req.url.substring(1));

    db.collection("urls").findOne({ shortId }).then((urlDocument) => {
      if (urlDocument) {
        res.writeHead(301,
          { Location: urlDocument.originalUrl }
        );
        res.end();
      } else {
        res.end("This url is not in the database.");
      }
    }).catch((err) => {
      throw err;
    });

    db.close();
  });
});

app.listen(port);
console.log(`Server is listening on port ${port}`);