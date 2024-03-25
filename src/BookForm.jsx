


import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookList } from './reducer/BookSlice';
import { Link, useNavigate } from 'react-router-dom';
import AuthorForm from './AuthorForm';
import Footer from './Footer';
import Swal from 'sweetalert2';




function BookForm() {

  const [checkSubmittion, setCheckSubmittion] = useState(false);



  const dispatch = useDispatch()
  const data = useSelector((state) => state.app)
  const navigate = useNavigate()
  const handleAlert = () => {
    Swal.fire({
      // position: "top-end",
      icon: "success",
      title: "Your book has been created and saved successfully!",
      showConfirmButton: false,
      timer: 2000
    });
  }

  //for formik validation we use useformik to control the whole form

  const formik = useFormik({
    initialValues: {
      // here we get the form values by same name and intially empty
      bookTitle: "",
      authorName: "",
      bookNumber: "",
      publishDate: "",
      bookImg: ''
    },
    validate: (values) => {

      //validation take place here for every input box based on the conditions it will through error
      // if error occur it will update on object and submit button not work 
      //no error error then only form procced to submit
      let errors = {}

      if (!values.bookTitle) {
        errors.bookTitle = "Please Enter Book bookTitle"
      } else if (values.bookTitle.length > 15) {
        errors.bookTitle = "Book bookTitle should be within 15 characters"
      }
      if (!values.authorName) {
        errors.authorName = "Please Enter Author Name"
      }

      if (!values.publishDate) {
        errors.publishDate = "Required *"
      }
      if (!values.bookNumber) {
        errors.bookNumber = "Required *"
      }
      if (!values.bookImg) {
        errors.bookImg = "Required *"
      }

      return errors;
    },
    onSubmit: async (values) => {
      //on submit it will proceess the data and create a object in api
      try {
        const bookData = await axios.post(`https://library-backend-1-2hr6.onrender.com/books/createBooks`, values,
          {
            headers: {
            
              'Authorization':  localStorage.getItem("token")
          }
        }
        )
        dispatch(addBookList(bookData.data))
        setCheckSubmittion(true);
        formik.handleReset();
        handleAlert();
        navigate("/home")

      } catch (error) {
        alert("Something went wrong !")
        console.log("error", error);
      }

    }
  })

  return (
    <>
      <div className='container'>
        <div className='row mt-4'>
          <div className='col-lg text-center  '>
            <h1 className='text-center heading'>Book Details</h1>
            <p className='text-muted'>Fill the form to get added your book in our library</p>
          </div>
        </div>
        <hr></hr>
        <div className='row mt-4'>
          <div className='col-lg d-flex justify-content-end'>
            <Link to="/author-form"><button className='btn btn-primary'>Add Author Records</button></Link>
          </div>
        </div>
        <div className='row align-items-center justify-content-center'>
          <div className='col-lg-8  '>

            {/* formik package defaultly gave us the handleSubmit and handleChange,handleBlur functions we use then to handle the form easyly */}

            <form onSubmit={formik.handleSubmit} >
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label' >Book bookTitle : </label>

                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                  <input className='form-control mt-3'
                    type='text'
                    name="bookTitle"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='To Kill a Mockingbird'>

                  </input>
                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                  {(formik.getFieldMeta("bookTitle").touched && formik.errors.bookTitle)
                    ? <span style={{ color: "red" }}>{formik.errors.bookTitle}</span> : null}

                </div>

              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label'>Author Name : </label>
                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                  <input className='form-control mt-3'
                    type='text'
                    name="authorName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Harper Lee'>

                  </input>

                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                  {(formik.getFieldMeta("authorName").touched && formik.errors.authorName)
                    ? <span style={{ color: "red" }}>{formik.errors.authorName}</span> : null}


                </div>

              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label'>ISBN Number : </label>
                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                  <input className='form-control mt-3'
                    type='text'
                    name="bookNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='978-3-16-148410-0'>

                  </input>
                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                  {(formik.getFieldMeta("bookNumber").touched && formik.errors.bookNumber)
                    ? <span style={{ color: "red" }}>{formik.errors.bookNumber}</span> : null}
                </div>

              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label'>Book Url : </label>
                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                  <input className='form-control mt-3'
                    type='url'
                    name="bookImg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='www.imgurl'>

                  </input>
                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                  {(formik.getFieldMeta("bookImg").touched && formik.errors.bookImg)
                    ? <span style={{ color: "red" }}>{formik.errors.bookImg}</span> : null}
                </div>

              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label' >Published Date : </label>
                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                  <input className='form-control mt-3'
                    type='date'
                    name="publishDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} >

                  </input>
                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                  {(formik.getFieldMeta("publishDate").touched && formik.errors.publishDate)
                    ? <span style={{ color: "red" }}>{formik.errors.publishDate}</span> : null}

                </div>

              </div>
              <button className='btn btn-primary mt-4 mb-5' type="submit" >Submit</button>

            </form>

          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default BookForm;
