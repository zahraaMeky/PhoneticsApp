import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import LettersSelectOption from "./LettersSelectOption";
import Toast from 'react-bootstrap/Toast';
import Swal from "sweetalert2";
function AddQuiztwo() {
const { REACT_APP_HOST } = process.env;
const [show, setshow] = useState(false);
const [word, setword] = useState("");
const [wordError, setwordError] = useState(false);
const [letter, setletter] = useState("");
const [letterError, setletterError] = useState(false);
const [FileError, setFileError] = useState(false);
const [wordExitError, setwordExitError] = useState(false);
const [image, setimage] = useState();
const [imageError, setimageError] = useState(false);
const [type, settype] = useState("");
const types = ['initially', 'medially', 'finally'];
const [typeError, settypeError] = useState(false);
// #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  const successMsgAlert = () => {
    Swal.fire('Phonetics Quiz 2 added')
  };
  const typeList = types.map((type, i) => {   
    return(
        <>
         <option key={i} value={type}>
            {type}
        </option>
        </>
    )
  });
    //  form validation
    const validate = () => {
    if (letter == "") {
        setletterError(true)
        
    } else {
        setletterError(false)
       
    }
    console.log('letterError',letterError)
    if (type == "") {
      settypeError(true)
  } else {
      settypeError(false)
  }
    if (word == "") {
        setwordError(true)
       
    } else {
        setwordError(false)
      
    }
    console.log('wordError',wordError)
    if (!image) {
        setimageError(true)
        
    } else {
        setimageError(false)
       
    }
    console.log('imageError',imageError)
   
    if (letter == "" ||word==""||!image||type=="") {
        return false;
    } else {
        return true;
    }
    
    }

const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log('isValid',isValid)
    console.log('before submit')
    if (isValid) {
    console.log('after submit')
    const uploadData = new FormData();
    uploadData.append("phonetic_id", letter)
    uploadData.append("image", image, image.name);
    uploadData.append("word", word);
    uploadData.append("type", type);
    axios
        .post( `${REACT_APP_HOST}addQuiz2.php`, uploadData)
        .then((res) => {
        console.log(res);
        let respo =res.data;
        console.log('respo',respo,typeof(respo))
        let word = 'file';
        if (typeof respo === "string") {
            if (respo.includes(word)){
                setFileError(true);
              }
        }
        if (respo == 'word'){
          setwordExitError(true);
          
        }
        if (respo>0){
          handleClose()
          successMsgAlert()
          
        }
 
    })
        .catch((error) => console.log(error));
    }};
    const alertFileError = () =>  {
      return (
        <div className="row d-flex justify-content-center">
            <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setFileError(false)} show={FileError} delay={3000} autohide>
              <Toast.Body>Phonetics image Already Exit!</Toast.Body>
            </Toast>
        </div>
      );
    }
 
    const alertExitwordError = () =>  {
      return (
        <div className="row d-flex justify-content-center">
            <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordExitError(false)} show={wordExitError} delay={3000} autohide>
              <Toast.Body>Phonetics word Already Exit!</Toast.Body>
            </Toast>
        </div>
      );
    }
    const alertleterError = () =>  {
        return (
          <div className="row d-flex justify-content-center">
              <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setletterError(false)} show={letterError} delay={3000} autohide>
                <Toast.Body>Phonetics Name can not be empty!</Toast.Body>
              </Toast>
          </div>
        );
      }
  
      const alertwordError = () =>  {
        return (
          <div className="row d-flex justify-content-center">
              <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordError(false)} show={wordError} delay={3000} autohide>
                <Toast.Body>Phonetics word can not be empty!</Toast.Body>
              </Toast>
          </div>
        );
      }
      const alertimageError = () =>  {
        return (
          <div className="row d-flex justify-content-center">
              <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setimageError(false)} show={imageError} delay={3000} autohide>
                <Toast.Body>Phonetics image can not be empty!</Toast.Body>
              </Toast>
          </div>
        );
      }
      const alerttypeError = () =>  {
        return (
          <div className="row d-flex justify-content-center">
              <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => settypeError(false)} show={typeError} delay={3000} autohide>
                <Toast.Body>Phonetics Type can not be empty!</Toast.Body>
              </Toast>
          </div>
        );
      }
    return (
        <>
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
            <span style={{paddingLeft:'5px'}}>Add Quiz Two</span>
            </Button>
        </div>
        <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Add Quiz Two </h6>
            </Modal.Title>
            <button onClick={handleClose}type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}  encType="multipart/form-data">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1"><i className="fas fa-sort-alpha-down"></i></span>
                </div>
                <select
                onChange={(evt) => setletter(evt.target.value)}
                class="custom-select"
                name="letter"
                >
                <option selected>Select Phonetics ..</option>
               <LettersSelectOption/>
                </select>
            </div>
              {letterError ? (
                alertleterError()
              ) : null}
                <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i class="fas fa-text-width"></i></span>
                </div>
                <select
                onChange={(evt) => settype(evt.target.value)}
                class="custom-select"
                name="type"
                >
                <option selected>Select Phonetics Type..</option>
                  {typeList}
                </select>
            </div>
            {typeError ? (
                alerttypeError()
              ) : null}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i class="fab fa-wordpress-simple"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setword(evt.target.value)}
                placeholder="Add Word" aria-label="word1" aria-describedby="basic-addon1"/>
              
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
                  <i className="fas fa-images"></i></span>
                </div>
                <input type="file"  className="form-control" onChange={(evt) => setimage(evt.target.files[0])}
                 aria-label="image" aria-describedby="basic-addon1"/>
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
                  Save Quiz Two
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        </div>
        </>
      );
}

export default AddQuiztwo;