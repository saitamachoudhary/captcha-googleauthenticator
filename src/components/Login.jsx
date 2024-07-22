import { useEffect,useState} from "react";
// import SubmitImg from "../Image/SubmitImg.png";
import { GoogleLogin } from "@react-oauth/google";
import { decodeJWT } from '../Hook';
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

import { useFormik } from "formik";

const Login = () => {
  const [captchaerror,setcaptchaerror]=useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      user_captcha_input: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      user_captcha_input: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (validateCaptcha(formik.values.user_captcha_input) === true) {
        // alert("Captcha Matched");
        // loadCaptchaEnginge(6);
        // alert(JSON.stringify(values, null, 2));
        navigate('/user',{state:values})
        loadCaptchaEnginge(6);
        formik.resetForm();
      } else {
        setcaptchaerror(true);
        // document.getElementById('user_captcha_input').value='';
      }
    },
  });

  const onSuccess = (response) => {
    console.log("Login Success:", response);
    const token=response.credential;
    const userInfo = decodeJWT(token);
    if(userInfo){
     navigate('/user',{state:userInfo})
    }
  };

  const onError = () => {
    console.log("Login Failed");
  };


  return (
    <div className="parentdiv flex items-center justify-center min-h-screen bg-[#ffd8985e]">
      <div className="max-w-lg relative flex flex-col p-4 rounded-md text-black bg-white shadow-2xl shadow-[#000000ab]">
        <div className="text-4xl font-bold mb-2 text-[#1e0e4b] text-center">
          Welcome back to <span className="text-[#7747ff]">App</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Log in to your account
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <div className="block relative">
            <label
              htmlFor="email"
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-400">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="block relative">
            <label
              htmlFor="password"
              className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
            {formik.touched.password ? (
              <div className="text-red-400">{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <a className="text-sm text-[#7747ff]" href="#">
              Forgot your password?
            </a>
          </div>

          <div>
            <div className="container">
              <div className="form-group">
                <div className="col mt-3">
                  <LoadCanvasTemplate />
                </div>

                <div className="col mt-3 flex items-center justify-start">
                  <div>
                    <input
                      placeholder="Enter Captcha Value"
                      id="user_captcha_input"
                      name="user_captcha_input"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.user_captcha_input}
                      className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
                    ></input>
                    {formik.touched.user_captcha_input ? (
                      <div className="text-red-400">
                        {formik.errors.user_captcha_input}
                      </div>
                    ) : null}
                    {captchaerror?<p className="text-red-600">Invalid Captcha</p>:null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="w-max m-auto relative px-8 py-2 rounded-md bg-white isolation-auto z-10 border-2 border-[#7747ff] hover:text-white before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full  before:bg-[#7747ff] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700">
            Submit
          </button>
        <GoogleLogin className='' onSuccess={onSuccess} onError={onError} />
        </form>
       
        <div className="text-sm text-center mt-[1.6rem]">
          Don’t have an account yet?{" "}
          <a className="text-sm text-[#7747ff]" href="#">
            Sign up for free!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
