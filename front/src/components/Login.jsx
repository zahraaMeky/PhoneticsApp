import React, { useState, useEffect } from "react";
import Toast from 'react-bootstrap/Toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import NavBar from "./NavBar";
ReactSession.setStoreType("localStorage");
function Login() {
    const { REACT_APP_HOST } = process.env;
    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [passwordeError, setpasswordeError] = useState(false);
    const [userNameError, setuserNameError] = useState(false);
    const [Error, setError] = useState(false);
    const navigate = useNavigate();

  //  form validation
  const validate = () => {
    if (userName == "") {
        setuserNameError(true)
    } else {
        setuserNameError(false)
    }
    if (password == "") {
        setpasswordeError(true)
    } else {
        setpasswordeError(false)
    }

    if (userName == "" ||password=="") {
        return false;
    } else {
        return true;
    }
    };
const handleSubmit=(e)=>{
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
        const uploadData = new FormData();
        uploadData.append("userName", userName)
        uploadData.append("password", password)
        axios
        .post( `${REACT_APP_HOST}login.php`, uploadData)
        .then((res) => {
        console.log('res.data',res.data);
        if(res.data == 1){
          // console.log('user')
          localStorage.setItem("username",userName);
          localStorage.setItem("role",1);
          navigate('/');

        }
        if(res.data == 0){
          // console.log('user')
          localStorage.setItem("username",userName);
          localStorage.setItem("role",0);
          navigate('/login');

        }
        if(res.data == -1){
          setError(true)

        }
        
      })
        .catch((error) => console.log(error));
      }
    }

const UserError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setuserNameError(false)} show={userNameError} delay={3000} autohide>
            <Toast.Body>UserName Can’t be Empty</Toast.Body>
          </Toast>
      </div>
    );
  }
  const PasswordError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setpasswordeError(false)} show={passwordeError} delay={3000} autohide>
            <Toast.Body>Password Can’t be Empty</Toast.Body>
          </Toast>
      </div>
    );
  }
  const ErrorMSG = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setError(false)} show={Error} delay={3000} autohide>
            <Toast.Body>Password or User Wrong</Toast.Body>
          </Toast>
      </div>
    );
  }
    return(
    <>
    <NavBar/>
    <div className="midde_cont">
        <div className="container-fluid">
            <div className="row column_title page_title">
                <h2>Sign In</h2>
            </div>
            <div className="row d-flex justify-content-around">
            <div className="card col-md-6 shadow-strong" style={{height:'335px',
            padding:'50px',marginTop:'50px'}}>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                <div className="input-group mb-4" >
                    <input type="text"  onChange={(evt) => setuserName(evt.target.value)}className="form-control" placeholder="Admin's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                          <img src="http://localhost:3000/images/icons/administration.png"/>
                        </span>
                    </div>
                </div>
           
                <div className="input-group mb-4">
                    <input type="password" onChange={(evt) => setpassword(evt.target.value)} className="form-control" placeholder="Admin's password" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2">
                        <img src="http://localhost:3000/images/icons/password.png"/>
                        </span>
                    </div>
                </div>
               
                <div className="input-group mb-3">
                    <button style={{border:'none',background:'none'}}className="bn40" type="submit">Login</button>
                </div>
                {userNameError ? (
                UserError()
              ) : null}
               {passwordeError ? (
                PasswordError()
              ) : null}
                {Error ? (
                ErrorMSG()
              ) : null}
                </form>
            </div>
            </div>
            <div className="col-md-5">
                <img style={{marginTop:'20px'}}className="img-fluid"src="http://localhost:3000/images/layout/login2.png"/>
            </div>
            </div>

         </div>

    </div>
    </>
        
    )
    
}
export default Login;