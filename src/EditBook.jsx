import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { addBookList, editBookList } from './reducer/BookSlice';
import { useState } from 'react';

function EditBook() {

    const params = useParams();

    const [state, setState] = useState();
const navigate =useNavigate()
    const getEditingData = async () => {
        try {
            const getData = await axios.get(`https://library-backend-1-2hr6.onrender.com//books/getBookToEdit/${params.id}`,{
                headers: {
                    "Authorization":localStorage.getItem("token")
                }
            })
            // Assuming that getData.data contains the book data
            {
                getData.data.map((item) => {
                    formik.setValues({
                        bookTitle: item.bookTitle,
                        authorName: item.authorName,
                        bookNumber: item.bookNumber,
                        publishDate: item.publishDate,
                        bookImg: item.bookImg
                    });
                })
            }
           
            // formik.setValues(getData.data)
            setState(getData.data);
            console.log(getData.data)
        } catch (error) {
            console.log("error")
        }
    }

    useEffect(() => {
        getEditingData()
    },[params.id])
    //dispatch method for action 
    const dispatch = useDispatch()

    const user = useSelector((state) => state.app.books.find((user) => user._id === parseInt(params.id)));
    // console.log(user)

    //handle file upload
    const handleFile = (e) => {
        formik.setFieldValue('bookImg', e.target.files[0]);
    }


  
    // const getEditingData = async () => {
    //     try {
    //         const getData = await axios.get(`https://655b68dbab37729791a90eb0.mockapi.io/damyapi/book/${params._id}`)
    //         setState(getData.data)
    //         formik.setValues(getData.data)
    //     } catch (error) {
    //         console.log("error")
    //     }

    // }

    // useEffect(() => {
    //     getEditingData()
    // }, [params.id])

    //formik to handle forms
    const formik = useFormik({
        initialValues: {
            bookTitle: "",
            authorName: "",
            bookNumber: "",
            publishDate: "",
            bookImg: ''

        }, validate: (values) => {
            let errors = {};

            //validation based on the below condition

            if (!values.bookTitle) {
                errors.bookTitle = "Please Enter Book Title"
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
            try {
                const upDateApiData = await axios.put(`https://library-backend-1-2hr6.onrender.com//books/editbook/${params.id}`, values,{
                    headers: {
                        'Authorization':localStorage.getItem("token")
                    }
                });
                dispatch(editBookList(upDateApiData.data));
                formik.handleReset();
                alert("Book Updated Successfully");
                navigate("/book-list")
                
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

                                <input type="text" name="bookTitle"
                                    value={formik.values.bookTitle}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"
                                    placeholder='Name'
                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta("bookTitle").touched && formik.errors.bookTitle) ?

                                    <span style={{ color: "red" }}>{formik.errors.bookTitle}</span> : null

                                }

                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-lg-8 mb-3">
                                <label className='label'>Author Name : </label>
                                <input type="text" name="authorName"
                                    value={formik.values.authorName}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"
                                    placeholder='Shakeshspear'
                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta(" authorName").touched && formik.errors.authorName) ?
                                    <span style={{ color: "red" }}>{formik.errors.authorName}</span> : null

                                }
                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-lg-6 mb-3">
                                <label className='label'>ISBN Number :</label>
                                <input type="text" name="bookNumber"
                                    value={formik.values.bookNumber}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"
                                    placeholder="334455"
                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta("bookNumber").touched && formik.errors.bookNumber) ?

                                    <span style={{ color: "red" }}>{formik.errors.bookNumber}</span> : null
                                }

                                <div className='row mt-2'>
                                    <div className="col-lg-6 mb-3">
                                        <label className='label'>Published Date :</label>
                                        <input type="date"
                                            name="publishDate"
                                            value={formik.values.publishDate}
                                            onChange={formik.handleChange}
                                            className="form-control mt-3"

                                            onBlur={formik.handleBlur} />

                                        {(formik.getFieldMeta("publishDate").touched && formik.errors.publishDate) ?

                                            <span style={{ color: "red" }}>{formik.errors.publishDate}</span> : null
                                        }

                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className="col-lg-6 mb-3">
                                        <label className='label'>Book Img :</label>
                                        <input type="url" name="bookImg"
                                            value={formik.values.bookImg}
                                            onChange={formik.handleChange}
                                            className="form-control mt-3"
                                            placeholder="url"
                                            onBlur={formik.handleBlur} />

                                        {(formik.getFieldMeta("bookImg").touched && formik.errors.bookImg) ?

                                            <span style={{ color: "red" }}>{formik.errors.bookImg}</span> : null
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