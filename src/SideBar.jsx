import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function SideBar() {

  const location = useLocation();
  let [userAccessData, setUserAccessData] = useState(null);

  useEffect(() => {
    const getUserAccessData = localStorage.getItem('user');
    if (getUserAccessData) {
      setUserAccessData(JSON.parse(getUserAccessData));
    }
  }, []);


  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };


  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const renderSidebarLinks = () => {
    if (userAccessData === null) {
      return <div>Loading.....</div>
    }
    console.log(userAccessData.role);
    if (userAccessData) {
      if (userAccessData.role === "admin" || userAccessData.role ==="Admin") {

        return (
          <>

            {/* Admin specific links */}
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class={`nav-item ${isActive('/home') ? 'active' : ''}`}>
                  <Link class="nav-link" to="/home">Home</Link>
                </li>
                <li class={`nav-item ${isActive('/book-form') ? 'active' : ''}`}>
                  <Link class="nav-link" to="/book-form">Add Book</Link>
                </li>
                <li className={`nav-item ${isActive('/author-form') ? 'active' : ''}`}>
                  <Link className="nav-link" to="/author-form">
                    Add Author
                  </Link>
                </li>


                <li className={`nav-item ${isActive('/book-list') ? 'active' : ''}`}>
                  <Link className="nav-link" to="/book-list">
                    Book List
                  </Link>
                </li>


                <li className={`nav-item ${isActive('/author-list') ? 'active' : ''}`}>
                  <Link className="nav-link" to="/author-list">
                    Author List
                  </Link>
                </li>

                <li className={`nav-item ${isActive('/createReader') ? 'active' : ''}`}>
                  <Link className="nav-link" to="/createReader">
                    Create New Reader
                  </Link>
                </li>
              </ul>
            </div>

          </>
        );
      } else if (userAccessData.role === "User" || userAccessData.role ==="user") {
        return (
          <>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li className={`nav-item ${isActive('/book-list') ? 'active' : ''}`}>
                  <Link className="nav-link" to="/book-list">
                    Book List
                  </Link>
                </li>


                <li className={`nav-item ${isActive('/author-list') ? 'active' : ''}`}>
                  <Link className="nav-link" to="/author-list">
                    Author List
                  </Link>
                </li>

                <li className={`nav-item ${isActive('/createReader') ? 'active' : ''}`}>
                  <Link className="nav-link" to="/createReader">
                    Create New Reader
                  </Link>
                </li>
              </ul>
            </div>
          </>
        );
      }
    }
    // Default return if no user access data or role doesn't match
    return (
      <>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item nav-link mx-2 mt-3">
              <i className="bi bi-house-door-fill "></i>
              <span>  Home</span>
            </li>
          </ul>
        </div>
        {/* Add default links for users without specific roles here */}
      </>
    );
  };



  return (

    <nav class="navbar bg-primary border-bottom border-body d-flex justify-content-between align-items-center" data-bs-theme="dark">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container d-flex align-items-center">

          <Link class="navbar-brand" href="#">Navbar</Link>
          <div className="user-info d-flex align-items-center">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>


     {renderSidebarLinks()}
     {/* {userData && (
          <div className="h4 ml-auto btn-group user-Data" style={{ position: 'relative' }}>
            <span onClick={toggleDropdown} className='user-detail dropdown-toggle'>
              {userData.userFirstName + userData.userLastName}
              
            </span>
           
            <img
              src={userData.photo}
              alt="User"
              className="user-avatar"
              style={{ width: '40px', cursor: 'pointer' }}
              onClick={toggleDropdown}
            />
 <h6>Role :{userData.role}</h6>
            {isDropdownOpen && (
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <li className='dropdown-item'>
                  <Link to={`/addProfileInfo/${userData?._id}`} className='dropdown-item btn-additional-Info'>Additional Info</Link>
                </li>
                <li className='dropdown-item text-center'>
                  <button className="btn btn-logOut dropdown-item" type="button" onClick={handleLogOut}>
                    LogOut
                  </button>
                </li>
              </ul>
            )}
          </div>
        )} */}
         {userData && (
            <div className="d-flex align-items-center ms-5 me-4">
              <div>
              <span className="mr-3 user-info">{userData.userFirstName + ' ' + userData.userLastName}</span>
              <h6>Role : {userData.role}</h6>
              </div>
              <img
                src={userData.photo}
                alt="User"
                className="user-avatar ms-2"
                style={{ width: '40px', cursor: 'pointer' }}
                onClick={toggleDropdown}
              />
              <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <button className="dropdown-item bg-info" type="button" onClick={handleLogOut}>
                  Log Out
                </button>
              </div>
            </div>
          )}
</div>
        </div>
      </nav>
    </nav>

  )
}

export default SideBar







