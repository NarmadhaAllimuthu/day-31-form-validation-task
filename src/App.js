

import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import SideBar from './SideBar';
import Home from './Home';
import BookList from './BookList';
import AuthorList from './AuthorList';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';
import EditBook from './EditBook';
import ViewBook from './ViewBook';
import ViewAuthor from './ViewAuthor';
import EditAuthor from './EditAuthor';
import Register from './Register';
import Login from './Login';
import Portal from './Portal';
import CreateReader from './CreateReader';

function SidebarRenderer() {
  const location = useLocation();
  const showSideBar = !['/', '/login'].includes(location.pathname);

  return showSideBar ? <SideBar /> : null;
}

function App() {

  


  return (
    <BrowserRouter>
      
      <SidebarRenderer/>
      <Routes>
       
        <Route path="/" element={<Register />} ></Route>
        <Route path="/login" element={<Login/>} />
       
              
                <Route path="/home" element={<Home />} />
                <Route path="/book-list" element={<BookList />} />
                <Route path="/author-list" element={<AuthorList />} />
                <Route path="/book-form" element={<BookForm />} />
                <Route path="/author-form" element={<AuthorForm />} />
                <Route path="/edit-book/:id" element={<EditBook />} />
                <Route path="/view-book" element={<ViewBook />} />
                <Route path="/view-author" element={<ViewAuthor />} />
                <Route path="/edit-author/:id" element={<EditAuthor />} />
                <Route path="/createReader" element={<CreateReader/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;








