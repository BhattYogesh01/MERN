import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
const {id} = useParams()
const navigate = useNavigate()
  const [data,setData] = useState({
    bookName : '',
    bookPrice : '',
    isbnNumber : null,
    authorName : '',
    publishedAt : '',
    publication : ''
  })
  const [image, setImage] = useState(null)
  const handleChange = (e) =>{
    const {name, value} = e.target
    setData({
      ...data,
      [name] : value
    })

  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    Object.entries(data).forEach(([key,value])=>{
      formData.append(key,value)
    })
    formData.append('image',image)
    const response = await axios.patch('http://localhost:3000/book/'+id ,formData)
    if(response.status==200){
      navigate('/book/'+id)
    }else{
      alert("something want wrong")
    }
  }

  const fetchBook = async()=>{
   const response = await axios.get("http://localhost:3000/book/"+id)
    if(response.status==200){
      setData(response.data.data)
    }
  }
  useEffect(()=>{
    fetchBook()
  },[])
  return (
    <>
    <Navbar />
     <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Add Book</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="bookName" class="block text-sm font-medium text-gray-600" >Book Name</label>
                {/* <input type="text" id="bookName" name="bookName" class="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e)=>setBookName(e.target.value)} /> */}
                <input type="text" id="bookName" name="bookName" class="mt-1 p-2 w-full border rounded-md text-gray-800" value={data.bookName} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="bookPrice" className="block text-sm font-medium text-gray-600" value={data.bookPrice}>Price</label>
                <input type="number" id="bookPrice" name="bookPrice" class="mt-1 p-2 w-full border rounded-md text-gray-800" value={data.bookPrice} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="isbnNumber" className="block text-sm font-medium text-gray-600">ISBN Number</label>
                <input type="number" id="isbnNumber" name="isbnNumber" class="mt-1 p-2 w-full border rounded-md text-gray-800" value={data.isbnNumber} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-600" >Author Name</label>
                <input type="text" id="authorName" name="authorName" class="mt-1 p-2 w-full border rounded-md text-gray-800" value={data.authorName} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-600" >Published Date</label>
                <input type="date" id="publishedAt" name="publishedAt" class="mt-1 p-2 w-full border rounded-md text-gray-800" value={data.publishedAt} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="publication" className="block text-sm font-medium text-gray-600" >Publication</label>
                <input type="text" id="publication" name="publication" class="mt-1 p-2 w-full border rounded-md text-gray-800" value={data.publication} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="bookImage" className="block text-sm font-medium text-gray-600">Book Image</label>
                <input type="file" id="bookImage" name="image" class="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <button type="submit" class="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Edit Book</button>
        </form>
    </div>
    </>
  )
}

export default EditBook
