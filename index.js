const useCosmeticaAsBackup = false;

const express = require("express");
const request = require("request");
const fs = require("fs");
const app = express();

function removeTimestamp(string) {
    if (string.includes("?")) {
        string = string.split("?")[0];
    }
    return string;
}

async function handleRequest(res, url, statusCode) {
    console.log(url);
    request.get(url)
    .on("error", function(e) {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("Not found");
    }).on("response", function(data) {
        if (data.statusCode != 200) {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("Not found");
        } else {
            res.writeHead(200, {"Content-Type": statusCode});
            data.pipe(res);
        }
    });
}

app.get('/capes/*', async function(req, res) {
    var username = removeTimestamp(req.url.substring(7));
    if (username.toLowerCase().endsWith(".png")) {
        username = username.substring(0, username.length - 4);
    }
    console.log(username);
        if (fs.existsSync("./capes/" + username + ".png")) {
                try {
                        fs.createReadStream("./capes/" + username + ".png").pipe(res);
                } catch (e) {
                        res.end();
                }
        } else {
                if (useCosmeticaAsBackup) {
                        handleRequest(res, 'http://api.cosmetica.cc/get/cloak?username=' + username, "image/png");
                } else {
                        handleRequest(res, 'http://107.182.233.85/capes/' + username + ".png", "image/png");
                }
        }
});

app.use(function(req, res, next) {
    res.status(404).send("404 :(");
});

app.listen(80, function() {
    console.log('Listening on port 80.');
});
