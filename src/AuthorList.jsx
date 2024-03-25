import React from 'react'
import { useDispatch } from 'react-redux'
import Footer from './Footer'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { deleteAuthorFromList, viewAuthorList } from './reducer/BookSlice';
import { setAuthors } from './reducer/BookSlice'

function AuthorList() {


  const dispatch = useDispatch()

  const data = useSelector((state) => state.app)

  //getting data from api to diaplay on table here get - read method is used

  const getData = async () => {
    try {
      const apiData = await axios.get("http://localhost:4001/authors/getAllAuthor",{
        headers:{
          "Authorization":localStorage.getItem("token")
        }
      })
      console.log(apiData.data)
      dispatch(setAuthors(apiData.data))
    } catch (error) {
      console.log(error)

    }
  }


  useEffect(() => {
    if (!data.author || data.author.length === 0) {
      getData()
    }

  }, [])

  //dispatch the action here for handle delete button

  const handleDeleteUser = ((userId) => {
    dispatch(deleteAuthorFromList(userId))
  })

  //dispatch the action here for handle view button
  const handleViewUser = ((userId) => {
    dispatch(viewAuthorList(userId))
  })

  return (
    <>

      <div className='container '>
        <div className='row'>
          <div className='col-lg d-flex justify-content-start'>
            <h3 className='text mt-4'>Datas of Authors</h3>
          </div>

        </div>
        <div className='row'>
          <div className='col  '>
            <table className="table table-striped mt-2 mb-5 p-3">
              <thead>
                <tr >
                  {/* <th scope="col">No.</th> */}

                  <th scope="col">Author Name </th>
                  <th scope="col"> Date Of Birth </th>



                  <th scope='col'>Description</th>

                </tr>

              </thead>
              <tbody>
                {data.author.map((item) => {
                  return <tr key={item._id} >

                    {/* <td>
                      {item.authorid}
                    </td> */}

                    <td>
                      {item.authorName}
                    </td>

                    <td>
                      {item.dob}
                    </td>

                    <td>
                      {item.description}
                    </td>

                    <td>
                      <Link to="/view-author" onClick={() => { handleViewUser(item._id) }}><button className='btn btn-info mt-4'>View</button></Link>
                    </td>
                    <td>
                      <Link to={`/edit-author/${item._id}`}><button className='btn btn-warning mt-4'>Edit</button></Link>
                    </td>
                    <td>
                      <button className='btn btn-danger mt-4' onClick={() => { handleDeleteUser(item._id) }}>Delete</button>
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

export default AuthorList