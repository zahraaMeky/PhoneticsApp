import React, { useState, useEffect } from "react";
import { Link,useNavigate,Navigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';
import axios from "axios";
import NavBar from "./NavBar";
import Swal from "sweetalert2";
function Users() {
  const { REACT_APP_HOST } = process.env;
    const navigate = useNavigate();
    const [show, setshow] = useState(false);
    const [EmailError, setEmailError] = useState(false);
    const [Updaterole, setUpdaterole] = useState("");
    const [usernError, setusernError] = useState(false);
    const [passError, setpassError] = useState(false);
    const [RoleError, setRoleError] = useState(false);
    const [disableInp, setdisableInp] = useState("");
    const [admins, setadmins] = useState([]);
    const [userN, setuserN] = useState("");
    const [updateUser, setupdateUser] = useState("");
    const [useremail, setuseremail] = useState("");
    const [userpassword, setuserpassword] = useState("");
    const [updateEmail, setupdateEmail] = useState("");
    const [updatePassword, setupdatePassword] = useState("");
    const [userrole, setuserrole] = useState("");
    const user = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    // #Open and close model
    const handleClose = () => setshow(false);
    const handleShow = () => setshow(true);
    
    const fetchData = async () => {
        if (user){
          try {
            const { data: response } = await axios.get(
              `${REACT_APP_HOST}getAdmin.php`
         
            );
            setadmins(response);
            console.log(response);
          } catch (error) {
            console.error(error.message);
          }
        }else{
          navigate('/login');
        }
       
      };
      useEffect(() => {
        fetchData();
      }, []);
    const exitUserAlert = () => {
      Swal.fire('Admin User Exit')
    };
    const ErrorDelete = () => {
      Swal.fire('User Can’t Deleted!')
    };
    const successMsgDelete = () => {
      Swal.fire('Admin User deleted')
    };
    const successMsgAlert = () => {
      Swal.fire('Admin added')
    };
    const handleDelete = (id) => {
      const uploadData = new FormData();
      uploadData.append("ID", id);
      uploadData.append("user", user);
      //  console.log(id);
      axios
        .post(`${REACT_APP_HOST}deleteAdmin.php`, uploadData)
        .then((res) => {
          // console.log(res.data);
          if (res.data === 0) {
            successMsgDelete();
            fetchData();
          }
          if (res.data === 1) {
            ErrorDelete();
          }
        })
       
    };
    const ResetInputs = () => {
      setupdateUser("")
      setupdateEmail("")
      setupdatePassword("")
      setUpdaterole("")
      setdisableInp("")
    }
    const handleDisable = (id) => {
      console.log('handleDisable',id)
      setdisableInp(id)
      console.log('disableInp',disableInp)
    }
    const handleEdit = (id) => {
      console.log('handleEdit')
      const uploadData = new FormData();
      uploadData.append("ID", id);
      uploadData.append("user", updateUser);
      uploadData.append("email", updateEmail);
      uploadData.append("password", updatePassword);
      uploadData.append("type", Updaterole);
      console.log('type',Updaterole);
      axios
        .post(`${REACT_APP_HOST}EditAdmin2.php`, uploadData)
        .then((res) => {
          if(res.data==1){
            ResetInputs()
            fetchData();
           
          }
          console.log(res.data)
          // 
        })
        
    };
    console.log('updateUser',updateUser)
  const AdminList = admins.map((admin, i) => {
    return (
      <>
        <div className="col-md-4">
          <div key={admin.id} className="card card-profile mb-3">
            <div className="adminimgcontainer">
            <img  className="adminprofile" 
            src="http://localhost:3000/images/layout/supperAdmin.png"/>
            </div>
            <div className="card-body">
              <div className="input-group my-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">User</span>
              </div>
             
               <input type="text"
                disabled={disableInp==admin.id  ? false  : true}
               className ="form-control" placeholder={admin.username}
               aria-label="Username" aria-describedby="basic-addon1" 
               onChange={(evt) => setupdateUser(evt.target.value)}
               
              /> 
              {/* //  : 
              //  <input type="text" className="form-control" 
              // placeholder={admin.username} aria-label="Username" aria-describedby="basic-addon1"
              // onChange={(evt) => setupdateUser(evt.target.value)}
              // disabled/> */}
              
              </div>
              <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Email</span>
              </div>
              {/* {disableInp==admin.id  ?  */}
              <input disabled={disableInp==admin.id  ? false  : true} type="text" className="form-control" placeholder={admin.email} aria-label="Username" 
              aria-describedby="basic-addon1" 
              onChange={(evt) => setupdateEmail(evt.target.value)}
              />
              {/* // :
              // <input type="text" className="form-control" placeholder={admin.email} 
              // aria-label="Username" aria-describedby="basic-addon1"
              // onChange={(evt) => setupdateEmail(evt.target.value)}
              // disabled/>
              // } */}
              </div>
              <div className="input-group mb-3">
              <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Role</span>
              </div>
              {/* {disableInp==admin.id  ?  */}
              <select disabled={disableInp==admin.id  ? false  : true} className="custom-select" id="inputGroupSelect01" 
              onChange={(evt) => setUpdaterole(evt.target.value)} >
              { admin.type == 1?
                (
                  <>
                  <option value="s" selected>Super Admin</option>
                  <option value="a">Admin</option>
                  </>
                
                )
                :
                (
                  <>
                  <option value="a" selected>Admin</option>
                  <option value="s">Super Admin</option>
                  </>
                
                )
              }
              </select>
              {/* :
              <select className="custom-select" id="inputGroupSelect01" 
              onChange={(evt) => setUpdaterole(evt.target.value)} disabled>
              { admin.type == 1?
                (
                  <>
                  <option value="1" selected>Super Admin</option>
                  <option value="0">Admin</option>
                  </>
                
                )
                :
                (
                  <>
                  <option value="0" selected>Admin</option>
                  <option value="1">Super Admin</option>
                  </>
                
                )
              }
              </select>
              } */}
            </div>
              <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Password</span>
              </div>
              {disableInp== admin.id  ? 
              <input type="password" className="form-control" placeholder={admin.password} aria-label="Username" 
              aria-describedby="basic-addon1" 
              onChange={(evt) => setupdatePassword(evt.target.value)}
              />
              :
              <input type="password" className="form-control" placeholder={admin.password} aria-label="Username" 
              aria-describedby="basic-addon1" 
              onChange={(evt) => setupdatePassword(evt.target.value)} disabled/>
              }
              </div>
          </div>
          {
             role == 1 ?(
              <div className="card-footer">
              <div className="float-left">
                <button onClick={() => handleDelete(admin.id)} style={{background:'none',border:'none'}}> 
                  <i className="far fa-trash-alt" style={{color:'#6c757d'}}></i>
                </button>
              </div>
              <div className="float-right">
              <button  
                onClick={()=> {handleEdit(admin.id);handleDisable(admin.id)}}
                style={{background:'none',border:'none',color:'#6c757d'}}>
              <i className="far fa-edit" style={{color:'#6c757d'}}></i>
              </button>
              </div>
            </div>
            ):null
          }
        
          </div>
        </div> 
      </>
    );
  });
  const alertUserNError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setusernError(false)} show={usernError} delay={3000} autohide>
            <Toast.Body>UserName Can’t be Empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertUserEmailError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setusernError(false)} show={usernError} delay={3000} autohide>
            <Toast.Body>Email Can’t be Empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertUserpassError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setpassError(false)} show={passError} delay={3000} autohide>
            <Toast.Body>Password Can’t be Empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertUserRoleError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setRoleError(false)} show={RoleError} delay={3000} autohide>
            <Toast.Body>Role Can’t be Empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
    //  form validation
    const validate = () => {
      if (userN == "") {
        setusernError(true)
      } else {
        setusernError(false)
      }
      if (userpassword== "") {
        setpassError(true)
      } else {
        setpassError(false)
      }
      if (useremail== "") {
        setEmailError(true)
      } else {
        setEmailError(false)
      }
      if (userrole== "") {
        setRoleError(true)
      } else {
        setRoleError(false)
      }
  
      if (userN==""||userpassword== ""||useremail == ""||userrole=="") {
          return false;
      } else {
          return true;
      }
      };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
    const uploadData = new FormData();
    uploadData.append("userN", userN)
    uploadData.append("userpassword", userpassword)
    uploadData.append("useremail", useremail)
    uploadData.append("userrole", userrole);
    // console.log(userN,userpassword,useremail,userrole)
    axios
        .post( `${REACT_APP_HOST}addAdmin.php`, uploadData)
        .then((res) => {
      //  console.log(res.data)
        if (res.data == 0){
          handleClose()
          successMsgAlert();
          fetchData();
        }
        if(res.data == 1){
          exitUserAlert();
        }      
    })
        .catch((error) => console.log(error));
    }};
  
return(
    <>
    <NavBar/>
    <div className="midde_cont">
      <div className="container-fluid">
        <div className="row column_title page_title">
          <div className="col-6">
            <div className="">
              <h2>Users List</h2>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-end">
          {
            role == 1 ?
            (
              <Button
              type="button"
              style={{background:'none',border:'none',color:'#15283c'}}
              onClick={() => {
                handleShow();
              }}
            >
            <img
                src="http://localhost:3000/images/icons/plus.png"
              />
            <span style={{paddingLeft:'5px'}}>Add User</span>
            </Button>
          ):null
          }
      
          </div>
        </div>
        <div className="row column1">
            {AdminList}
        </div>
        <div className="row">
           {/* <!--modal --> */}
     <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Add User</h6>
            </Modal.Title>
            <button onClick={handleClose}type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}  encType="multipart/form-data">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-user-tie"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setuserN(evt.target.value)}
                placeholder="Add UserName" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
              {usernError ? (
                alertUserNError()
              ) : null}
           
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-envelope"></i></span>
                </div>
                <input type="email"  className="form-control" onChange={(evt) => setuseremail(evt.target.value)}
                placeholder="Add Email" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
             
              {EmailError ? (
                alertUserEmailError()
              ) : null}
         
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-key"></i></span>
                </div>
                <input type="password"  className="form-control" onChange={(evt) => setuserpassword(evt.target.value)}
                placeholder="Add password" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
              {passError ? (
                alertUserpassError()
              ) : null}
              <div className="input-group mb-3">
              <div className="input-group-prepend">
                <label className="input-group-text" for="inputGroupSelect01">
                <i className="fas fa-cog"></i>
                </label>
              </div>
              <select className="custom-select" id="inputGroupSelect01" onChange={(evt) => setuserrole(evt.target.value)}>
                <option selected>User Role...</option>
                <option value="1">Super Admin</option>
                <option value="0">Admin</option>
              </select>
            </div>
            {RoleError ? (
                alertUserRoleError()
              ) : null}
              <Modal.Footer>
                <Button
                  type="submit"
                  style={{
                    color: "#fff",
                    background: "#1ed085",
                    border: '1px solid #15283c'
                  }}
                 
                >
                  Save User
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        </div>
        </div>
      </div>
    </div>
    </>
)
}
export default Users;