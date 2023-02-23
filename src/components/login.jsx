import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginAsync } from "../login_slice";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";
import RenderError from "./render_error";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(3, "Min username length is 3")
            .max(16, "Max username length is 16")
            .required(),
          password: Yup.string().min(2, "Min password length is 2").required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          // alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          dispatch(
            loginAsync(
              values,
              () => {
                navigate("/users");
              },
              (error) => {
                setErrorMessage(error.message);
              }
            )
          );
        }}
      >
        {() => (
          <div className="div-center">
            <div className="content">
              <h3>Login</h3>
              <hr />
              <Form>
                <div className="form-group">
                  <label htmlFor="username">User Name</label>
                  <Field
                    className="form-control"
                    id="username"
                    placeholder="username"
                    name="username"
                  />
                  <span className="error_message">
                    <ErrorMessage name="username" />
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password"
                  />
                  <span className="error_message">
                    <ErrorMessage name="password" />
                  </span>
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <hr />
              </Form>
              <RenderError errorMessage={errorMessage} />
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}
