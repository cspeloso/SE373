const express = require('express');
const hbs = require('hbs');

var app = express();

app.set('view engine', hbs);

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:false}));


hbs.registerHelper('selectFunc', ()=>{
    var msg = "";
    var numberArray = [3,4,5,10,20];

    //msg += "<form action='/lab3.1.1results' method='POST'><select value='selectedOption'>";

    for(let i = 0; i < numberArray.length; i++){
        msg += `<option>${numberArray[i]}</option>`;
    }

    //msg += "</select>";

    //msg += "<br><br><input type='submit' value='submit'></form>";

    return msg;
});

hbs.registerHelper('gridFunc', (cellNum)=>{

    var msg = "";

    msg += "<table><tbody>";

    for(let i = 0; i < cellNum;i++){

        msg += `<tr>`

        for(let i = 0;i < cellNum;i++){

            let color = ((1 << 24) * Math.random()|0).toString(16);

            msg += `<td style="background-color:#${color};">${color}<br><span style="color:#ffffff;">${color}</span></td>`;

        }
        msg += `</tr>`;
    }


    msg += "</tbody></table>";

    return msg;
});

hbs.registerHelper('error404', ()=>{
    var randomNumDiv = Math.floor((Math.random() * 20) + 30);
    var randomNumClass = Math.floor((Math.random() * 100) + 1);
    var msg = "";

    for(let i = 0; i < randomNumDiv; i++)
    {
        randomNumClass = Math.floor((Math.random() * 100) + 1);

        if(randomNumClass < 33)
        {
            var classThing = "still";
        }
        if (randomNumClass >= 33 && randomNumClass <= 66)
        {
            var classThing = "rotate";
        }
        if(randomNumClass > 66)
        {
            var classThing = "shrink";
        }

        msg += `<div class="${classThing}">404</div>`
    }
    
    msg += "<br>";

    return msg;

});


app.get('/lab3.1.1', (req,res)=>{
    res.render('lab3.1.1.hbs');
});

app.post('/lab3.1.1results', (req,res)=>{
    res.render('lab3.1.1results.hbs',{
        cellNum:Number(req.body.numberSelect)
    });
    
});


app.get('/', (req,res)=>{
    res.render('index.hbs');
});


app.use((req,res,next)=>{
    const error = new Error("Page not found.");

    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.render("error.hbs", {
        message: `${error.status} - ${error.message}`
    });
});



app.listen(3000, ()=>{
    console.log("Server is running on Port 3000.");
});