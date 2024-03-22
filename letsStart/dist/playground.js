"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cats_model_1 = require("./cats/cats.model");
var app = express();
app.use(function (req, res, next) {
    console.log("this is LOGGING middleware");
    next();
});
app.use(express.json());
app.get("/", function (req, res) {
    res.send(cats_model_1.Cat);
});
app.get("**/cats/**", function (req, res, next) {
    console.log("this is CATS middleware");
    next();
});
app.get("/cats", function (req, res) {
    try {
        var cats = cats_model_1.Cat;
        res.status(200).send({
            success: true,
            data: cats,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});
app.get("/cats/:id", function (req, res) {
    var id = req.params.id;
    res.send(cats_model_1.Cat.filter(function (cat) { return cat.id === id; }));
});
app.post("/cats", function (req, res) {
    try {
        console.log(req.body);
        cats_model_1.Cat.push(req.body);
        res.status(200).send({
            success: true,
            data: req.body,
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});
app.get("/cats/tom", function (req, res) {
    res.send(cats_model_1.Cat.filter(function (cat) { return cat.name === "Tom"; }));
});
app.use(function (req, res) {
    console.log("this is 404 middleware");
    res.status(400).send("404 Not Found");
});
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=playground.js.map