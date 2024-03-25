import React from 'react'
import Home from './Home'
import BookList from './BookList'
import AuthorList from './AuthorList'
import BookForm from './BookForm'
import AuthorForm from './AuthorForm'
import EditBook from './EditBook'
import ViewBook from './ViewBook'
import ViewAuthor from './ViewAuthor'
import EditAuthor from './EditAuthor'
import { Route } from 'react-router-dom'
import SideBar from './SideBar'

function Portal() {
  return (
    <div className='container'>
    <div className='row'>
      <div className='col-md'>
        <SideBar></SideBar>
      </div>
      <div className='col-md-11 container-fluid'>
        
      <Route path="/" element={<Home />} />
        <Route path="/book-list" element={<BookList />} />
        <Route path="/author-list" element={<AuthorList />} />
        <Route path="/book-form" element={<BookForm />} />
        <Route path="/author-form" element={<AuthorForm />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/view-book" element={<ViewBook />} />
        <Route path="/view-author" element={<ViewAuthor />} />
        <Route path="/edit-author/:id" element={<EditAuthor />} />
        </div>
        </div>
        </div>
  )
}

export default Portal