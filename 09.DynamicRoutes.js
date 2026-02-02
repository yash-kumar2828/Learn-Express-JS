import express from 'express';
const app=express();

app.get('/',(req,res)=>{
    const users=['yash','kumar'];
    let data=``;
    for(let i=0;i<users.length;i++){
        data+=`<li><a href="user/${users[i]}">${users[i]}<a/></li>`
        console.log(users[i]);    
    }
    res.send(data);
});

app.get('/user/:name',(req,res)=>{
    console.log(req.params.name);
    const userName=req.params.name;
    res.send(`This is ${userName} profile page`)
})

app.listen(3000);