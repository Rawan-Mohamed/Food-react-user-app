import React from 'react'
import logo from '../../../assets/images/1.png'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

export default function Login({ saveUserData }) {
  const navigate = useNavigate();
  // some {properties} and receive return from hook useForm 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { baseUrl } = useContext(AuthContext);
  // bdal mn handlha gwa el handleSubmit h3ml function a st2bl feha 
  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${baseUrl}/Users/Login`, data)
      .then((response) => {
        console.log(response);

        localStorage.setItem("userToken", response.data.token); //m3ia el 7aga el tsbt any logged in 
        saveUserData();
        navigate("/dashboard")
      })
      .catch((error) => {
        toast(error.response.data.message);
        // console.log(error.response.data.message);
      });
  };


  return (
    <div className="Auth-container container-fluid">
      <ToastContainer />
      <div className="row bg-overlay vh-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="bg-white p-2">
            <div className="logo-cont text-center">
              <img src={logo} className='w-25' alt="logo" />
            </div>

            {/* form */}
            {/* onSubmit={handleSubmit(onSubmit)} passly data el mogoda onsubmite gwa el handleSubmit */}
            <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
              <h2>Log in</h2>
              <p>Welcome Back! Please enter your details</p>
              {/* /Email/ */}
              <div className="form-group my-3 input-icons position-relative">
                <i className="icons fa-solid fa-envelope position-absolute text-success  " />

                <input
                  placeholder='Enter your E-mail'
                  className='form-control input-field'
                  type="email"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                      message: "email is required"
                    }
                  })}
                />
                {errors.email && (
                  <span className='text-danger'>{errors.email.message}</span>)}
                {/* {errors.email && errors.email.type === "pattern" && (
                  <span className='text-danger'>invaild mail</span>)} */}
              </div>
              {/* //Password */}
              <div className="form-group my-3 input-icons position-relative">
                <i className="icons fa-solid fa-lock position-absolute text-success " />
                {/* <i className="fa-solid fa-eye" /> */}
                <input
                  placeholder='Password'
                  className='form-control'

                  type="password"
                  {...register("password", {
                    required: "password is required",
                  })}

                />
                {errors.password && (
                  <span className='text-danger'>{errors.password.message}</span>)}
              </div>

              <div className='d-flex form-group my-3 justify-content-between'>
                {/* Register password */}
                <Link to="/registeration" className=' text-success'>
                    Register now?
                  </Link>
                {/* <div className='register col-md-6'>
                  <a href="#" className="text-black">Register now</a>
                </div> */}
                {/* Forget password */}
                <Link to="/reset-pass-request" className=' text-success'>
                    Forget Password?
                  </Link>
                {/* <div className='form-group col-md-6 forgetpass text-end '>
                  <Link to="/reset-pass-request" className=' text-success'>
                    Forget Password?
                  </Link>
                </div> */}
              </div>

              {/* Buttuon login */}
              <div className="form-grup my-3">
                <button className=' btn btn-success w-100'>Login</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
