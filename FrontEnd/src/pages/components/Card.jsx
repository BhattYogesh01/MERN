import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({book}) =>{
  console.log(book)
  return (
    <>
    <div class="max-w-sm rounded overflow-hidden shadow-lg" key={book._id}>
  <img class="w-full h-80 object-cover rounded shadow-md" src={book.imageUrl ? book.imageUrl :"https://static.vecteezy.com/system/resources/thumbnails/044/280/984/small/stack-of-books-on-a-brown-background-concept-for-world-book-day-photo.jpg"} alt="Sunset in the mountains" />
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{book.bookName}</div>
    <p class="text-gray-700 text-base">
      Rs.{book.bookPrice}
    </p>
    <p class="text-gray-700 text-base">
      Author Name : {book.authorName}
    </p>
    <p class="text-gray-700 text-base">
     Book ISBN num :{book.isbnNumber}
    </p>
    <button><Link to={`/book/${book._id}`}>See More</Link></button>
  </div>
 
</div>
    </>
  )
}

export default Card
