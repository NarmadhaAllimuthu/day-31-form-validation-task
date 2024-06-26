import React from 'react'
import { useDispatch } from 'react-redux'
import { setBooks } from './reducer/BookSlice'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deleteBookFromList, viewBookList } from './reducer/BookSlice';
import Footer from './Footer'


function BookList() {
  const dispatch = useDispatch()

  const data = useSelector((state) => state.app)

  //getting data from api to diaplay on table here get - read method is used

  const getData = async () => {
    try {
      const apiData = await axios.get("https://library-backend-1-2hr6.onrender.com/books/getAllBooks",{
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      dispatch(setBooks(apiData.data))
    } catch (error) {
      console.log(error)

    }
  }


  useEffect(() => {
    if (data.books.length === 0) {
      getData()
    }

  }, [])

  //dispatch the action here for handle delete button

  const handleDeleteUser = ((userId) => {
    dispatch(deleteBookFromList(userId))
  })

  //dispatch the action here for handle view button
  const handleViewUser = ((userId) => {
    dispatch(viewBookList(userId))
  })
  return (
    <>

      <div className='container '>
        <div className='row'>
          <div className='col-lg d-flex justify-content-start'>
            <h3 className='text mt-4'>Datas of Book</h3>
          </div>

        </div>
        <div className='row'>
          <div className='col  '>
            <table className="table table-striped mt-2 mb-5 p-3">
              <thead>
                <tr >
                  {/* <th scope="col">No.</th> */}
                  <th scope="col">Book Name</th>
                  <th scope="col">Author Name</th>
                  <th scope="col"> ISBN number</th>
                  {/* <th scope='col'>Image</th> */}

                  <th scope="col">Published Date </th>
                  <th scope='col'>Action</th>

                </tr>

              </thead>
              <tbody>
                {data.books.map((item) => {
                  return <tr key={item._id} >

                    {/* <td>
                      {item.id}
                    </td> */}
                    <td>
                      {item.bookTitle}
                    </td>
                    <td>
                      {item.authorName}
                    </td>

                    <td>
                      {item.bookNumber}
                    </td>
                    {/* <td>
                      <img src={item.bookImg} className='img table-img' />
                    </td> */}
                    <td>
                      {item.publishDate}
                    </td>

                    <td>
                      <Link to="/view-book" onClick={() => { handleViewUser(item._id) }}>
                        <button className='btn btn-info mt-4'>View</button></Link>
                    </td>
                    <td>
                      <Link to={`/edit-book/${item._id}`}>
                        <button className='btn btn-warning mt-4'>Edit</button></Link>
                    </td>
                    <td>
                      <button className='btn btn-danger mt-4' 
                      onClick={() => { handleDeleteUser(item._id) }}>Delete</button>
                    </td>

                  </tr>
                })}
              </tbody>


            </table>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default BookList