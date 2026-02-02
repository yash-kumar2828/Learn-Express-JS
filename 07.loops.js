import express from 'express';
const app=express();

app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.get('/add-user',(req,res)=>{
    res.render('addUser');
});
app.post('/submit-user',(req,res)=>{
    res.render('submitUser',req.body);
});

app.get('/users',(req,res)=>{
    const users=['yash','kumar','Yash Kumar'];
    res.render('users',{users:users,isLogin:true});
})

app.listen(3000);