import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { Link,useNavigate,Navigate,useParams } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import Swal from "sweetalert2";
import NavBar from "./NavBar";
function PhoneticsSamples() {
  const {REACT_APP_HOST,REACT_APP_IMAGE_PATH} = process.env;
  console.log('REACT_APP_IMAGE_PATH',REACT_APP_IMAGE_PATH)
  const {phonetic_name} = useParams();
  const [word, setword] = useState("");
  const [image, setimage] = useState();
  const [EditExampleimage,setEditExampleimage] = useState();
  const [Type, setType] = useState("i");
  const [CurrentExample, setCurrentExample] = useState("");
  const [EditExampleword, setEditExampleword] = useState("");
  const [CurrentImage, setCurrentImage] = useState("");
  const [FileError, setFileError] = useState(false);
  const [wordExitError, setwordExitError] = useState(false);
  const [Eid, setEid] = useState("");
  const [isActive, setIsActive] = useState(0);
  const [wordError, setwordError] = useState(false);
  const [imageError, setimageError] = useState(false);
  const [show, setshow] = useState(false);
  const user = localStorage.getItem('username');
  const navigate = useNavigate();
  console.log('phonetic_name',phonetic_name)
  const [PhoneticsExamples, SetPhoneticsExamples] = useState([]);
  const [showEditModal, setshowEditModal] = useState(false);
  const fetchData = async (type='i') => {
    console.log('phonetic_name',phonetic_name,'type',type)
    if (user){
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_HOST}getPhoneticExamples.php?phonetic_name=${phonetic_name}&type=${type}`
      );
      SetPhoneticsExamples(response);
      console.log('PhoneticsExamples',response);
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
  const successMsgAlert = () => {
    Swal.fire('Phonetics Example added')
  };
  const successEditExMsgAlert = () => {
    Swal.fire('Phonetics Example Updated')
  };
  
//open and close Edit Example model
const handleEditModalShow = () =>  setshowEditModal(true);
const handleEditModalClose = () => {
  setshowEditModal(false);
  setimageError(false)
  setwordError(false)
  setwordExitError(false)
  setEditExampleword("")
  setEditExampleimage()
}
// #Open and close Add Example model
const handleClose = () => {
  setshow(false);
  setimageError(false)
  setwordError(false)
  setwordExitError(false)
  setword("")
  setimage()
}
const handleShow = () => setshow(true);
const handleDeleteExample=(id)=>{
  console.log('ExampleID',id)
  console.log('letterId',id)
  const uploadData = new FormData();
  uploadData.append("example_id", id)
  axios
  .post( `${REACT_APP_HOST}deleteExample.php`, uploadData)
  .then((res) => {
  console.log(res);
  if (res.data=='delete'){
    fetchData();
  } 
})
  .catch((error) => console.log(error));
}
const getExamplesDetails = (example,image,id) =>{
 setCurrentExample(example)
 setCurrentImage(image)
 setEid(id)
 
} 
  const handleActiveClass = (i) => {
    setIsActive(i);
    console.log('IsActive',isActive)
    
  }
  const handletype = (type) => {
    setType(type);
    console.log('from handletype',Type)

  }
  const types = ['i', 'm', 'f'];
  function checkType(type) {
    if (type=='i'){
        return (
            <>
            <span style={{paddingRight:'5px',fontWeight:'bolder'}}>&#8212;</span>
            <span>{phonetic_name}</span>
            </> 
        )
    } 
    if (type=='m'){
        return (
            <>
            <span style={{paddingRight:'5px',fontWeight:'bolder'}}>&#8212;</span>
            <span>{phonetic_name}</span>
            <span style={{paddingLeft:'5px',fontWeight:'bolder'}}>&#8212;</span>
            </>
        )
    } 
    if (type=='f'){
        return (
            <>
            <span>{phonetic_name}</span>
            <span style={{paddingLeft:'5px',fontWeight:'bolder'}}>&#8212;</span>
            </>
        )
    } 
  }
  const typeList = types.map((type, i) => {   
    return(
        <>
         <div className="col-md-2">
            <button style={{marginBottom:'20px'}}
                key={i}
                onClick={()=> {fetchData(type);handleActiveClass(i);handletype(type)}}
                className={isActive == i ? 'activeBtn button-50' : 'button-50'} 
                role="button"
            >
             {checkType(type)}
            </button>
            </div>
        </>
    )
  });
    //  form Edit validation
    const Editvalidate = () => {
      if (EditExampleword == "") {
          setwordError(true)
      } else {
          setwordError(false)
      }
      if (!EditExampleimage) {
          setimageError(true)
      } else {
          setimageError(false)
      }
  
      if (EditExampleword==""||!EditExampleimage) {
          return false;
      } else {
          return true;
      }
      };
        //  form validation
    const validate = () => {
      if (word == "") {
          setwordError(true)
      } else {
          setwordError(false)
      }
      if (!image) {
          setimageError(true)
      } else {
          setimageError(false)
      }
  
      if (word==""||!image) {
          return false;
      } else {
          return true;
      }
      };
  const handleSubmit = (e) => {
    // let Type = handletype();
    // console.log('type from handle submit',Type)
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
    const uploadData = new FormData();
    uploadData.append("phonetic_name", phonetic_name)
    uploadData.append("word", word)
    uploadData.append("type", Type)
    uploadData.append("image", image, image.name);
    axios
        .post( `${REACT_APP_HOST}addExample2.php`, uploadData)
        .then((res) => {
        console.log(res);
        if (res.data=='file'){
          setFileError(true);
        }
        if (res.data == 'word'){
          setwordExitError(true);
          
        }
        if (res.data>0){
          handleClose()
          successMsgAlert();
          fetchData();
          
        }      
    })
        .catch((error) => console.log(error));
    }};
    const handleEditExampleSubmit = (e) => {
      // let Type = handletype();
      // console.log('type from handle submit',Type)
      e.preventDefault();
      const isValid = Editvalidate();
      if (isValid) {
      const uploadData = new FormData();
      uploadData.append("id",Eid)
      console.log(Eid,Eid)
      uploadData.append("phonetic_name", phonetic_name)
      uploadData.append("word", EditExampleword)
      uploadData.append("image",EditExampleimage,EditExampleimage.name);
      axios
          .post( `${REACT_APP_HOST}EditExample.php`, uploadData)
          .then((res) => {
          console.log(res);
          if (res.data == -1){
            setwordExitError(true);
            
          }
          if (res.data>0){
            handleEditModalClose()
            successEditExMsgAlert();
            fetchData();
          }      
      })
          .catch((error) => console.log(error));
      }};
  const PhoneticsExamplesList =()=>{
    let phoneticssExampleLength = PhoneticsExamples.length
    console.log('phoneticssExampleLength',phoneticssExampleLength)
    if (phoneticssExampleLength >0){
       return(
        PhoneticsExamples.map((example, i) => 
        <div className="col-md-4">
        <div className="boxContainer" style={{height:'85px'}}>
            <div className="boxlayout">
                  <img
                  className="img-responsive quiz1-img"
                  src={REACT_APP_IMAGE_PATH+'backend'+example.image} 
                  alt="#"
              />
              <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}>{example.word}</span>
              <button className="letterExample" style={{float:'right'}} onClick={()=>handleDeleteExample(example.id)}>
                <img src="http://localhost:3000/images/icons/delete.png"/>
             </button>
              <button className="letterExample" style={{float:'right'}} 
                onClick={() => {
                  handleEditModalShow();
                  getExamplesDetails(example.word,example.image,example.id);
            
                }}
            >
                <img src="http://localhost:3000/images/icons/edit-image.png"/>
             </button>
            </div>
        </div>
        </div>

        // <div className="col-md-6">
        // <div className="row">
        // <div className="col-md-4">
        //   <div className="row boxContainer">
        //     <div className="col">
        //     <img
        //         className="img-responsive"
        //         src={REACT_APP_IMAGE_PATH+'phonetics_app'+example.image} 
        //         alt="#"
        //     />
        //     </div>
        //     <div className="col">
        //     <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {example.word}</span>
        //     </div>
        //     <div className="col">
        //       <button className="letterExample" onClick={()=>handleDeleteExample(example.id)}>
        //         <img src="http://localhost:3000/images/icons/delete.png"/>
        //         </button>
        //     </div>
        //   </div>
        //     {/* <div className="boxContainer">
        //         <div className="boxlayout">
        //               <img
        //               className="img-responsive quiz1-img"
        //               src={REACT_APP_IMAGE_PATH+'phonetics_app'+example.image} 
        //               alt="#"
        //           />
        //          <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {example.word}</span>
        //          <button className="letterExample" onClick={()=>handleDeleteExample(example.id)}>
        //         <img src="http://localhost:3000/images/icons/delete.png"/>
        //         </button>
        //         </div>
        //     </div> */}
        // </div>
        //   {/* <div className="col">
        //   <div className="boxlayout">
        //     <div>
        //         <img
        //         className="img-responsive"
        //         src={REACT_APP_IMAGE_PATH+'phonetics_app'+example.image} 
        //         alt="#"
        //       />
        //      <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {example.word}</span>

        //     </div>
        // </div>
        //   </div>
        //   <div className="col">
        //   <div  className="boxlayout">
        //   <button className="letterExample" onClick={()=>handleDeleteExample(example.id)}>
        //         <img src="http://localhost:3000/images/icons/delete.png"/>
        //     </button>
        // </div>
        //   </div> */}
        // </div>
        // </div>
    )
    )  
    }else{
      return(<p>No Examples</p>)
    }
  }
  const alertwordError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordError(false)} show={wordError} delay={3000} autohide>
            <Toast.Body>Example word can not be empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertimageError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setimageError(false)} show={imageError} delay={3000} autohide>
            <Toast.Body>Example image can not be empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertExitwordError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordExitError(false)} show={wordExitError} delay={3000} autohide>
            <Toast.Body>Example word Already Exit!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertFileError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setFileError(false)} show={FileError} delay={3000} autohide>
            <Toast.Body>Phonetics image Already Exit!</Toast.Body>
          </Toast>
      </div>
    );
  }
  return (
    <>
    <NavBar/>
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title page_title">
          <div className="col-6">
              <h2>Phonetics Examples for Letter {phonetic_name}</h2>
          </div>
          <div className="col-6 d-flex justify-content-end">
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
            <span style={{paddingLeft:'5px'}}>Add Example</span>
            </Button>
        </div>
        </div>
        <div className="row column1">
          {typeList}
        </div>
        <div className="row column1">{PhoneticsExamplesList()}</div>
     {/* <!-- Add Example modal --> */}
     <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Add Example </h6>
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
                  <i className="fab fa-wordpress-simple"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setword(evt.target.value)}
                placeholder="Add Word" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
              {wordError ? (
                alertwordError()
              ) : null}
               {wordExitError ? (
                alertExitwordError()
              ) : null}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i class="fas fa-images"></i></span>
                </div>
                <input type="file"  className="form-control" onChange={(evt) => setimage(evt.target.files[0])}
                placeholder="Add Word" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
             
              {imageError ? (
                alertimageError()
              ) : null}
              {FileError ? (
                alertFileError()
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
                  Save Example
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      {/* <!-- Edit Example modal --> */}
     <div className="row">
        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Edit Example </h6>
            </Modal.Title>
            <button onClick={handleEditModalClose}type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditExampleSubmit}  encType="multipart/form-data">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fab fa-wordpress-simple"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setEditExampleword(evt.target.value)}
                placeholder={CurrentExample} aria-label="word" aria-describedby="basic-addon1"/>
              </div>
              {wordError ? (
                alertwordError()
              ) : null}
               {wordExitError ? (
                alertExitwordError()
              ) : null}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  {/* <i class="fas fa-images"></i></span> */}
                  <img style={{width:'30px',height:'30px',objectFit:'cover'}}src={REACT_APP_IMAGE_PATH+'phonetics_app'+CurrentImage} />
                  </span>
                </div>
                <input type="file"  className="form-control" onChange={(evt) => setEditExampleimage(evt.target.files[0])}
                placeholder="Add Word" aria-label="word" aria-describedby="basic-addon1"/>
              </div>
             
              {imageError ? (
                alertimageError()
              ) : null}
              {FileError ? (
                alertFileError()
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
                  Edit Example
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      </div>
    </div>
    </>
  );
}
export default PhoneticsSamples;
