// import React from 'react'
// import logo from '../../../assets/images/1.png'
// import { useForm } from "react-hook-form"
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as Yup from 'yup'


// export default function ForgetPass({ handleClass }) {
//   const navigate = useNavigate();
//   // some {properties} and receive return from hook useForm 

//   const formSchema = Yup.object().shape({
//     newPassword: Yup.string()
//       .required('Password is mendatory'),

//     confirmNewPassword: Yup.string()
//       .required('Password is mendatory')
//       .oneOf([Yup.ref('password')], 'Passwords does not match'),
//   })
//   const formOptions = { resolver: yupResolver(formSchema) }

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm(formOptions);
//   // bdal mn handlha gwa el handleSubmit h3ml function a st2bl feha 
//   const onSubmit = (data) => {
//     // console.log(data);
//     axios
//       .put("http://upskilling-egypt.com:3002/api/v1/Users/ChangePassword", data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("userToken")}`

//         },
//       }
//       )
//       .then((response) => {

//         navigate("/login")
//       })
//       .catch((error) => {
//         toast(error.response.data.message);
//         // console.log(error.response.data.message);
//       });
//   };

//   return (
//     <div className="Auth-container container-fluid">
//       <ToastContainer />
//       <div className="row bg-overlay vh-100 justify-content-center align-items-center">
//         <div className="col-md-6">
//           <div className="bg-white p-2">
//             <div className="logo-cont text-center">
//               <img src={logo} className='w-25' alt="logo" />
//             </div>

//             {/* form */}
//             {/* onSubmit={handleSubmit(onSubmit)} passly data el mogoda onsubmite gwa el handleSubmit */}
//             <form className='w-75 m-auto' onSubmit={handleSubmit(onSubmit)}>
//               <h2>Change your password</h2>
//               <p>Enter your details below</p>

//               {/* // old Password */}
//               <div className="form-grup my-3">
//                 <input
//                   placeholder='Old Password'
//                   className='form-control'
//                   type="password"
//                   {...register("oldPassword", {
//                     required: true,
//                   })}
//                 />
//                 {errors.oldPassword && errors.oldPassword.type === "required" && (
//                   <span className='text-danger'>oldPassword is required</span>)}
//               </div>
//               {/* //New Password */}
//               <div className="form-grup my-3">
//                 <input
//                   placeholder='New Password'
//                   className={`form-control  ${errors.newPassword ? 'is-invalid' : ''}`}
//                   type="password"
//                   {...register("newPassword", {
//                     pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     // required: true,
//                   })}

//                 />
//                 {/* {errors.newPassword && errors.newPassword.type === "required" && (
//                   <span className='text-danger'>newPassword is required</span>)} */}
//                 <div className="invalid-feedback">{errors.newPassword?.message}</div>
//                 <span className='text-danger'>Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</span>)
                



//               </div>
//               {/* //Confirm Password */}
//               <div className="form-grup my-3">
//                 <input
//                   placeholder='Confirm New Password'
//                   className={`form-control  ${errors.confirmNewPassword ? 'is-invalid' : ''}`}
//                   type="password"
//                   {...register("confirmNewPassword", {
//                     // required: true,
//                   })}
//                 />
//                 {/* {errors.confirmNewPassword && errors.confirmNewPassword.type === "required" && (
//                   <span className='text-danger'>confirmNewPassword is required</span>)} */}
//                 <div className="invalid-feedback">{errors.confirmNewPassword?.message}</div>

//               </div>
//               {/* Buttuon login */}
//               <div className="form-grup my-3">
//                 <button className=' btn btn-success w-100'>Change Password</button>
//               </div>
//             </form>



//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// {provider && profile ? (
//     <User provider={provider} profile={profile} onLogout={onLogoutSuccess} />
//   ) : (
//     <div className={`App ${provider && profile ? 'hide' : ''}`}>
//       <h1 className='title'>ReactJS Social Login</h1>
//       <LoginSocialFacebook
//         isOnlyGetToken
//         appId={process.env.REACT_APP_FB_APP_ID || ''}
//         onLoginStart={onLoginStart}
//         onResolve={({ provider, data }) => {
//           setProvider(provider)
//           setProfile(data)
//         }}
//         onReject={(err) => {
//           console.log(err)
//         }}
//       >
//         <FacebookLoginButton />
//       </LoginSocialFacebook>

//       <LoginSocialGoogle
//         isOnlyGetToken
//         client_id={process.env.REACT_APP_GG_APP_ID || ''}
//         onLoginStart={onLoginStart}
//         onResolve={({ provider, data }) => {
//           setProvider(provider)
//           setProfile(data)
//         }}
//         onReject={(err) => {
//           console.log(err)
//         }}
//       >
//         <GoogleLoginButton />
//       </LoginSocialGoogle>


//       <LoginSocialLinkedin
//         isOnlyGetToken
//         client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ''}
//         client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ''}
//         redirect_uri={REDIRECT_URI}
//         onLoginStart={onLoginStart}
//         onResolve={({ provider, data }) => {
//           setProvider(provider)
//           setProfile(data)
//         }}
//         onReject={(err) => {
//           console.log(err)
//         }}
//       >
//         <LinkedInLoginButton />
//       </LoginSocialLinkedin>

//       <LoginSocialGithub
//         isOnlyGetToken
//         client_id={process.env.REACT_APP_GITHUB_APP_ID || ''}
//         client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ''}
//         redirect_uri={REDIRECT_URI}
//         onLoginStart={onLoginStart}
//         onResolve={({ provider, data }) => {
//           setProvider(provider)
//           setProfile(data)
//         }}
//         onReject={(err) => {
//           console.log(err)
//         }}
//       >
//         <GithubLoginButton />
//       </LoginSocialGithub>

 
//     </div>
//   )}