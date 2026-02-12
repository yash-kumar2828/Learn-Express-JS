import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const dbName="school";
const url="mongodb://localhost:27017";
const clients=new MongoClient(url); 

const app =express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.set('view engine','ejs');
clients.connect().then((connection)=>{
    const db=connection.db(dbName);
    app.get('/api',async(req,res)=>{
        const collections=db.collection('students');
        const students=await collections.find().toArray();
        res.send(students);
    });
    app.get('/ui',async(req,res)=>{
        const collections=db.collection('students');
        const students=await collections.find().toArray();
        res.render('students',{students});
    })
    app.get('/add',(req,res)=>{
        res.render('form');
    });
    app.post('/add-student',async(req,res)=>{
        const collections=db.collection('students');
        const result=await collections.insertOne(req.body);
        console.log(result);
        res.send('save');
    });

    app.post("/add-student-api",async(req,res)=>{
        console.log(req.body);
        const {name,age,email}=req.body;
        if(!name||!age||!email){
            res.send({message:'operation failed',success:false})
            return false;
        }
        const collection =db.collection("students");
        const result=await collection.insertOne(req.body);
        
        res.send({message:"data stored",success:true,result:result});
    });

    app.delete("/delete/:id",async(req,res)=>{
        console.log(req.params.id);
        const collection=db.collection("students");
        const result =await collection.deleteOne({_id: new ObjectId(req.params.id)})
        if(result){
            res.send({
                message:"student data deleted",
                success:true
            })
        }
        else{
            res.send({
                message:"student data not deleted",
                success:false
            })
        }
    })

    app.get("/ui/delete/:id",async(req,res)=>{
        console.log(req.params.id);
        const collection=db.collection("students");
        const result =await collection.deleteOne({_id: new ObjectId(req.params.id)})
        if(result){
            res.send('<h1>Deleted</h1>')
        }
        else{
            res.send('<h1>not Deleted</h1>')
        }
    });
    
    app.get('/ui/student/:id',async(req,res)=>{
        const id=req.params.id;
        console.log(id);
        const collection=db.collection("students");
        const result =await collection.findOne({_id: new ObjectId(req.params.id)}) 
        res.render('updateStudent',{result});
    })

     app.get('/student/:id',async(req,res)=>{
        const id=req.params.id;
        console.log(id);
        const collection=db.collection("students");
        const result =await collection.findOne({_id: new ObjectId(req.params.id)})
        
        res.send({
            message:'data fetched',
            success:true,
            result:result
        })
    })
});

app.listen(3000);