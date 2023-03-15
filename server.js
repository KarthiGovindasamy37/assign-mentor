const express=require("express")
const app=express()
const mongodb=require("mongodb")
const mongoclient=mongodb.MongoClient
const dotenv=require("dotenv").config()
const cors=require("cors")

let URL=process.env.URL
let DB=process.env.DB

app.use(express.json())

app.use(cors())

app.get("/students",async(req,res)=>{
    try {
        
        let connection=await mongoclient.connect(URL);
        
        let db=connection.db(DB);
        
        let students=await db.collection("students").find().toArray();
        
        res.json(students)
    await connection.close();
    } catch (error) {
        res.status(500).json({message:"Something went wrong,please try again"})
    }
})


app.post("/createstudent",async(req,res)=>{
    try {
       
        let connection=await mongoclient.connect(URL);

        let db=connection.db(DB);

        await db.collection("students").insertOne(req.body);

        res.json({message:"Student created"});

        await connection.close();
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})

app.get("/student/:id",async(req,res)=>{
    try {
        let connection=await mongoclient.connect(URL)

        let db=connection.db(DB)

        let student=await db.collection("students").findOne({_id:mongodb.ObjectId(req.params.id)})

        res.json(student)

        await connection.close()
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})

app.put("/student/:id",async(req,res)=>{
    try {
        let connection=await mongoclient.connect(URL)

        let db=connection.db(DB)

        await db.collection("students").findOneAndUpdate({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})

        res.json({message:"Student updated successfully"})

        await connection.close()
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})

app.delete("/student/:id",async(req,res)=>{
    try {
        let connection=await mongoclient.connect(URL)

        let db=connection.db(DB)

        await db.collection("students").findOneAndDelete({_id:mongodb.ObjectId(req.params.id)})

        res.json({message:"Student deleted successfully"})

        await connection.close()
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})

app.get("/teachers",async(req,res)=>{
    try {
        
        let connection=await mongoclient.connect(URL);
        
        let db=connection.db(DB);
        
        let teachers=await db.collection("teachers").find().toArray();
        
        res.json(teachers) 

        await connection.close();
    } catch (error) {
        res.status(500).json({message:"Something went wrong,please try again"})
    }
})

app.post("/createteacher",async(req,res)=>{
    try {
       
        let connection=await mongoclient.connect(URL);

        let db=connection.db(DB);

        await db.collection("teachers").insertOne(req.body);

        res.json({message:"Teacher created"});

        await connection.close();
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})

app.get("/teacher/:id",async(req,res)=>{
    try {
        let connection=await mongoclient.connect(URL)

        let db=connection.db(DB)

        let teacher=await db.collection("teachers").findOne({_id:mongodb.ObjectId(req.params.id)})
        
        let students=await db.collection("students").find({teacher:teacher.teacher_id}).toArray()

        res.json({teacher,students})

        await connection.close()
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})

app.get("/editteacher/:id",async(req,res)=>{
    try {
        let connection=await mongoclient.connect(URL)

        let db=connection.db(DB)

        let teacher=await db.collection("teachers").findOne({_id:mongodb.ObjectId(req.params.id)})
        
        res.json(teacher)

        await connection.close()
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})

app.put("/teacher/:id",async(req,res)=>{
    try {
        let connection=await mongoclient.connect(URL)

        let db=connection.db(DB)

        await db.collection("teachers").findOneAndUpdate({_id:mongodb.ObjectId(req.params.id)},{$set:req.body})
        
        res.json({message:"Teacher details updated"})

        await connection.close()
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})

app.delete("/teacher/:id",async(req,res)=>{
    try {
        let connection=await mongoclient.connect(URL)

        let db=connection.db(DB)

        await db.collection("teachers").findOneAndDelete({_id:mongodb.ObjectId(req.params.id)})
        
        res.json({message:"Teacher details deleted"})

        await connection.close()
    } catch (error) {
        res.status(500).json({message:"Somethig went wrong,try again"})
    }
})


app.listen(process.env.PORT || 3001)