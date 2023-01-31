import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate,Navigate,useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';
import Swal from "sweetalert2";
import NavBar from "./NavBar";
function QuizthreePhonetics() {
  const navigate = useNavigate();
  const user = localStorage.getItem('username');
  const { REACT_APP_HOST,REACT_APP_IMAGE_PATH } = process.env;
  const [show, setshow] = useState(false);
  const [FileError, setFileError] = useState(false);
  const [wordExitError, setwordExitError] = useState(false);
  const [imageError, setimageError] = useState(false);
  const [CurrentWord, setCurrentWord] = useState("");
  const [CurrentImage, setCurrentImage] = useState("");
  const [Editword, setEditword] = useState("");
  const [Editimage, setEditimage] = useState("");
  const [Wid, setWid] = useState("")
  const [Qid, setQid] = useState("");
  const [wCount, setwCount] = useState("");
  const [wordError, setwordError] = useState(false);
  const [word1, setword1] = useState("");
  const [word2, setword2] = useState("");
  const [word3, setword3] = useState("");
  const [EditQuizshow, setEditQuizshow] = useState(false);
  // const [voice1, setvoice1] = useState();
  // const [voice2, setvoice2] = useState();
  // const [voice3, setvoice3] = useState();
  const [image1, setimage1] = useState();
  const [image2, setimage2] = useState();
  const [image3, setimage3] = useState();
  const [voiceError, setvoiceError] = useState(false);
  const { phonetic_name } = useParams();
  console.log('phonetic_name',phonetic_name)
  const [PhoneticsQuizThree, SetPhoneticsQuizThree] = useState([]);
  const fetchData = async () => {
    if (user){
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_HOST}getQuiz3.php?name=${phonetic_name}`
      );
      SetPhoneticsQuizThree(response);
      console.log('PhoneticsQuizOne',response);
    } catch (error) {
      console.error(error.message);
    }
  }else{
    navigate('/login');
  }
  };
  const successQEditMsgAlert = () => {
    Swal.fire('Phonetics Quiz 3 Updated')
  };
// #Open and close model
const handleClose = () => {
  setshow(false);
  setwordError(false)
  setimageError(false);
  setimage1("")
  setimage2("")
  setimage3("")
  setword1("")
  setword2("")
  setword3("")
}
const handleEditQuizShow = () => {
  setEditQuizshow(true);
  setwordError(false)
  setimageError(false)
  setEditimage("")
  setEditword("")
}
const handleEditQuizClose = () => {
  setEditQuizshow(false);
}
const getQuiz3Details  = (word,image,qid,j,wid) =>{
  setCurrentWord(word)
  setCurrentImage(image)
  setQid(qid)
  setwCount(j)
  setWid(wid)
  console.log('getQuiz3Details',word,image,qid,j,wid)
}
const handleShow = () => setshow(true);
const successMsgAlert = () => {
  Swal.fire('Phonetics Quiz 3 added')
};

  useEffect(() => {
    fetchData();
  }, []);
  const alertwordError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordError(false)} show={wordError} delay={3000} autohide>
            <Toast.Body>Quiz word can not be empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertExitwordError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordExitError(false)} show={wordExitError} delay={3000} autohide>
            <Toast.Body>Quiz word Already Exit!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertvoiceError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setvoiceError(false)} show={voiceError} delay={3000} autohide>
            <Toast.Body>Quiz  voice can not be empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertFileError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setFileError(false)} show={FileError} delay={3000} autohide>
            <Toast.Body>Quiz Voice Already Exit!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertImageError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setimageError(false)} show={imageError} delay={3000} autohide>
            <Toast.Body>Quiz Image can not be empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  //  form validation
  const validate = () => {
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
    if (word1==""||word2==""||word3==""||!image1||!image2||!image3) {
        return false;
    } else {
        return true;
    }
    
    }
    const Editvalidate = () => {
      if (Editword == "" ) {
         setwordError(true)    
     } else {
         setwordError(false)
     } 
     if (!Editimage) {
         setimageError(true)
        
     } else {
         setimageError(false)
        
     }
     if (Editword==""||!Editimage) {
         return false;
     } else {
         return true;
     }
     
     }
const handleDeleteQuiz3=(id,word,j)=>{
    console.log('QuizID',id)
    console.log('word',word)
    const uploadData = new FormData();
    uploadData.append("Quiz_id", id)
    uploadData.append("word", word)
    uploadData.append("wordCount", j)
    console.log(j)
    axios
    .post( `${REACT_APP_HOST}deleteQuiz3.php`, uploadData)
    .then((res) => {
    console.log('res.data',res.data);
    if (res.data=='updated'){
      fetchData();
    } 
  })
    .catch((error) => console.log(error));
  }
const handleSubmit = (e) => {
  e.preventDefault();
  const isValid = validate();
  console.log('isValid',isValid)
  console.log('before submit')
  if (isValid) {
  console.log('after submit')
  const uploadData = new FormData();
  uploadData.append("phonetic_name", phonetic_name)
  console.log('phonetic_name from post',phonetic_name)
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
      .post( `${REACT_APP_HOST}AddQuiz3_1.php`, uploadData)
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
        fetchData();
        
      }

  })
      .catch((error) => console.log(error));
  }};
  const handleQEditSubmit=(e)=>{
    e.preventDefault();
    const isValid = Editvalidate();
    console.log('before submit')
    if (isValid) {
    console.log('after submit')
    const uploadData = new FormData();
    uploadData.append("phonetic_name", phonetic_name)
    uploadData.append("qid", Qid)
    uploadData.append("word", Editword);
    uploadData.append("image",Editimage,Editimage.name);
    uploadData.append("wid",Wid);
    uploadData.append("wCount",wCount);
    axios
        .post( `${REACT_APP_HOST}EditQuiz3.php`, uploadData)
        .then((res) => {
        console.log(res);
        let respo =res.data;
          console.log('respo',respo,typeof(respo))
        if (respo == -1){
          setwordExitError(true);
        }
        if (respo>0){
          handleEditQuizClose();
          successQEditMsgAlert();
          fetchData();
          
        }
  
    })
        .catch((error) => console.log(error));
  }};
  const PhoneticsQuizthreeList = PhoneticsQuizThree.map((quiz, i) => {
    return ( 
            <>
                {quiz.data.map((q,j)=> 
                  <div className="col-md-4">
                  <div className="boxContainer" style={{height:'85px'}}>
                      <div className="boxlayout">
                            <img
                            className="img-responsive quiz1-img"
                            src={REACT_APP_IMAGE_PATH +'/backend'+q.image_url}
                            alt="#"
                        />
                        <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {q.correct_word}</span>
                        <button className="letterExampl" style={{float:'right',border:'none'}}
                         onClick={() => {
                          handleEditQuizShow();
                          getQuiz3Details(q.correct_word,q.image_url,q.quiz_id,j,q.id);
                        }}>
                            <img src="http://localhost:3000/images/icons/edit-image.png"/>
                        </button>
                        <button className="letterExampl" style={{float:'right',border:'none'}}onClick={()=>handleDeleteQuiz3(q.quiz_id,q.correct_word,j)}>
                            <img src="http://localhost:3000/images/icons/delete.png"/>
                        </button>
                      </div>
                  </div>
                  </div>
                  // <div className="col-md-4">
                  // <div className="boxContainer">
                  //     <div className="boxlayout">
                  //           <img
                  //           className="img-responsive quiz1-img"
                  //           src={'http://147.182.181.209/phonetics_app'+q.image_url}
                  //           alt="#"
                  //       />
                  //       <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {q.correct_word}</span>
                  //       <button className="letterExampl" style={{float:'right',border:'none'}} onClick={()=>handleDeleteQuiz3(q.quiz_id,q.correct_word,j)}>
                  //           <img src="http://localhost:3000/images/icons/delete.png"/>
                  //       </button>
                  //     </div>
                  //  <div className="boxlayout">
                  //     <audio key={quiz.id}  controls className="Play">
                  //       <source src={'http://147.182.181.209/phonetics_app'+q.voice_url}  type="audio/mp3"></source>
                  //     </audio>
               
                  //  </div>
                  // </div>
                  // </div>
                )}
            </>
    )
});

  return (
    <>
    <NavBar/>
      <div className="midde_cont">
        <div className="container-fluid">
        <div className="row column_title page_title">
            <div className="col-6">
                <h2>Phonetics Quiz Three for Letter {phonetic_name}</h2>
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
              <span style={{paddingLeft:'5px'}}>Add Quiz Three</span>
              </Button>
          </div>
          </div>
        
          <div className="row column1">{PhoneticsQuizthreeList}</div>
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
          <div className="row">
          <Modal show={EditQuizshow} onHide={handleEditQuizClose}>
            <Modal.Header>
              <Modal.Title>
                <h6>Edit Quiz One </h6>
              </Modal.Title>
              <button onClick={handleEditQuizClose}type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleQEditSubmit}  encType="multipart/form-data">
              
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                    <i  className="fab fa-wordpress-simple"></i></span>
                  </div>
                  <input type="text" className="form-control" onChange={(evt) => setEditword(evt.target.value)}
                  placeholder={CurrentWord} aria-label="word1" aria-describedby="basic-addon1"/>
                  
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
                    <img style={{width:'30px',height:'30px',objectFit:'cover'}}src={REACT_APP_IMAGE_PATH+'backend'+CurrentImage}/> 
                    </span>
                  </div>
                  <input type="file"  className="form-control" onChange={(evt) =>
                   setEditimage(evt.target.files[0])}/>
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
                    Edit Quiz Three
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
export default QuizthreePhonetics;
