const express = require('express');
const exphbs  = require('express-handlebars');
const routes = require('./routes/index');
const app = express();
const mongoose = require('mongoose');

//Conecting Database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/cms");
 
var hbs = exphbs.create({
    helpers: {
        foo: function () { return 'FOO!'; },
        bar: function () { return 'BAR!'; }
    },
    partialsDir: [ 
        '/views/partials',
        '/shared/templates'
    ]
});

app.engine('handlebars', exphbs({ extname: '.handlebars' }));
app.set('view engine', 'handlebars');

function exposeTemplates(req, res, next) {
    hbs.getTemplates('shared/templates/', {
        cache      : app.enabled('view cache'),
        precompiled: true
    }).then(function (templates) {
        var extRegex = new RegExp(hbs.extname + '$');

        templates = Object.keys(templates).map(function (name) {
            return {
                name    : name.replace(extRegex, ''),
                template: templates[name]
            };
        });

        if (templates.length) {
            res.locals.templates = templates;
        }

        setImmediate(next);
    })
    .catch(next);
};


const server = app.listen(3005, function(){
	console.log('Server running on port: '+ process.env.PORT);
});

require('./routes/index.js')(app, exposeTemplates, hbs);
