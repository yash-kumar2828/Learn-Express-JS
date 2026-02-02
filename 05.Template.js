import express from 'express';
const app=express();


app.set('view engine','ejs');
app.get("/",(req,res)=>{
    res.render('home',{name:'Yash Kumar',age:21});
});
app.listen(3000);