import express from 'express';
import path from 'path';
const app=express();
const absPath=path.resolve('view');
const publicPath=path.resolve('public');    

app.use(express.static(publicPath));
app.get('/',(req,res)=>{
    res.sendFile(absPath+"/home.html");
});

app.get('/login',(req,res)=>{
    res.sendFile(absPath+"/login.html");
});
app.get('/about',(req,res)=>{
    res.sendFile(absPath+"/about.html");
});

app.use((req,res)=>{
    res.sendFile(absPath+"/404.html");
});

app.listen(3000);




