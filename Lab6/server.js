var express = require("express");
var hbs = require("hbs");
var mongoose = require("mongoose");
//var messages = require("./exports/hello.js");
var Person = require('./schemas/person.js');

var app = express();
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/Empl', {useNewUrlParser: true});

hbs.registerHelper('FormSubmission', ()=>{
    firstName = firstName

});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open',function() {
    console.log("We're connected.");
});


/*var guy = new Person({
    firstName:"Chris",
    lastName:"Peloso",
    age:20
});

guy.save(function (err, person) {
    if (err) return console.error(err);
    console.log("Saved" + person);
})

app.get('/people', function(req,res){
    console.log(Person.find({firstName:"Chris"}, function(err,data){
        if(err) return console.error(err)
        console.log(data)
    }))
})*/

app.get('/',(req,res)=>{
    res.render('index.hbs');
})

app.get('/view',(req,res)=>{
    Person.find({}, function(err,data){
        var personsData = data;
        console.log(personsData);

        res.render('view.hbs',{
            data:personsData
        });
    })
})

app.get('/update', (req,res)=>{

    res.render('update.hbs',{
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        department:req.query.department,
        startDate:req.query.startDate,
        jobTitle:req.query.jobTitle,
        salary:req.query.salary,

        firstName2: req.query.firstName,
        lastName2: req.query.lastName,
        department2:req.query.department,
        startDate2:req.query.startDate,
        jobTitle2:req.query.jobTitle,
        salary2:req.query.salary
    })
})

app.get('/delete', (req,res)=>{
    Person.find({}, function(err,data){
        var personsData = data;
        console.log(personsData);

        res.render('delete.hbs',{
            data:personsData
        });
    })
})

hbs.registerHelper('ViewFunc', (personsData)=>{
    
    var msg = "";

    for(let i = 0; i < personsData.length; i++){
        msg += `<li>${personsData[i].firstName}</li>`
        msg += `<li>${personsData[i].lastName}</li>`
        msg += `<li>${personsData[i].department}</li>`
        msg += `<li>${personsData[i].startDate}</li>`
        msg += `<li>${personsData[i].jobTitle}</li>`
        msg += `<li>${personsData[i].salary}</li>`
        msg += `<li><a href="/update?firstName=${personsData[i].firstName}&lastName=${personsData[i].lastName}&department=${personsData[i].department}&startDate=${personsData[i].startDate}&jobTitle=${personsData[i].jobTitle}&salary=${personsData[i].salary}" style="color:blue;text-decoration:none;">Update Record</a></li>`
        msg += `<br><br>`
    }

    return msg;
})


hbs.registerHelper('DeleteFunc', (personsData)=>{

    var msg = "";

    for(let i = 0; i < personsData.length; i++){
        msg += `<li>${personsData[i].firstName}</li>`
        msg += `<li>${personsData[i].lastName}</li>`
        msg += `<li>${personsData[i].department}</li>`
        msg += `<li>${personsData[i].startDate}</li>`
        msg += `<li>${personsData[i].jobTitle}</li>`
        msg += `<li>${personsData[i].salary}</li>`
        msg += `<li><a href="/deletePerson?firstName=${personsData[i].firstName}&lastName=${personsData[i].lastName}&department=${personsData[i].department}&startDate=${personsData[i].startDate}&jobTitle=${personsData[i].jobTitle}&salary=${personsData[i].salary}" style="color:blue;text-decoration:none;">Delete Record</a></li>`
        msg += `<br><br>`
    }

    return msg;
})

app.get('/update',(req,res)=>{
    res.render('update.hbs');
})

/*app.get('/delete',(req,res)=>{
    res.render('delete.hbs');
})*/

app.get('/deletePerson', (req,res)=>{

    var personThing = new Person({
        firstName:req.query.firstName,
        lastName:req.query.lastName,
        department:req.query.department,
        //startDate:req.query.startDate,
        jobTitle:req.query.jobTitle,
        salary:req.query.salary
    })

    Person.findOne({
        firstName:req.query.firstName,
        lastName:req.query.lastName,
        department:req.query.department,
        //startDate:req.query.startDate,
        jobTitle:req.query.jobTitle,
        salary:req.query.salary
    }).remove().exec();

    

    res.render('deletePerson.hbs',{
        personThing
    })

})

app.post('/updateSubmit', (req,res)=>{

    var personThing = new Person({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        department:req.body.department,
        startDate:req.body.startDate,
        jobTitle:req.body.jobTitle,
        salary:req.body.salary
    })

    var personThingOld = new Person({
        firstName:req.body.firstName2,
        lastName:req.body.lastName2,
        department:req.body.department2,
        //startDate:req.body.startDate2,
        jobTitle:req.body.jobTitle2,
        salary:req.body.salary2
    })

    personThing.save();
    

    /*Person.update({
        firstName:req.body.firstName2,
        lastName:req.body.lastName2,
        department:req.body.department2,
        //startDate:req.body.startDate2,
        jobTitle:req.body.jobTitle2,
        salary:req.body.salary2
    }, { $set: {
        firstName:req.body.firstName2,
        lastName:req.body.lastName2,
        department:req.body.department2,
        //startDate:req.body.startDate2,
        jobTitle:req.body.jobTitle2,
        salary:req.body.salary2
    }}).exec();*/

    Person.findOne({
        firstName:req.body.firstName2,
        lastName:req.body.lastName2,
        department:req.body.department2,
        //startDate:req.body.startDate2,
        jobTitle:req.body.jobTitle2,
        salary:req.body.salary2
    }).remove().exec();

    console.log("OLD THING:" + personThingOld);

    console.log("NEW THING:\n" + personThing);


     res.render('updateFinished.hbs',{
        
        thing:personThing,
        thing2:personThingOld,

        firstName:req.body.firstName,
        lastName:req.body.lname,
        department:req.body.department,
        startDate:req.body.startDate,
        jobTitle:req.body.jobTitle,
        salary:req.body.salary,

        firstName2:req.body.firstName2,
        lastName2:req.body.lastName2,
        department2:req.body.department2,
        startDate2:req.body.startDate2,
        jobTitle2:req.body.jobTitle2,
        salary2:req.body.salary2
     })
})


app.post('/lab6personCreation', (req,res)=>{

    var personThing = new Person({
        firstName:req.body.fName,
        lastName:req.body.lName,
        department:req.body.department,
        startDate:req.body.startDate,
        jobTitle:req.body.jobTitle,
        salary:req.body.salary
    })

    personThing.save(function (err, person){
        if (err) return console.error(err);
        console.log("Saved" + personThing)
    })

    res.render('lab6personCreation.hbs',{
        firstName: req.body.fName,
        lastName: req.body.lName,
        department:req.body.department,
        startDate:req.body.startDate,
        jobTitle:req.body.jobTitle,
        salary:req.body.salary

    });

})






//messages.hello();
//messages.goodbye();
/*app.get("/", function(request,response){
    response.send("Hello");
});*/

app.listen("3000", function(){
    console.log("Server up on port 3000.");
});