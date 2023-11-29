import React from 'react'
import { useSelector } from 'react-redux'

function ViewBook() {
    const selectedUser = useSelector((state) => state.app.selectedUser)

  return (
    <div className='container-fluid view-container'>
    <div className='col-lg-4 view-cart'>
      <h3 className='heading'>Book Name :
        <span className='span-content ml-2'>{selectedUser.title}</span>
      </h3>

      <h5 className='heading-content'>Author Name :
        <span className='span-email-content ml-4'> {selectedUser.authorname}</span>
      </h5>

     
      <h5 className='heading-content'>ISBN Number :
        <span className='span-content'>{selectedUser.booknumber}</span>
      </h5>

      <h5 className='heading-content'>Published Date :
        <span className='span-content'> {selectedUser.publishdate}</span>
      </h5>

      <h5 className='heading-content'>Book Img :
        <span className='span-content'> {selectedUser.bookimg}</span>
      </h5>

    </div>
  </div>
  )
}

export default ViewBook