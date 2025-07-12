import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
const SingleBook = () => {
  const {id} = useParams()
  const [book,setBook]=useState({})
  const fetchBook = async ()=> {
    const response = await axios.get(`http://localhost:3000/book/${id}`)
    if(response.status == 200){
      setBook(response.data.data)
    }
  }
  useEffect(()=>{
    fetchBook()
  },[])
  const navigate = useNavigate()
const deleteBook =async()=>{
  const response = await axios.delete("http://localhost:3000/book/"+id)
  if(response.status==200){
    navigate('/')
  }else
  {
    alert("something want wrong")
  }
}
  return (
    <>
    <Navbar />
  <img class="w-full" src="https://static.vecteezy.com/system/resources/thumbnails/044/280/984/small/stack-of-books-on-a-brown-background-concept-for-world-book-day-photo.jpg" alt="Sunset in the mountains" />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{book.bookName}</div>
    <p class="text-gray-700 text-base">
      Rs.{book.bookPrice}
    </p>
    <p class="text-gray-700 text-base">
      Author Name : {book.authorName}
    </p>
    <p class="text-gray-700 text-base">
     Book ISBN num : {book.isbnNumber}
    </p>
    <p class="text-gray-700 text-base">
     PublishedAt : {book.publishedAt}
    </p>
    <p class="text-gray-700 text-base">
     Publlication : {book.publication}
    </p>
    <button onClick={deleteBook} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-2"> <Link to={`/editBook/${book._id}`}>Edit Book</Link></button>
  </div>
    </>
  )
}

export default SingleBook
