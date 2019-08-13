import React from 'react'
import { Formik, Field, ErrorMessage, Form } from 'formik';
import Axios from 'axios';
import { baseUrl } from './config';

export default function Register() {
    return (
        <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required password';
          }
          if (!values.phoneNumber) {
            errors.phoneNumber = 'Required phonenumber';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('submitting values: ', JSON.stringify(values));
          Axios.post(`${baseUrl}/registeruser`,{
            email: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber
        });
        }}
        >
            {({ isSubmitting }) => (
                <Form>
                  <div>
                  <Field
                    name="email"
                    placeholder="Enter email"
                />
                <ErrorMessage 
                    name="email"
                    component="div"
                />

                  </div>
                  <div>
                  <Field
                    name="password"
                    placeholder="Enter password"
                />
                <ErrorMessage 
                    name="password"
                    component="div"
                />

                  </div>
                  <div>
                  <Field
                    name="phoneNumber"
                    placeholder="Enter Phone number"
                  />
                  <ErrorMessage 
                      name="phoneNumber"
                    component="div"
                  />
                  </div>
                <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
}
