


import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookList } from './reducer/BookSlice';
import { Link } from 'react-router-dom';
import AuthorForm from './AuthorForm';
import Footer from './Footer';






function BookForm() {

  const [checkSubmittion, setCheckSubmittion] = useState(false)

  const dispatch = useDispatch()
  const data = useSelector((state) => state.app)

  //for formik validation we use useformik to control the whole form

  const formik = useFormik({
    initialValues: {
      // here we get the form values by same name and intially empty
      title: "",
      authorname: "",
      booknumber: "",
      publishdate: "",
      bookimg: ''
    },
    validate: (values) => {

      //validation take place here for every input box based on the conditions it will through error
      // if error occur it will update on object and submit button not work 
      //no error error then only form procced to submit
      let errors = {}

      if (!values.title) {
        errors.title = "Please Enter Book Title"
      } else if (values.title.length > 15) {
        errors.title = "Book Title should be within 15 characters"
      }
      if (!values.authorname) {
        errors.authorname = "Please Enter Author Name"
      }

      if (!values.publishdate) {
        errors.publishdate = "Required *"
      }
      if (!values.booknumber) {
        errors.booknumber = "Required *"
      }
      if (!values.bookimg) {
        errors.bookimg = "Required *"
      }

      return errors;
    },
    onSubmit: async (values) => {
      //on submit it will proceess the data and create a object in api
      try {
        const bookData = await axios.post("https://655b68dbab37729791a90eb0.mockapi.io/damyapi/book", values)
        dispatch(addBookList(bookData.data))
        setCheckSubmittion(true);
        formik.handleReset()
        console.log(bookData.data)

      } catch (error) {
        console.log("error");
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
                  <label className='label' >Book Title : </label>

                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                  <input className='form-control mt-3'
                    type='text'
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='To Kill a Mockingbird'>

                  </input>
                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                  {(formik.getFieldMeta("title").touched && formik.errors.title)
                    ? <span style={{ color: "red" }}>{formik.errors.title}</span> : null}

                </div>

              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label'>Author Name : </label>
                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                  <input className='form-control mt-3'
                    type='text'
                    name="authorname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='Harper Lee'>

                  </input>

                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                  {(formik.getFieldMeta("authorname").touched && formik.errors.authorname)
                    ? <span style={{ color: "red" }}>{formik.errors.authorname}</span> : null}


                </div>

              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label'>ISBN Number : </label>
                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                  <input className='form-control mt-3'
                    type='text'
                    name="booknumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='978-3-16-148410-0'>

                  </input>
                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                  {(formik.getFieldMeta("booknumber").touched && formik.errors.booknumber)
                    ? <span style={{ color: "red" }}>{formik.errors.booknumber}</span> : null}
                </div>

              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label'>Book Url : </label>
                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                  <input className='form-control mt-3'
                    type='url'
                    name="bookimg"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder='www.imgurl'>

                  </input>
                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                  {(formik.getFieldMeta("bookimg").touched && formik.errors.bookimg)
                    ? <span style={{ color: "red" }}>{formik.errors.bookimg}</span> : null}
                </div>

              </div>
              <div className='row mt-2'>
                <div className='col-md-8'>
                  <label className='label' >Published Date : </label>
                  {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                  <input className='form-control mt-3'
                    type='date'
                    name="publishdate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} >

                  </input>
                  {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                  {(formik.getFieldMeta("publishdate").touched && formik.errors.publishdate)
                    ? <span style={{ color: "red" }}>{formik.errors.publishdate}</span> : null}

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
