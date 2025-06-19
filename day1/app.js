const express = require('express')
const app = express()
// alternative
// const app = require('express')()

app.get("/",(req,res)=>{
    console.log(req)
    res.send("hello world")
})






app.listen(3000,()=>{
    console.log("node.js server has started at port 3000")
})

