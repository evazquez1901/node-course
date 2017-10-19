const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});


app.set('view_engine','hbs');

//middle ware 
app.use( (req,res,next)=>{
    var now = new Date().toString();
    var log = now +' : '+ req.method +' '+ req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\n',
        (err)=>{
            if(err!=null) console.log('Unable to append to server.log');
        }
    );
    next();
} );

//__dirname stores the addres of your server 
app.use( express.static(__dirname + '/public' )  );


app.get('/', 
(req,res) => {
    res.render('home.hbs', {
        pageTitle : 'Welcome page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome stranger'
        }
    )
}
);

app.get('/about',
(req,res) => {
    res.render('about.hbs',{
        pageTitle : 'About page',
        currentYear: new Date().getFullYear()
    });
}
);

app.get('/projects',
(req,res) => {
    res.render('projects.hbs',{
        pageTitle : 'Projects page',
        currentYear: new Date().getFullYear()
    });
}
);

app.get('/bad',
(req,res) => {
    res.send(  {
        error : 'lol to bad'
    }  )
}
);

app.listen(port,
() => {
    console.log("Server is up on port "+port);
});