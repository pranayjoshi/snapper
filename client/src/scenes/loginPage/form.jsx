import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import { Formik } from "formik";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  // [firstName, setFirstName] : useState(),
  firstName:"",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

export const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };
  

  const handleFormOnsubmit = async (values, onSubmitProps) => {
    // console.log(values)
    console.log(values)
    // if (isLogin) await login(values, onSubmitProps);
    // if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormOnsubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <>
            <div className="">
              <div className="flex items-center justify-center ">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24 border border-gray-300 rounded-md">
                  <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                    <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
                      {isLogin ? "Sign In " : "Sign Up"}
                    </h2>
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
                      {isLogin
                        ? "Don't have an account? "
                        : "Already have an account? "}
                      <a
                        href="#"
                        title=""
                        className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                        onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                            resetForm();
                          }}
                      >
                        {isLogin ? "Sign Up" : "Sign In"}
                      </a>
                    </p>

                    <form action="#" method="POST" className="mt-8" onChange={handleSubmit}>
                      <div className="space-y-5 w-full">
                        {isRegister && (
                          <>
                            <div className="flex w-full p-0 m-0">
                              <div className="mr-4 w-full">
                                <label
                                  htmlFor="fname"
                                  className="text-base font-medium text-gray-900 dark:text-gray-200"
                                >
                                  {" "}
                                  First Name{" "}
                                </label>
                                <div className="mt-2.5">
                                  <input
                                  label="First Name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.firstName}
                                  name="firstName"
                                  error={
                                    Boolean(touched.firstName) && Boolean(errors.firstName)
                                  }
                                  helperText={touched.firstName && errors.firstName}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                    type="text"
                                    placeholder="Enter You First Name"
                                    id="fname"
                                  ></input>
                                </div>
                              </div>
                              <div className="w-full">
                                <label
                                  htmlFor="lname"
                                  className="text-base font-medium text-gray-900 dark:text-gray-200"
                                >
                                  {" "}
                                  Last Name{" "}
                                </label>
                                <div className="mt-2.5">
                                  <input
                                  label="Last Name"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.lastName}
                                  name="lastName"
                                  error={
                                    Boolean(touched.lastName) && Boolean(errors.lastName)
                                  }
                                  helperText={touched.lastName && errors.lastName}
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                    type="text"
                                    placeholder="Enter You Last Name"
                                    id="lname"
                                  ></input>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="text-base font-medium text-gray-900 dark:text-gray-200"
                              >
                                {" "}
                                Location{" "}
                              </label>
                              <div className="mt-2.5">
                                <input
                                label="Location"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.location}
                                name="location"
                                error={
                                  Boolean(touched.location) && Boolean(errors.location)
                                }
                                helperText={touched.location && errors.location}
                                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                  type="text"
                                  placeholder="Enter Your Location"
                                  id="location"
                                ></input>
                            </div>
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="text-base font-medium text-gray-900 dark:text-gray-200"
                              >
                                {" "}
                                Occupation{" "}
                                
                              </label>
                              <div className="mt-2.5">
                                <input
                                label="occupation"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.occupation}
                                name="occupation"
                                error={
                                  Boolean(touched.occupation) && Boolean(errors.occupation)
                                }
                                helperText={touched.occupation && errors.occupation}
                                // error={Boolean(touched.email) && Boolean(errors.email)}
                                // helperText={touched.email && errors.email}
                                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                  type="text"
                                  placeholder="Enter Your Occupation"
                                  id="occupation"
                                ></input>
                              </div></div>
                            
                            <div className="border-2 border-dashed rounded-lg border-gray-400 text-gray-400 py-10 cursor-pointer">
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                  setFieldValue("picture", acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                            <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {!values.picture ? (
                                            <p>Add Picture Here</p>
                                            ) : (<p>{values.picture.name}</p>)
                                        
                                        }
                                            </div>
                                  </section>)}
                            </Dropzone>
                          </div>
                            
                          </>
                        )}
                        <div>
                              <label
                                htmlFor="email"
                                className="text-base font-medium text-gray-900 dark:text-gray-200"
                              >
                                {" "}
                                Email address{" "}
                              </label>
                              <div className="mt-2.5">
                                <input
                                label="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={
                                  Boolean(touched.email) && Boolean(errors.email)
                                }
                                helperText={touched.email && errors.email}
                                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                  type="email"
                                  placeholder="Enter Your Email"
                                ></input>
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="password"
                                className="text-base font-medium text-gray-900 dark:text-gray-200"
                              >
                                {" "}
                                Password{" "}
                              </label>
                              <div className="mt-2.5">
                                <input
                                label="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={
                                  Boolean(touched.password) && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                                  type="password"
                                  placeholder="Enter Your Password"
                                  id="password"
                                  
                                ></input>
                              </div>
                            </div>

                        <div>
                          <button
                            className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                            type="submit" 
                          >
                            Get started
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 ml-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </form>

                    <div className="mt-3 space-y-3">
                      <button
                        type="button"
                        className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 dark:text-gray-400 transition-all duration-200 bg-white border border-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                      >
                        <div className="absolute inset-y-0 left-0 p-4">
                          <svg
                            className="w-6 h-6 text-rose-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                          </svg>
                        </div>
                        {isLogin
                        ? "Sign in with Google "
                        : "Sign up with Google "}
                        
                      </button>

                      <button
                        type="button"
                        className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 dark:text-gray-400 transition-all duration-200 bg-white border border-gray-500 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none"
                      >
                        <div className="absolute inset-y-0 left-0 p-4">
                          <svg
                            className="w-6 h-6 text-[#2563EB]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                          </svg>
                        </div>
                        {isLogin
                        ? "Sign in with Facebook"
                        : "Sign up with Facebook "}
                        
                      </button>
                      <p>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          Read our{" "}
                          <span className="capitalize text-indigo-600">
                            privacy policy
                          </span>{" "}
                          and{" "}
                          <span className="capitalize text-indigo-600">
                            terms of service
                          </span>{" "}
                          to learn more
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};
