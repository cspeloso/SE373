var express = require("express");
var hbs = require("hbs");
var mongoose = require("mongoose");

var Income = require('./schemas/income.js');
var Expenses = require('./schemas/expenses.js');
var Goals = require('./schemas/goals.js');

var app = express()
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/BudgetBuddy', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log("We're connected.");
});


app.get('/', (req,res)=>{
    var incomeTotal = 0;
    var expensesTotal = 0;
    var goalsTotal = 0;

    Income.find({}, function(err,data){
        for(let i = 0; i < data.length; i++)
        {
            incomeTotal += data[i].amount;
        }

        Expenses.find({}, function(err,data){
            for(let i = 0; i< data.length; i++)
            {
                expensesTotal += data[i].amount;
            }

            Goals.find({}, function(err,data){
                for(let i = 0; i< data.length; i++)
                {
                    goalsTotal += data[i].amount;
                }
        
                res.render('index.hbs',{
                    incomeTotal:incomeTotal,
                    expensesTotal:expensesTotal,
                    goalsTotal:goalsTotal
                });
            })
        })
    })

    
})

app.get('/income', (req,res)=>{
    Income.find({}, function(err,data){
        var incomeData = data;
        console.log(incomeData);

        res.render('income.hbs', {
            data:incomeData
        });
    })
})

app.get('/expenses', (req,res)=>{
    Expenses.find({}, function(err,data){
        var expensesData = data;
        console.log(expensesData);

        res.render('expenses.hbs', {
            data:expensesData
        });
    });
});

app.get('/goals', (req,res)=>{
    Goals.find({}, function(err,data){
        var goalsData = data;
        console.log(goalsData);

        res.render('goals.hbs', {
            data:goalsData
        });
    })
})

app.get('/adminCP', (req,res) =>{
    res.render('adminCP.hbs');
});

app.get('/adminIncome', (req,res) =>{
    Income.find({}, function(err,data){
        var incomeData = data;
        console.log(incomeData);

        res.render('adminIncome.hbs', {
            data:incomeData
        });
    })
    
});

app.get('/adminExpenses', (req,res) =>{
    Expenses.find({}, function(err,data){
        var expensesData = data;
        console.log(expensesData);

        res.render('adminExpenses.hbs', {
            data:expensesData
        });
    })
    
});

app.get('/adminGoals', (req,res) =>{
    Goals.find({}, function(err,data){
        var goalsData = data;
        console.log(goalsData);

        res.render('adminGoals.hbs', {
            data:goalsData
        });
    })
    
});

app.post('/IncomeSubmitFunc', (req,res)=>{
    var incomeThing = new Income({
        title: req.body.title,
        amount:req.body.amount,
        interval:req.body.interval,
        notes:req.body.notes,
        date:req.body.date
    })

    incomeThing.save(function(err, income){
        if (err) return console.error(err);
        console.log("Saved" + incomeThing)
    })

    var incomeTotal = 0;
    var expensesTotal = 0;
    var goalsTotal = 0;


    Expenses.find({}, function(err,data){
        for(let i = 0; i< data.length; i++)
        {
            expensesTotal += data[i].amount;
        }        

        Goals.find({}, function(err,data){
            for(let i = 0; i< data.length; i++)
            {
                goalsTotal += data[i].amount;
            }


                Income.find({}, function(err,data){
                    for(let i = 0; i < data.length; i++)
                    {
                        incomeTotal += data[i].amount;
                    }        
        
                res.render('index.hbs',{
                    incomeTotal:incomeTotal,
                    expensesTotal:expensesTotal,
                    goalsTotal:goalsTotal
                });
            })
        })
    })
})

app.post('/ExpensesSubmitFunc', (req,res)=>{
    var expensesThing = new Expenses({
        title: req.body.title,
        amount:req.body.amount,
        interval:req.body.interval,
        notes:req.body.notes,
        date:req.body.date
    })

    expensesThing.save(function(err, expenses){
        if (err) return console.error(err);
        console.log("Saved" + expensesThing)
    })

    var incomeTotal = 0;
    var expensesTotal = 0;
    var goalsTotal = 0;

    Income.find({}, function(err,data){
        for(let i = 0; i < data.length; i++)
        {
            incomeTotal += data[i].amount;
        }       

        Goals.find({}, function(err,data){
            for(let i = 0; i< data.length; i++)
            {
                goalsTotal += data[i].amount;
            }

                Expenses.find({}, function(err,data){
                    for(let i = 0; i< data.length; i++)
                    {
                        expensesTotal += data[i].amount;
                    }
        
                res.render('index.hbs',{
                    incomeTotal:incomeTotal,
                    expensesTotal:expensesTotal,
                    goalsTotal:goalsTotal
                });
            })
        })
    })
})

app.post('/GoalsSubmitFunc', (req,res)=>{
    var goalsThing = new Goals({
        title: req.body.title,
        amount:req.body.amount,
        priority:req.body.interval,
        notes:req.body.notes,
        date:req.body.date
    })

    goalsThing.save(function(err, goals){
        if (err) return console.error(err);
        console.log("Saved" + goalsThing)
    })

    var incomeTotal = 0;
    var expensesTotal = 0;
    var goalsTotal = 0;

    Income.find({}, function(err,data){
        for(let i = 0; i < data.length; i++)
        {
            incomeTotal += data[i].amount;
        }

        Expenses.find({}, function(err,data){
            for(let i = 0; i< data.length; i++)
            {
                expensesTotal += data[i].amount;
            }

            Goals.find({}, function(err,data){
                for(let i = 0; i< data.length; i++)
                {
                    goalsTotal += data[i].amount;
                }
        
                res.render('index.hbs',{
                    incomeTotal:incomeTotal,
                    expensesTotal:expensesTotal,
                    goalsTotal:goalsTotal
                });
            })
        })
    })
})

hbs.registerHelper('ViewIncomeFunc', (incomeData)=>{
    var msg = "";

    for(let i = 0; i < incomeData.length; i++){
        msg += `<li>${incomeData[i].title}</li>`
        msg += `<li>${incomeData[i].amount}</li>`
        msg += `<li>${incomeData[i].interval}</li>`
        msg += `<li>${incomeData[i].notes}</li>`
        msg += `<li>${incomeData[i].date}</li>`
        msg += `<li><a href="/updateIncome?title=${incomeData[i].title}&amount=${incomeData[i].amount}&interval=${incomeData[i].interval}&notes=${incomeData[i].notes}&date=${incomeData[i].date}" style="color:blue;text-decoration:none;">Update</a></li>`
        msg += `<li><a href="/deleteIncome?title=${incomeData[i].title}&amount=${incomeData[i].amount}&interval=${incomeData[i].interval}&notes=${incomeData[i].notes}&date=${incomeData[i].date}" style="color:blue;text-decoration:none;">Delete</a></li>`
        msg += `<br><br>`
    }

    return msg;
});

hbs.registerHelper('ViewIncomeFuncClient', (incomeData)=>{
    var msg = "";

    for(let i = 0; i < incomeData.length; i++){
        msg += `<li>${incomeData[i].title}</li>`
        msg += `<li>${incomeData[i].amount}</li>`
        msg += `<li>${incomeData[i].interval}</li>`

        if(incomeData[i].notes != ""){
            msg += `<li>${incomeData[i].notes}</li>`
        }

        msg += `<li>${incomeData[i].date}</li>`
        msg += `<br><br>`
    }

    return msg;
});

hbs.registerHelper('ViewExpensesFunc', (expensesData)=>{
    var msg = "";

    for(let i = 0; i < expensesData.length; i++){
        msg += `<li>${expensesData[i].title}</li>`
        msg += `<li>${expensesData[i].amount}</li>`
        msg += `<li>${expensesData[i].interval}</li>`
        msg += `<li>${expensesData[i].notes}</li>`
        msg += `<li>${expensesData[i].date}</li>`
        msg += `<li><a href="/updateExpenses?title=${expensesData[i].title}&amount=${expensesData[i].amount}&interval=${expensesData[i].interval}&notes=${expensesData[i].notes}&date=${expensesData[i].date}" style="color:blue;text-decoration:none;">Update</a></li>`
        msg += `<li><a href="/deleteExpenses?title=${expensesData[i].title}&amount=${expensesData[i].amount}&interval=${expensesData[i].interval}&notes=${expensesData[i].notes}&date=${expensesData[i].date}" style="color:blue;text-decoration:none;">Delete</a></li>`
        msg += `<br><br>`
    }

    return msg;
});

hbs.registerHelper('ViewExpensesFuncClient', (expensesData)=>{
    var msg = "";

    for(let i = 0; i < expensesData.length; i++){
        msg += `<li>${expensesData[i].title}</li>`
        msg += `<li>${expensesData[i].amount}</li>`
        msg += `<li>${expensesData[i].interval}</li>`

        if(expensesData[i].notes != ""){
            msg += `<li>${expensesData[i].notes}</li>`
        }

        msg += `<li>${expensesData[i].date}</li>`
         msg += `<br><br>`
    }

    return msg;
});

hbs.registerHelper('ViewGoalsFunc', (goalsData)=>{
    var msg = "";

    for(let i = 0; i < goalsData.length; i++){
        msg += `<li>${goalsData[i].title}</li>`
        msg += `<li>${goalsData[i].amount}</li>`
        msg += `<li>${goalsData[i].interval}</li>`
        msg += `<li>${goalsData[i].notes}</li>`
        msg += `<li>${goalsData[i].date}</li>`
        msg += `<li><a href="/updateGoals?title=${goalsData[i].title}&amount=${goalsData[i].amount}&priority=${goalsData[i].interval}&notes=${goalsData[i].notes}&date=${goalsData[i].date}" style="color:blue;text-decoration:none;">Update</a></li>`
        msg += `<li><a href="/deleteGoals?title=${goalsData[i].title}&amount=${goalsData[i].amount}&priority=${goalsData[i].interval}&notes=${goalsData[i].notes}&date=${goalsData[i].date}" style="color:blue;text-decoration:none;">Delete</a></li>`
        msg += `<br><br>`

    }

    return msg;
});

hbs.registerHelper('ViewGoalsFuncClient', (goalsData)=>{
    var msg = "";

    for(let i = 0; i < goalsData.length; i++){
        msg += `<li>${goalsData[i].title}</li>`
        msg += `<li>${goalsData[i].amount}</li>`
        msg += `<li>${goalsData[i].priority}</li>`
        msg += `<li>${goalsData[i].notes}</li>`
        msg += `<li>${goalsData[i].date}</li>`
        msg += `<br><br>`

    }

    return msg;
});

app.get('/updateIncome', (req,res)=>{
    res.render('updateIncome.hbs',{
        title: req.query.title,
        amount: req.query.amount,
        interval: req.query.interval,
        notes: req.query.notes,
        date: req.query.date
    });
})

app.get('/updateExpenses', (req,res)=>{
    res.render('updateExpenses.hbs',{
        title: req.query.title,
        amount: req.query.amount,
        interval: req.query.interval,
        notes: req.query.notes,
        date: req.query.date
    });
})

app.get('/updateGoals', (req,res)=>{
    res.render('updateGoals.hbs',{
        title: req.query.title,
        amount: req.query.amount,
        priority: req.query.priority,
        notes: req.query.notes,
        date: req.query.date
    });
})

app.post('/updateIncomeSubmit', (req,res)=>{
    var incomeOriginal = new Income({
        title:req.body.title2,
        amount:req.body.amount2,
        interval:req.body.interval2,
        notes:req.body.notes2,
        date:req.body.date2
    })

    var incomeNew = new Income({
        title:req.body.title,
        amount:req.body.amount,
        interval:req.body.interval,
        notes:req.body.notes,
        date:req.body.date
    })

    incomeNew.save();

    Income.findOneAndRemove({
        title:req.body.title2,
        amount:req.body.amount2,
        interval:req.body.interval2,
        notes:req.body.notes2,
        date:req.body.date2
    }).exec();

    res.render('admincp.hbs')
})

app.post('/updateExpensesSubmit', (req,res)=>{

    var expenseOriginal = new Expenses({
        title:req.body.title2,
        amount:req.body.amount2,
        interval:req.body.interval2,
        notes:req.body.notes2,
        date:req.body.date2
    })

    var expensesNew = new Expenses({
        title:req.body.title,
        amount:req.body.amount,
        interval:req.body.interval,
        notes:req.body.notes,
        date:req.body.date
    })

    expensesNew.save();

    Expenses.findOne({
        title:req.body.title2,
        amount:req.body.amount2,
        interval:req.body.interval2,
        notes:req.body.notes2,
        date:req.body.date2
    }).remove().exec();

    res.render('admincp.hbs')
})

app.post('/updateGoalsSubmit', (req,res)=>{

    var goalsOriginal = new Goals({
        title:req.body.title2,
        amount:req.body.amount2,
        priority:req.body.priority2,
        notes:req.body.notes2,
        date:req.body.date2
    })

    var goalsNew = new Goals({
        title:req.body.title,
        amount:req.body.amount,
        priority:req.body.priority,
        notes:req.body.notes,
        date:req.body.date
    })

    goalsNew.save();

    Goals.findOne({
        title:req.body.title2,
        amount:req.body.amount2,
        interval:req.body.interval2,
        notes:req.body.notes2,
        date:req.body.date2
    }).remove().exec();

    res.render('admincp.hbs')
})

app.get('/deleteIncome', (req,res)=>{
    var incomeThing = new Income({
        title:req.query.title,
        amount:req.query.amount,
        interval:req.query.interval,
        notes:req.query.notes,
        date:req.query.date
    })

    Income.findOne({
        title:req.query.title,
        amount:req.query.amount,
        interval:req.query.interval,
        notes:req.query.notes,
        date:req.query.date
    }).remove().exec();

    res.render('admincp.hbs',{
        incomeThing
    })
})

app.get('/deleteExpenses', (req,res)=>{
    var expensesThing = new Expenses({
        title:req.query.title,
        amount:req.query.amount,
        interval:req.query.interval,
        notes:req.query.notes,
        date:req.query.date
    })

    Expenses.findOne({
        title:req.query.title,
        amount:req.query.amount,
        interval:req.query.interval,
        notes:req.query.notes,
        date:req.query.date
    }).remove().exec();

    res.render('admincp.hbs',{
        expensesThing
    })
})

app.get('/deleteGoals', (req,res)=>{
    var goalsThing = new Goals({
        title:req.query.title,
        amount:req.query.amount,
        //priority:req.query.priority,
        notes:req.query.notes,
        date:req.query.date
    })

    Goals.findOne({
        title:req.query.title,
        amount:req.query.amount,
        //priority:req.query.priority,
        notes:req.query.notes,
        date:req.query.date
    }).remove().exec();

    res.render('admincp.hbs',{
        goalsThing
    })
})






app.listen("4000", function(){
    console.log("Server up on port 4000.");
})