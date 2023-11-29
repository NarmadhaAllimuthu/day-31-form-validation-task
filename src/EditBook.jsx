import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { addBookList, editBookList } from './reducer/BookSlice';
import { useState } from 'react';

function EditBook() {

    const params = useParams();

    const [state, setState] = useState();

    //dispatch method for action 
    const dispatch = useDispatch()

    const user = useSelector((state) => state.app.books.find((user) => user.id === parseInt(params.id)));


    //getting data for which the user click for edit
    const getEditingData = async () => {
        try {
            const getData = await axios.get(`https://655b68dbab37729791a90eb0.mockapi.io/damyapi/book/${params.id}`)
            setState(getData.data)
            formik.setValues(getData.data)
        } catch (error) {
            console.log("error")
        }

    }

    useEffect(() => {
        getEditingData()
    }, [params.id])

    //formik to handle forms
    const formik = useFormik({
        initialValues: {
            title: "",
            authorname: "",
            booknumber: "",
            publishdate: "",
            bookimg: ''

        }, validate: (values) => {
            let errors = {};

            //validation based on the below condition

            if (!values.title) {
                errors.title = "Please Enter Book Title"
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
            try {
                const upDateApiData = await axios.put(`https://655b68dbab37729791a90eb0.mockapi.io/damyapi/book/${params.id}`, values);
                dispatch(editBookList(upDateApiData.data));
                formik.handleReset();
            } catch {
                console.log('error');
            }
        }
    });



    return (
        <div className='container edit-container'>
            <div className='text-center heading'>
                <h1 className='create-user'>Edit the Form</h1>
                <p className='text-muted para'>update the existing form  </p>
            </div>
            <hr style={{ height: "4px", color: 'gray' }}></hr>

            <div className='row  d-flex align-items-center justify-content-center'>
                <div className='col-lg-8 form-container  '>
                    <form onSubmit={formik.handleSubmit} className="container mt-5">
                        <div className="row mt-4">
                            <div className="col-lg-8 mb-3">
                                <label className='label'>Book Name : </label>

                                <input type="text" name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"
                                    placeholder='Name'
                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta("title").touched && formik.errors.title) ?

                                    <span style={{ color: "red" }}>{formik.errors.title}</span> : null

                                }

                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-lg-8 mb-3">
                                <label className='label'>Author Name : </label>
                                <input type="text" name="authorname"
                                    value={formik.values.authorname}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"
                                    placeholder='Shakeshspear'
                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta(" authorname").touched && formik.errors.authorname) ?
                                    <span style={{ color: "red" }}>{formik.errors.authorname}</span> : null

                                }
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-lg-6 mb-3">
                                <label className='label'>ISBN Number :</label>
                                <input type="text" name="booknumber"
                                    value={formik.values.booknumber}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"
                                    placeholder="334455"
                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta("booknumber").touched && formik.errors.booknumber) ?

                                    <span style={{ color: "red" }}>{formik.errors.booknumber}</span> : null
                                }

                                <div className='row mt-2'>
                                    <div className="col-lg-6 mb-3">
                                        <label className='label'>Published Date :</label>
                                        <input type="date"
                                            name="publishdate"
                                            value={formik.values.publishdate}
                                            onChange={formik.handleChange}
                                            className="form-control mt-3"

                                            onBlur={formik.handleBlur} />

                                        {(formik.getFieldMeta("publishdate").touched && formik.errors.publishdate) ?

                                            <span style={{ color: "red" }}>{formik.errors.publishdate}</span> : null
                                        }

                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className="col-lg-6 mb-3">
                                        <label className='label'>Book Img :</label>
                                        <input type="url" name="bookimg"
                                            value={formik.values.bookimg}
                                            onChange={formik.handleChange}
                                            className="form-control mt-3"
                                            placeholder="url"
                                            onBlur={formik.handleBlur} />

                                        {(formik.getFieldMeta("bookimg").touched && formik.errors.bookimg) ?

                                            <span style={{ color: "red" }}>{formik.errors.bookimg}</span> : null
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>





                        <div className="col-lg-12 mt-3 mb-5">

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>

                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditBook