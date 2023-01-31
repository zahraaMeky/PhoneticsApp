import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { Link,useNavigate,Navigate,useParams } from "react-router-dom";
import Toast from 'react-bootstrap/Toast';
import Swal from "sweetalert2";
import NavBar from "./NavBar";
function QuiztwoPhonetics() {
  const {REACT_APP_HOST,REACT_APP_IMAGE_PATH} = process.env;
  const { phonetic_name } = useParams();
  const [word, setword] = useState("");
  const [CurrentQuiz,setCurrentQuiz] = useState("");
  const [CurrentImage, setCurrentImage] = useState("");
  const [QEditimage, setQEditimage] = useState("");
  const [QEditword, setQEditword] = useState("");
  const [image, setimage] = useState();
  const [Qid, setQid] = useState("");
  const [Type, setType] = useState("i");
  const [FileError, setFileError] = useState(false);
  const [wordExitError, setwordExitError] = useState(false);
  const [isActive, setIsActive] = useState(0);
  const [wordError, setwordError] = useState(false);
  const [imageError, setimageError] = useState(false);
  const [show, setshow] = useState(false);
  const [EditQuizshow, setEditQuizshow] = useState(false);
  const user = localStorage.getItem('username');
  const [PhoneticsQuiztwo, SetPhoneticsQuiztwo] = useState([]);
  const navigate = useNavigate();
  const fetchData = async (type='i') => {
    console.log('phonetic_name',phonetic_name,'type',type)
    if (user){
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_HOST}getQuiz2.php?name=${phonetic_name}&type=${type}`
      );
      SetPhoneticsQuiztwo(response);
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
    Swal.fire('Phonetics Quiz added')
  };
  
  const successQuizEditMsgAlert = () => {
    Swal.fire('Phonetics Quiz Edit')
  };
// #Open and close Add Quiz2 model
const handleClose = () => {
  setshow(false);
  setwordError(false)
  setimageError(false)
  setword("")
  setimage("")
}
const handleShow = () => setshow(true);
// #Open and close Edit Quiz2 model
const handleEditQuiz2Close = () => {
  setEditQuizshow(false)
  setwordError(false)
  setimageError(false)
  setQEditimage("")
  setQEditword("")
};
const handleEditQuizShow = () =>   setEditQuizshow(true);

const getQuiz2Details = (quiz,image,id) =>{
  setCurrentQuiz(quiz)
  setCurrentImage(image)
  setQid(id)
  
} 
const handleDeleteQuiz2=(id)=>{
  console.log('QuizID',id)
  console.log('letterId',id)
  const uploadData = new FormData();
  uploadData.append("Quiz_id", id)
  axios
  .post( `${REACT_APP_HOST}deleteQuiz2.php`, uploadData)
  .then((res) => {
  console.log(res);
  if (res.data=='delete'){
    fetchData();
  } 
})
  .catch((error) => console.log(error));
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
     //  form validation
     const Editvalidate = () => {
      if (QEditword == "") {
          setwordError(true)
      } else {
          setwordError(false)
      }
      if (!QEditimage) {
          setimageError(true)
      } else {
          setimageError(false)
      }
  
      if (QEditword==""||!QEditimage) {
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
    uploadData.append("phonetic_name", phonetic_name)
    uploadData.append("word", word)
    uploadData.append("type", Type)
    uploadData.append("image", image, image.name);
    axios
        .post( `${REACT_APP_HOST}addQuiz2_2.php`, uploadData)
        .then((res) => {
        let respo =res.data;
          console.log('respo',respo,typeof(respo))
          let word = 'file';
          if (typeof respo === "string") {
              if (respo.includes(word)){
                  setFileError(true);
                }
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
  const handleEditQuizSubmit =(e)=>{
      e.preventDefault();
    const isValid = Editvalidate();
    if (isValid) {
    const uploadData = new FormData();
    uploadData.append("phonetic_name", phonetic_name)
    uploadData.append("word", QEditword)
    uploadData.append("image", QEditimage, QEditimage.name);
    uploadData.append("id", Qid);
    axios
        .post( `${REACT_APP_HOST}EditQuiz2.php`, uploadData)
        .then((res) => {
        if (res.data == -1){
          setwordExitError(true);
          
        }
        if (res.data>0){
          handleEditQuiz2Close()
          successQuizEditMsgAlert();
          fetchData();
          
        }      
    })
        .catch((error) => console.log(error));
    }};
    
    console.log('PhoneticsQuiztwo',PhoneticsQuiztwo);

    const PhoneticsQuiz2List =()=>{
      let phoneticssquiz2Length = PhoneticsQuiztwo.length
      console.log('phoneticssquiz2Length',phoneticssquiz2Length)
      console.log('PhoneticsQuiztwo.length',PhoneticsQuiztwo.length)
      if (PhoneticsQuiztwo.length >0){
         return(
          PhoneticsQuiztwo.map((quiz, i) => 
          <div className="col-md-4">
          <div className="boxContainer" style={{height:'85px'}}>
              <div className="boxlayout">
                    <img
                    className="img-responsive quiz1-img"
                    src={REACT_APP_IMAGE_PATH+'backend'+quiz.image} 
                    alt="#"
                />
                <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}>{quiz.word}</span>
                <button className="letterExample" style={{float:'right'}} onClick={()=>handleDeleteQuiz2(quiz.id)}>
                  <img src="http://localhost:3000/images/icons/delete.png"/>
                </button>
                <button className="letterExample" style={{float:'right'}} 
                  onClick={() => {
                    handleEditQuizShow();
                    getQuiz2Details(quiz.word,quiz.image,quiz.id);
              
                  }}
                >
                  <img src="http://localhost:3000/images/icons/edit-image.png"/>
                </button>
              </div>
          </div>
          </div>
          // <div className="col-md-6">
          // <div className="row">
          //   <div className="col">
          //   <div className="boxlayout">
          //     <div>
          //         <img
          //         className="img-responsive"
          //         src="http://localhost:3000/images/icons/scrabble.png"
          //         alt="#"
          //       />
          //      <span style={{fontSize:'16px',fontWeight:'500',color:'#15283c',paddingLeft:'5px'}}> {quiz.word}</span>
  
          //     </div>
          // </div>
          //   </div>
          //   <div className="col">
          //   <div  className="boxlayout">
          //   <audio key={quiz.id}  controls className="Play">
          //     <source src={'http://147.182.181.209/phonetics_app'+quiz.image}  type="audio/mp3"></source>
          //   </audio>
          //   </div>
          //   </div>
          //   <div className="col">
          //   <div  className="boxlayout">
           
          //   <button className="letterExample" onClick={()=>handleDeleteQuiz2(quiz.id)}>
          //         <img src="http://localhost:3000/images/icons/delete.png"/>
          //     </button>
          // </div>
          //   </div>
          // </div>
    
          // </div>
      )
      )  
      return(<p> Quiz</p>)
      }else{
        return(<p>No Quiz</p>)
      }
    } 


  const alertwordError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setwordError(false)} show={wordError} delay={3000} autohide>
            <Toast.Body>Quiz word can not be empty!</Toast.Body>
          </Toast>
      </div>
    );
  }
  const alertimageError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setimageError(false)} show={imageError} delay={3000} autohide>
            <Toast.Body>Quiz image can not be empty!</Toast.Body>
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
  const alertFileError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setFileError(false)} show={FileError} delay={3000} autohide>
            <Toast.Body>Quiz image Already Exit!</Toast.Body>
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
              <h2>Phonetics Quiz 2 for Letter {phonetic_name}</h2>
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
            <span style={{paddingLeft:'5px'}}>Add Quiz Two</span>
            </Button>
        </div>
        </div>
        <div className="row column1">
          {typeList}
        </div>
        <div className="row column1">{PhoneticsQuiz2List()}</div>
     {/* <!-- Add Quiz 2 modal --> */}
     <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Add Quiz 2</h6>
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
                  Save Quiz2
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
       {/* <!-- Edit Quiz 2 modal --> */}
     <div className="row">
        <Modal show={EditQuizshow} onHide={handleEditQuiz2Close}>
          <Modal.Header>
            <Modal.Title>
              <h6>Edit Quiz 2</h6>
            </Modal.Title>
            <button onClick={handleEditQuiz2Close}type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditQuizSubmit}  encType="multipart/form-data">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fab fa-wordpress-simple"></i></span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setQEditword(evt.target.value)}
                placeholder={CurrentQuiz} aria-label="word" aria-describedby="basic-addon1"/>
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
                  <img style={{width:'30px',height:'30px',objectFit:'cover'}}src={REACT_APP_IMAGE_PATH+'backend'+CurrentImage} />
                 </span>
                </div>
                <input type="file"  className="form-control" onChange={(evt) => setQEditimage(evt.target.files[0])}
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
                  Edit Quiz2
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
export default QuiztwoPhonetics;
