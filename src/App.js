



// import React, { useReducer } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
// import SideBar from './SideBar';
// import Home from './Home';
// import BookList from './BookList';
// import AuthorList from './AuthorList';
// import BookForm from './BookForm';
// import AuthorForm from './AuthorForm';
// import EditBook from './EditBook';
// import ViewBook from './ViewBook';


// function App() {


//   return (
//     <BrowserRouter>
//       <SideBar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/book-list" element={<BookList />} />
//         <Route path="/author-list" element={<AuthorList />} />

//         <Route path="/book-form" element={<BookForm  />} />
// <Route path="/author-form" element={<AuthorForm/>}></Route>
// <Route path='/edit-book:id' element={<EditBook/>}></Route>
// <Route path='/view-book' element={<ViewBook/>}></Route>
//       </Routes>




//     </BrowserRouter>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-list" element={<BookList />} />
        <Route path="/author-list" element={<AuthorList />} />
        <Route path="/book-form" element={<BookForm />} />
        <Route path="/author-form" element={<AuthorForm />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/view-book" element={<ViewBook />} />
        <Route path="/view-author" element={<ViewAuthor />} />
        <Route path="/edit-author/:id" element={<EditAuthor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


