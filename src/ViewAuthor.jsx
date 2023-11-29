import React from 'react'
import { useSelector } from 'react-redux'

function ViewAuthor() {

    const selectedUser = useSelector((state) => state.app.selectedUser)

  return (
    <div className='container-fluid view-container'>
    <div className='col-lg-4 view-cart'>
      

      <h5 className='heading-content'>Author Name :
        <span className='span-email-content ml-4'> {selectedUser.authorname}</span>
      </h5>

     
     

      <h5 className='heading-content'>Date of Birth :
        <span className='span-content'> {selectedUser.dob}</span>
      </h5>

      <h5 className='heading-content'>Description :
        <span className='span-content'> {selectedUser.description}</span>
      </h5>

    </div>
  </div>
  )
}

export default ViewAuthor