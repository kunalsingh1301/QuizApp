import Question from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

export async function getQuestions(req,res){
    try {
        const q = await Question.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

export async function insertQuestions(req, res){
         Question.insertMany({ questions, answers })
         .then(function(err, data){
            res.json({ msg: "Data Saved Successfully...!"})
            console.log({questions,answers})
        })
        .catch(function (error) {
        res.json({ error })
    })
}


export async function dropQuestions(req, res){
        Question.deleteMany()
        .then(function (){
            res.json({ msg: "Questions Deleted Successfully...!"});
        })
        .catch(function (error){
            res.json({ error })
        })
}

export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

//results
export async function storeResult(req, res){
    const { username, result, attempts, points, achived } = req.body;
        if(!username && !result) throw new Error('Data Not Provided...!');
        await Results.create({ username, result, attempts, points, achived })
        .then(function (err,data){
            res.json({ msg : "Result Saved Successfully...!"})
        })
        .catch(function (error){
            res.json({error})
        })
}

export async function dropResult(req, res){
        Results.deleteMany()
        .then(function (){
            res.json({ msg : "Result Deleted Successfully...!"})
        })
        .catch((error)=>{
            res.json({ error })
        })
}