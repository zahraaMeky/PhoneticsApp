import React, { useState, useEffect, useRef} from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import LettersSelectOption from "./LettersSelectOption";
import Toast from 'react-bootstrap/Toast';
import Swal from "sweetalert2";
function AddQuizThree() {
const { REACT_APP_HOST } = process.env;
const [show, setshow] = useState(false);
const [word1, setword1] = useState("");
const [word2, setword2] = useState("");
const [word3, setword3] = useState("");
const [wordError, setwordError] = useState(false);
const [letter, setletter] = useState("");
const [letterError, setletterError] = useState(false);
const [FileError, setFileError] = useState(false);
const [wordExitError, setwordExitError] = useState(false);
const [imageError, setimageError] = useState(false);
// const [voice1, setvoice1] = useState();
// const [voice2, setvoice2] = useState();
// const [voice3, setvoice3] = useState();
const [image1, setimage1] = useState();
const [image2, setimage2] = useState();
const [image3, setimage3] = useState();
// const [voiceError, setvoiceError] = useState(false);

// #Open and close model
  const handleClose = () => setshow(false);
  const handleShow = () => setshow(true);
  const successMsgAlert = () => {
    Swal.fire('Phonetics Quiz 3 added')
  };

    //  form validation
    const validate = () => {
    if (letter == "") {
        setletterError(true)
        
    } else {
        setletterError(false)
       
    }
    console.log('letterError',letterError)
    if (word1 == "" ||word2==""||word3=="") {
        setwordError(true)
       
    } else {
        setwordError(false)
      
    }
    console.log('wordError',wordError)
    // if (!voice1||!voice2||!voice3) {
    //     setvoiceError(true)
        
    // } else {
    //     setvoiceError(false)
       
    // }
    // console.log('voiceError',voiceError)
    if (!image1||!image2||!image3) {
        setimageError(true)
       
    } else {
        setimageError(false)
       
    }
    console.log('imageError',imageError)
    if (letter == "" ||word1==""||word2==""||word3==""||!image1||!image2||!image3) {
        return false;
    } else {
        return true;
    }
    
    }
    console.log(letter,word1,word2,word3)

const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    console.log('isValid',isValid)
    console.log('before submit')
    if (isValid) {
    console.log('after submit')
    const uploadData = new FormData();
    uploadData.append("phonetic_id", letter)
    // uploadData.append("voice1", voice1, voice1.name);
    // uploadData.append("voice2", voice2, voice2.name);
    // uploadData.append("voice3", voice3, voice3.name);
    uploadData.append("image1", image1, image1.name);
    uploadData.append("image2", image2, image2.name);
    uploadData.append("image3", image3, image3.name);
    let items = '[{"order": "1", "word":"' + word1 + '","image":"image1"},{"order": "2", "word":"' + word2 + '","image":"image2"},{"order": "3", "word":"'+word3+'","image":"image3"}]'
    console.log('items',items)
    uploadData.append("items", items)
    axios
        .post( `${REACT_APP_HOST}addQuiz3.php`, uploadData)
        .then((res) => {
        console.log(res);
        let respo =res.data;
        console.log('respo',respo,typeof(respo))
        let word = 'file';
        // if (typeof respo === "string") {
        //     if (respo.includes(word)){
        //         setFileError(true);
        //       }
        // }
       
        if (respo == 'word'){
          setwordExitError(true);
          
        }
        if (respo>0){
          handleClose();
          successMsgAlert();
          
        }
 
    })
        .catch((error) => console.log(error));
    }};
    // const alertFileError = () =>  {
    //   return (
    //     <div className="row d-flex justify-content-center">
    //         <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setFileError(false)} show={FileError} delay={3000} autohide>
    //           <Toast.Body>Phonetics Voice Already Exit!</Toast.Body>
    //         </Toast>
    //     </div>
    //   );
    // }
    const alertImageError = () =>  {
        return (
          <div className="row d-flex justify-content-center">
              <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setimageError(false)} show={imageError} delay={3000} autohide>
                <Toast.Body>Phonetics Image can not be empty!</Toast.Body>
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
      // const alertvoiceError = () =>  {
      //   return (
      //     <div className="row d-flex justify-content-center">
      //         <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setvoiceError(false)} show={voiceError} delay={3000} autohide>
      //           <Toast.Body>Phonetics voice can not be empty!</Toast.Body>
      //         </Toast>
      //     </div>
      //   );
      // }
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
            <span style={{paddingLeft:'5px'}}>Add Quiz Three</span>
            </Button>
        </div>
        <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Add Quiz Three </h6>
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
                 className="custom-select"
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
                  <i  className="fab fa-wordpress-simple"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setword1(evt.target.value)}
                placeholder="Add Word One" aria-label="word1" aria-describedby="basic-addon1"/>
                <input type="text" className="form-control" onChange={(evt) => setword2(evt.target.value)}
                placeholder="Add Word Two" aria-label="word2" aria-describedby="basic-addon1"/>
                <input type="text" className="form-control" onChange={(evt) => setword3(evt.target.value)}
                placeholder="Add Word Three" aria-label="word3" aria-describedby="basic-addon1"/>
              </div>
              {wordError ? (
                alertwordError()
              ) : null}
               {wordExitError ? (
                alertExitwordError()
              ) : null}
              {/* <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i  className="fas fa-volume"></i></span>
                </div>
                <input type="file"  className="form-control" onChange={(evt) => setvoice1(evt.target.files[0])}
                 aria-label="voice" aria-describedby="basic-addon1"/>
                <input type="file"  className="form-control" onChange={(evt) => setvoice2(evt.target.files[0])}
                 aria-label="voice" aria-describedby="basic-addon1"/>
                <input type="file"  className="form-control" onChange={(evt) => setvoice3(evt.target.files[0])}
                 aria-label="voice3"aria-describedby="basic-addon1"/>
              </div>
             
              {voiceError ? (
                alertvoiceError()
              ) : null}
              {FileError ? (
                alertFileError()
              ) : null} */}
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-images"></i></span>
                </div>
                <input type="file"  className="form-control" onChange={(evt) => setimage1(evt.target.files[0])}
                 aria-label="image" aria-describedby="basic-addon1"/>
                <input type="file"  className="form-control" onChange={(evt) => setimage2(evt.target.files[0])}
                aria-label="image" aria-describedby="basic-addon1"/>
                <input type="file"  className="form-control" onChange={(evt) => setimage3(evt.target.files[0])}
                 aria-label="image" aria-describedby="basic-addon1"/>
              </div>
              {imageError ? (
                alertImageError()
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
                  Save Quiz Three
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        </div>
        </>
      );
}

export default AddQuizThree;