import express from 'express';

const app=express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/profile',(req,res)=>{
    res.setHeader('Set-Cookie',"login=true");
    res.setHeader('Set-Cookie',"name="+req.body.name);
    res.render('profile');
});
app.get('/',(req,res)=>{
    let cookiesdata=req.get('cookie');

    cookiesdata=cookiesdata.split("; ");
    cookiesdata=cookiesdata[1].split("=");
    console.log(cookiesdata[1]);
    
    res.render('home2',{name:cookiesdata[1]});
});


app.listen(3000);