import React from 'react'
import {Formik,Form, Field, ErrorMessage} from 'formik';
import Axios from 'axios';
import { baseUrl } from './config';

export default function Login(props) {
    return (
        <div>
            <Formik
                initialValues={{email:"", password: ""}}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    console.log('submitting: values: ', JSON.stringify(values));
                    Axios.post(`${baseUrl}/login`,{
                        email: values.email,
                        password: values.password,
                    });
                }}
                validate={values => {
                    let errors = {};
                    if (!values.email) {
                      errors.email = 'Email Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                    }

                    if(!values.password) {
                        errors.password = 'Password Required';
                    }
                    return errors;
                  }}            
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field name="email" placeholder="Enter email"/>
                            <ErrorMessage name="email" component="div"/>
                        </div>
                        <div>
                            <Field name="password" placeholder="Enter password"/>
                            <ErrorMessage name="password" component="div"/>
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
