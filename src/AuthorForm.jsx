import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAuthorList } from './reducer/BookSlice';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function AuthorForm() {

  //dispatching here for action and payloads

  const dispatch = useDispatch()
  const data = useSelector((state) => state.app)
const navigate = useNavigate()
  //for formik validation we use useformik to control the whole form

  const formik = useFormik({
    initialValues: {

      // here we get the form values by same name and intially empty
      authorName: "",
      dob: "",
      description: ""
    },
    validate: (values) => {

      //validation take place here for every input box based on the conditions it will through error
      // if error occur it will update on object and submit button not work 
      //no error error then only form procced to submit

      let errors = {}


      if (!values.authorName) {
        errors.authorName = "Please Enter Author Name"
      }

      if (!values.dob) {
        errors.dob = "Required *"
      }
      if (!values.description) {
        errors.description = "Required *"
      }

      return errors;
    },
    onSubmit: async (values) => {

      //on submit it will proceess the data and create a object in api

      try {
        const authorData = await axios.post("https://library-backend-1-2hr6.onrender.com//authors/createAuthor", values,{
          headers:{
            "Authorization":localStorage.getItem("token")
          }
        })
        dispatch(addAuthorList(authorData.data))
        formik.handleReset()
        alert("Author Added Successfully" )
        navigate("/")
        console.log(authorData.data)

      } catch (error) {
        alert("Something went wrong !" )
        console.log("error", error);
      }
    }
  })
  return (<>
    <div className='container'>
      <div className='row text-center'>
        <div className='col-lg-12'>
          <h1 className='text-center heading'> Author Details</h1>
          <p className='text-muted'>fill the form to add author informations</p>

        </div>
      </div>
      <hr></hr>
      <div className='row align-items-center justify-content-center'>
        <div className='col-lg-8  '>

          {/* formik package defaultly gave us the handleSubmit and handleChange,handleBlur functions we use then to handle the form easyly */}

          <form onSubmit={formik.handleSubmit} >
            <div className='row'>
              <div className='col-md-8'>
                <label className='label' >Author Name : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                <input className='form-control'
                  type='text'
                  name="authorName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} >

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                {(formik.getFieldMeta("authorName").touched && formik.errors.authorName)
                  ? <span style={{ color: "red" }}>{formik.errors.authorName}</span> : null}

              </div>

            </div>

            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label' >Date Of Birth : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                <input className='form-control mt-3'
                  type='date'
                  name="dob"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>

                </input>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("dob").touched && formik.errors.dob)
                  ? <span style={{ color: "red" }}>{formik.errors.dob}</span> : null}
              </div>

            </div>
            <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label' >Author Description : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                <textarea className='form-control mt-3'
                  type='text'
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='write short notes'>

                </textarea>

                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                {(formik.getFieldMeta("description").touched && formik.errors.description)
                  ? <span style={{ color: "red" }}>{formik.errors.description}</span> : null}

              </div>

            </div>

            <button className='btn btn-primary mb-5 mt-4' type="submit" >Submit</button>
          </form>
        </div>
      </div>
    </div>

    <Footer />


  </>
  )
}

export default AuthorForm