module.exports = function (app, exposeTemplates, hbs){ 

    var express = require('express');

    app.get('/', function (req, res, next) {
        res.render('home', {
            showTitle: true,
            message: "Dinamic message"
    
        });
    });

};