const mongoose = require('mongoose')
const ConnectString = "mongodb+srv://yogesh:yogesh@cluster0.2ptxy1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
async function connectToDatabase(){
   await mongoose.connect(ConnectString)
   console.log("connected to DB Successfully")
}

module.exports = connectToDatabase