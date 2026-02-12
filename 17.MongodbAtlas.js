import { MongoClient } from "mongodb";

const url="mongodb+srv://yk5708428_db_user:yashkumar@cluster0.l3jayu5.mongodb.net/?appName=Cluster0";

const database="school";
const collection="students"
const client=new MongoClient(url);
client.connect().then(()=>{
    console.log('connected');
});

async function dbConnection(){
    const db=client.db(database);
    const collectResult=db.collection(collection);
    const result=await collectResult.find().toArray();
    console.log(result);   
}

dbConnection();