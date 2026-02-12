import express from 'express';
const app=express();
import cors from 'cors';

app.use(cors());

app.get('/',(req,res)=>{
    res.send({
        name:'yash',
        age:21,
        email:'yk@gmail.com'
    })
})

app.listen(3000);