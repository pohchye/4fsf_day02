var express = require("express");
var fs = require("fs");
var app = express();

var filenum = 0;
// var dir = "D:\Stackup\4FSF\day02\test";
var dir = ".\\test";

app.set("port",process.argv[2] || 3000);
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/test"));
// app.use("/pic",express.static(__dirname + "/test"));
app.use("/rotate",function (req, res) {
    fs.readdir(dir, function(err,items) {
        if (err) {
            console.log("Error");
            return;
        }
        console.log(items);
        // for (var i=0; i<items.length; i++) {
        //     console.log(items[i]);
        // }
        res.status(200);
        res.type('text/html');
        res.send("<img src='" + items[filenum] + "'>" + "<h1>" + items[filenum] + "</h1>");
        filenum++;
        if (filenum == items.length) {filenum = 0;} 
    });
});
app.use("/random", function (req, res) {
    res.status(200);
    res.type('text/html');
    var pictures = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"];
    var num1 = Math.floor((Math.random() * pictures.length) + 1);
    res.send("<img src='images/" + pictures[num1-1] + "'>" + "<h1>" + pictures[num1-1] + "</h1>");
});
app.listen(app.get("port"),function () {
    console.log("App started");
});