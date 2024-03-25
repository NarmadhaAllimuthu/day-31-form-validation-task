


import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./assets/readerPage.css"

function CreateReader() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {

            // here we get the form values by same name and intially empty
            readerName: "",
            readerContact: "",

            readerAddress: "",

        },
        validate: (values) => {



            let errors = {}


            if (!values.readerName) {
                errors.readerName = "Required *"
            } else if (!/^[a-zA-Z ]*$/.test(values.readerName)) {
                errors.readerName = "Special characters are not allowed"
            }

            if (!values.readerContact) {
                errors.readerContact = "Required *"
            } else if (!/^[0-9]{10}/.test(values.readerContact)) {
                errors.readerContact = 'Invalid contact number';
            } else if (values.readerContact.length > 12 && values.readerContact.length > 10) {
                errors.readerContact = 'Invalid contact number';
            }

            if (!values.readerAddress) {
                errors.readerAddress = "Required *"
            }


            return errors;
        },
        onSubmit: async (values) => {

            //on submit it will proceess the data and create a object in api

            try {
                const readerCreatedData = await axios.post("http://localhost:4001/users/createReader", values, {
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                });
                alert("reader created  successfully !");
                navigate("/");
                formik.handleReset();

                console.log(readerCreatedData.data)

            } catch (error) {

                if (error.response && error.response.data && error.response.data.message === "reader already exists") {

                    formik.setFieldError('readerName', 'reader already exists');
                    formik.setFieldError('readerContact', 'reader already exists');
                } else {
                    console.log("error", error);
                    alert("Error creating reader!");
                }


            }
        }
    })



    return (

        <div className='container mt-5'>
            <div className='row text-center'>
                <div className='col-lg-12'>
                    <h1 className='text-center  reader-heading'>Create New reader </h1>
                    <p className='text-muted'>fill the form to add new reader informations</p>

                </div>
            </div>
            <hr></hr>
            <div className='row align-items-center justify-content-center mt-4 mb-4'>
                <div className='col-lg-10 form-column' >

                    {/* formik package defaultly gave us the handleSubmit and handleChange,handleBlur functions we use then to handle the form easyly */}

                    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                        <div className='row'>
                            <div className='col-md-8'>
                                <label className='label fs-4' >Reader Name : <sup style={{ color: "red" }}> *</sup> </label>

                                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                                <input className='form-control'
                                    type='text'
                                    name="readerName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} >

                                </input>

                                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                                {(formik.getFieldMeta("readerName").touched && formik.errors.readerName)
                                    ? <span style={{ color: "red" }}>{formik.errors.readerName}</span> : null}

                            </div>

                        </div>

                        <div className='row mt-2'>
                            <div className='col-md-8'>
                                <label className='label fs-4' >Contact Number : <sup style={{ color: "red" }}> *</sup>  </label>

                                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}

                                <input className='form-control mt-3'
                                    type='text'
                                    name="readerContact"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder='+91'>

                                </input>

                                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                                {(formik.getFieldMeta("readerContact").touched && formik.errors.readerContact)
                                    ? <span style={{ color: "red" }}>{formik.errors.readerContact}</span> : null}
                            </div>

                        </div>
                        {/* <div className='row mt-2'>
              <div className='col-md-8'>
                <label className='label' >Mail Id : </label>

                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                        {/* <input className='form-control mt-3'
                  type="mail"
                  name="supplierEmail"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='abc@gmail.com'>

                </input> */}

                        {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}

                        {/* 
                {(formik.getFieldMeta("supplierEmail").touched && formik.errors.supplierEmail)
                  ? <span style={{ color: "red" }}>{formik.errors.supplierEmail}</span> : null}

              </div>

            </div> */}
                        <div className='row mt-2'>
                            <div className='col-md-8'>
                                <label className='label fs-4' >Reader Address : <sup style={{ color: "red" }}> *</sup> </label>

                                {/* input box value is crtly find by the name that we gave in intialvalue and name in input field should be same */}


                                <input className='form-control mt-3'
                                    type="text"
                                    name="readerAddress"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >

                                </input>

                                {/* here we first check where the user touched the input field or not if the input is touched and it has error then it show the error message */}


                                {(formik.getFieldMeta("readerAddress").touched && formik.errors.readerAddress)
                                    ? <span style={{ color: "red" }}>{formik.errors.readerAddress}</span> : null}

                            </div>

                        </div>





                        <button className='btn btn-createreader btn-primary mb-5 mt-4 p-2' type="submit" >Create Reader</button>
                    </form>
                </div>
            </div>

            <div className='row mx-2 mb-5 mt-4'>
                <div className='col-lg-12 '>
                    <p className='text-muted  ' >* Create  as many as reader it helps you to have profit of knowledge and benefits !</p>
                </div>
                <hr></hr>
                <div className='col-lg-12'>
                    <p className='text-muted'>* Special characters are not allowed and Invalid contact number,reader already exists are checked while creating a reader</p>
                </div>
                <hr></hr>
                <div className='col-lg-12'>
                    <p className='text-muted'>* reader managed system (RMS) is a supply chain management strategy that shifts the responsibility for library management from the book to the reader </p>
                </div>
                <hr></hr>
                <div className='col-lg-12'>
                    <p className='text-muted'>* This system is a technique of controlling, storing, and keeping track of your knowledge items. </p>
                </div>
                <hr></hr>
                <div className='col-lg-12'>
                    <p className='text-muted'>* books's are backbone of our library ! Build  more reader and maintain your knowledgeable profit time with our library system</p>
                </div>
                <hr></hr>
                {/* <div className='col-lg-12'>
                    <p className='text-muted'>* reader created successfully</p>
                </div>
<hr></hr> */}
            </div>

            <div className="row text-center mx-2 mb-5">
                <div className="col-lg">
                    <h6 className='h4'> *****----- INCREASE YOUR BOOKS INCREASE YOUR KNOWLEDGE LEVEL -----***** </h6>
                </div>
            </div>

        </div>


    )
}

export default CreateReader





















