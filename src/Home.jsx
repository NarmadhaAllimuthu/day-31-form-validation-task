import React from 'react'
import Footer from './Footer'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
     
      <div className='container-fluid home-container'>
        <div className='row text-center '>
          <h1 className='heading mt-5 mb-3'>Our Library System</h1>
          <p className='text-muted'>keep your book save and updated with us!!!</p>
        </div>
        <hr />
        <div className='row mt-4 mb-5  align-items-center justify-content-center'>
          <div className='col-md-4 '>
            <div class="card text-center ms-5 " style={{ width: "18rem" }}>
              <div class="card-body card-item ">
                <Link to="/book-form" ><h5 class="card-title mb-3">Add Books</h5></Link>
                <h6 class="card-subtitle mb-2 text-body-secondary mb-4 f-4">become a member by adding book</h6>
                <p class="card-text mb-5"> Share books with adding here and simple to add books by filling forms and updating here </p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class="card text-center" style={{ width: "18rem" }}>
              <div class="card-body">
                <Link to="/author-form" ><h5 class="card-title mb-3">Add Author</h5></Link>
                <h6 class="card-subtitle mb-2 text-body-secondary mb-4">become a member by adding author</h6>
                <p class="card-text mb-4">Share author details with adding here and simple to add author by filling forms and updating here</p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div class="card text-center" style={{ width: "18rem" }}>
              <div class="card-body">
                <Link to="/book-list" ><h5 class="card-title mb-3">See Book Lists</h5></Link>
                <h6 class="card-subtitle mb-2 text-body-secondary mb-4">available books are listed here</h6>
                <p class="card-text mb-4">Books that are stored in our Library Management System is listed and you can easyly get the required books by seaching here</p>
              </div>
            </div>
          </div>
          <div className='col-md-4 '>
            <div class="card mt-4 text-center" style={{ width: "18rem" }}>
              <div class="card-body">
                <Link to="/author-list" ><h5 class="card-title mb-3">See Author Lists</h5></Link>
                <h6 class="card-subtitle mb-2 text-body-secondary mb-4">available author are listed here</h6>
                <p class="card-text mb-2">Authors that are stored in our Library Management System is listed and you can easyly get the required author by seaching here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home