import express from 'express'
import path from 'path'
import morgan from 'morgan'
const app=express();

function chechRoute(req,res,next){
    console.log("user is accessing : ",req.url);
    next();
}

function ageCheck(req, res, next) {
    const age = Number(req.query.age);
    if (!age || age < 18) {
        res.send('Alert! You can not access this page');
    } else {
        next();
    }
}

//Route Middleware 
function checkAgeRouteMid(req,res,next){
    const age = Number(req.query.age);
    if (!age || age < 18) {
        res.send('Alert! You can not access this page');
    } else {
        next();
    }
}


//Built-in middleware
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));


// app.use((req,res,next)=>{
    //     console.log("user is accessing : ",req.url);
    //     next();
    // });
    

//External middleware
app.use(morgan('dev'))    


app.get("/",(req,res)=>{
    const filePath=path.resolve('view/home.html')
    res.sendFile(filePath);
});
app.get("/user",checkAgeRouteMid,(req,res)=>{
    res.send('User Page');
});
app.get("/login",(req,res)=>{
    res.send(`
        <form action='/submit' method='post'>
            <input type='text' placeholder='enter email' name='email'>
            <input type='password' placeholder='enter password' name='password'>
            <button>Login</button>
        </form>
        `);
});
app.get("/products",checkAgeRouteMid,(req,res)=>{
    res.send('Products Page');
});
app.post("/submit",(req,res)=>{
    console.log('user login details are : ',req.body);
    res.send('submit Page');
});

app.get("/error",(req,res,next)=>{
    const error=new Error('');
    error.status=404;
    next(error);
    res.send('Products Page');
});


//error handling middleware
function errorHandling(error,req,res,next){
    res.status(error.status|| 500).send("try after some time");
}
app.use(errorHandling);



app.listen(3000);