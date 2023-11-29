import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
  return (

    <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" href="#">Navbar</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              <li class="nav-item mx-4">
                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li class="nav-item mx-4">
                <Link class="nav-link" to="/book-form">Add Book</Link>
              </li>
              <li class="nav-item mx-4">
                <Link class="nav-link" to="/book-list">Book List</Link>
              </li>
              <li class="nav-item mx-4">
                <Link class="nav-link" to="/author-list">AuthorList</Link>
              </li>


            </ul>

          </div>
        </div>
      </nav>
    </nav>

  )
}

export default SideBar