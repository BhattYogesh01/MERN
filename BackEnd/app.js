const express = require('express')
const app = express()
const fs = require('fs')

const connectToDatabase = require('./database')
const Book = require('./model/bookModel')

// alternative
// const app = require('express')()

// const ConnectString = "mongodb+srv://yogesh:<password>@cluster0.2ptxy1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const cors = require('cors')

app.use(cors({
    origin: '*'// * allows all the requests
}))
app.use(express.json())
const {multer, storage} = require('./middleware/multerConfig')

const upload = multer({storage:storage})
connectToDatabase()

app.get("/",(req,res)=>{
    
    res.status(200).json({
        message : "Success"
    })
})
app.use(express.static("./upload"))

app.post("/book",upload.single('image'),async(req,res)=>{
    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body
    let fileName;
    if(!req.file){
        fileName = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fbook-single-object&psig=AOvVaw2kpnQeyWwNDV2iHWX8gae7&ust=1750926024639000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPCdqe-RjI4DFQAAAAAdAAAAABAE"
    }else{
        fileName = "http://localhost:3000/"+req.file.filename
    }
await Book.create({
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
    imageUrl: fileName
   })
    res.status(201).json({
        message : "Book Created Successfully"
    })
})


app.get('/book',async(req,res)=>{
    const books = await  Book.find()// returns array
    console.log(books)
    res.status(200).json({
    message : "Books fetched successfully",
    data : books
    })
})
//single read
app.get('/book/:id',async(req,res)=>{
    try {
        const id = req.params.id
    const book = await Book.findById(id)
    if(!book){
        res.status(404).json({
            message : "Nothing found"
        })
    }
    else{
        res.status(200).json({
        message : "single Book fetched successfully",
        data : book
        })
    }
    } catch (error) {
        res.status(500).json({
            message : "Something went wrong"
        })
    }
})
            
//delete operation
app.delete("/book/:id",async(req,res)=>{
    const id = req.params.id
    await Book.findByIdAndDelete(id)
    res.status(200).json({
        message : "Book Deleted Successflly"
    })
})

//Update operation
app.patch("/book/:id",upload.single('image'),async(req,res)=>{
    const id = req.params.id
    const{bookName,bookPrice,isbnNumber,authorName,publishedAt,publication} = req.body
    const oldDatas = await Book.findById(id)
    if(req.file){
        const oldImagePath = oldDatas.imageUrl
        const localHostUrlLength = "http://localhost:3000/".length
        const newOldImagePath = oldImagePath.slice(localHostUrlLength)
        fs.unlink('storage/'+ newOldImagePath,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log('file deleted successfully');
                
            }
        })
        req.file = "http://localhost:3000/"+req.file.filename
    }
    await Book.findByIdAndUpdate(id,{
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publication,
        imageUrl : req.file.filename
    })
    res.status(200).json({
        message: "Book updated successfully"
    })
})

app.listen(3000,()=>{
    console.log("node.js server has started at port 3000")
})

