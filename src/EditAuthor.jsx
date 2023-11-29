import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { addBookList, editAuthorList, updateLocalAuthor } from './reducer/BookSlice';
import { useEffect, useState } from 'react';

function EditAuthor() {


    const params = useParams();

    const [state, setState] = useState();

    //dispatch method for action 
    const dispatch = useDispatch()


    const user = useSelector((state) => state.app.author.find((user) => user.authorid === parseInt(params.id)));



    //getting data for which the user click for edit
    const getEditingData = async () => {
        try {
            const getData = await axios.get(`https://655b68dbab37729791a90eb0.mockapi.io/damyapi/details/${params.id}`)
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

            authorname: "",
            dob: "",
            description: ""
        },
        validate: (values) => {

            let errors = {}


            if (!values.authorname) {
                errors.authorname = "Please Enter Author Name"
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
            try {
                const upDateApiData = await axios.put(`https://655b68dbab37729791a90eb0.mockapi.io/damyapi/details/${params.id}`, values);
                dispatch(editAuthorList(upDateApiData.data));
                formik.setValues(upDateApiData.data);
                setState(upDateApiData.data);

                // Dispatch an action to update the local state

                dispatch(updateLocalAuthor(upDateApiData.data));

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
                                <label className='label'>Author Name : </label>

                                <input type="text" name="authorname"
                                    value={formik.values.authorname}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"
                                    placeholder='Name'
                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta("authorname").touched && formik.errors.authorname) ?

                                    <span style={{ color: "red" }}>{formik.errors.authorname}</span> : null

                                }

                            </div>
                        </div>



                        <div className='row mt-2'>
                            <div className="col-lg-6 mb-3">
                                <label className='label'> Date of Birth :</label>
                                <input type="date"
                                    name="dob"
                                    value={formik.values.dob}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"

                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta("dob").touched && formik.errors.dob) ?

                                    <span style={{ color: "red" }}>{formik.errors.dob}</span> : null
                                }

                            </div>
                        </div>
                        <div className='row mt-2'>
                            <div className="col-lg-6 mb-3">
                                <label className='label'>Description :</label>
                                <textarea type="text" name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    className="form-control mt-3"
                                    placeholder="text"
                                    onBlur={formik.handleBlur} />

                                {(formik.getFieldMeta("description").touched && formik.errors.description) ?

                                    <span style={{ color: "red" }}>{formik.errors.description}</span> : null
                                }
                            </div>
                        </div>





                        <div className="col-lg-12 mt-3 mb-5">

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>

                        </div>

                    </form>
                </div >
            </div >
        </div >
    )
}

export default EditAuthor