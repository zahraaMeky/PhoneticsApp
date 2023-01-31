import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate,Navigate,useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';
import Swal from "sweetalert2";
import NavBar from "./NavBar";
function QuizOnePhonetics () {
  const navigate = useNavigate();
  const { REACT_APP_HOST,REACT_APP_IMAGE_PATH } = process.env;
  const [show, setshow] = useState(false);
  const [FileError, setFileError] = useState(false);
  const [EditQuizshow, setEditQuizshow] = useState(false);
  const [wordExitError, setwordExitError] = useState(false);
  const [imageemptyError, setimageemptyError] = useState(false);
  const [wordError, setwordError] = useState(false);
  const [word1, setword1] = useState("");
  const [CurrentImage, setCurrentImage] = useState("");
  const [wCount, setwCount] = useState("");
  const [Wid, setWid] = useState("")
  const [Qid, setQid] = useState("");
  const [word2, setword2] = useState("");
  const [Editword, setEditword] = useState("");
  const [Editimage, setEditimage] = useState("");
  const [CurrentWord, setCurrentWord] = useState("");
  const [word3, setword3] = useState("");
  const [image1, setimage1] = useState();
  const [image2, setimage2] = useState();
  const [image3, setimage3] = useState();
  const [imageError, setimageError] = useState(false);
  const { phonetic_name } = useParams();
  const user = localStorage.getItem('username');
  console.log('phonetic_name',phonetic_name)
  const [PhoneticsQuizOne, SetPhoneticsQuizOne] = useState([]);
  const fetchData = async () => {
    if (user){
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_HOST}getQuiz-1.php?name=${phonetic_name}`
      );
      SetPhoneticsQuizOne(response);
      console.log('PhoneticsQuizOne',response);
    } catch (error) {
      console.error(error.message);
    }
  }else{
    navigate('/login');
  }
  };
// #Open and close model
const handleClose = () => {
  setshow(false);
  setwordError(false);
  setimageemptyError(false);
  setword1("")
  setword2("")
  setword3("")
  setimage1("")
  setimage2("")
  setimage3("")
}
const handleShow = () => setshow(true);

const handleEditQuizShow = () => {
  setEditQuizshow(true);
}
const handleEditQuizClose = () => {
  setEditQuizshow(false);
  setwordError(false);
  setimageemptyError(false);
  setEditimage(false);
  setEditword(false);
}
const successMsgAlert = () => {
  Swal.fire('Phonetics Quiz 1 added')
};
const successQEditMsgAlert = () => {
  Swal.fire('Phonetics Quiz 1 Updated')
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
  const alertImageEmptyError = () =>  {
    return (
      <div className="row d-flex justify-content-center">
          <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setimageemptyError(false)} show={imageemptyError} delay={3000} autohide>
            <Toast.Body>Quiz Image can not be empty!</Toast.Body>
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
  //  form Add Quiz validation
  const validate = () => {
     if (word1 == "" ||word2==""||word3=="") {
        setwordError(true)
       
    } else {
        setwordError(false)
      
    }
    console.log('wordError',wordError)
  
    if (!image1||!image2||!image3) {
        setimageemptyError(true)
       
    } else {
        setimageemptyError(false)
       
    }
    console.log('imageError',imageError)
    if (word1==""||word2==""||word3==""||!image1||!image2||!image3) {
        return false;
    } else {
        return true;
    }
    
    }
  //  form Edit Quiz validation
  const Editvalidate = () => {
    if (Editword == "" ) {
       setwordError(true)    
   } else {
       setwordError(false)
   } 
   if (!Editimage) {
       setimageemptyError(true)
      
   } else {
       setimageemptyError(false)
      
   }
   if (Editword==""||!Editimage) {
       return false;
   } else {
       return true;
   }
   
   }
const handleDeleteQuiz1=(id,word,j)=>{
  console.log('QuizID',id)
  console.log('word',word)
  const uploadData = new FormData();
  uploadData.append("Quiz_id", id)
  uploadData.append("word", word)
  uploadData.append("wordCount", j)
  console.log(j)
  axios
  .post( `${REACT_APP_HOST}deleteQuiz1.php`, uploadData)
  .then((res) => {
  console.log('res.data',res.data);
  if (res.data=='updated'){
    fetchData();
  } 
})
  .catch((error) => console.log(error));
}
const getQuiz1Details  = (word,image,qid,j,wid) =>{
  setCurrentWord(word)
  setCurrentImage(image)
  setQid(qid)
  setwCount(j)
  setWid(wid)
  console.log('setCurrentWord',word)
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
  uploadData.append("image1", image1, image1.name);
  uploadData.append("image2", image2, image2.name);
  uploadData.append("image3", image3, image3.name);
  let items = '[{"order": "1", "word":"' + word1 + '","image":"image1"},{"order": "2", "word":"' + word2 + '","image":"image2"},{"order": "3", "word":"'+word3+'","image":"image3"}]'
  console.log('items',items)
  uploadData.append("items", items)
  axios
      .post( `${REACT_APP_HOST}AddQuiz1_1.php`, uploadData)
      .then((res) => {
      console.log(res);
      let respo =res.data;
        console.log('respo',respo,typeof(respo))
        // let word = 'file';
        // if (typeof respo === "string") {
        //     if (respo.includes(word)){
        //         setimageError(true);
        //       }
        // }
      if (respo == 0){
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
  const handleAllDeleteQuiz1=(id)=>{
    const uploadData = new FormData();
    uploadData.append("Quiz_id", id)
    axios
    .post( `${REACT_APP_HOST}deleteAllQuiz1.php`, uploadData)
    .then((res) => {
    console.log('res.data',res.data);
    if (res.data==1){
      fetchData();
    } 
  })
    .catch((error) => console.log(error));
  }
  
  const PhoneticsQuizOneList = PhoneticsQuizOne.map((quiz, i) => {
    return (
      <div  className='phdiiv'>
        <div className="badge badge-light num">{i+1}</div>
        <div  className="row column1" style={{border:'1px solid #15283c',
        paddingTop:'15px',paddingLeft:'15px',paddingRight:'15px',marginBottom:'20px'}}>
          
            {quiz.data.map((q,j) => 
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
                      getQuiz1Details(q.correct_word,q.image_url,q.quiz_id,j,q.id);
                    }}>
                        <img src="http://localhost:3000/images/icons/edit-image.png"/>
                    </button>
                    <button className="letterExampl" style={{float:'right',border:'none'}}
                      onClick={()=>handleDeleteQuiz1(q.quiz_id,q.correct_word,j)}
                    >
                        <img src="http://localhost:3000/images/icons/delete.png"/>
                    </button>
                  </div>
              </div>
              </div>
            )}
           
        </div>
        <div className="delAllquiz">
              <button className="letterExampl" style={{border:'none'}}
                onClick={()=>handleAllDeleteQuiz1(quiz.id)}>
              <img src="http://localhost:3000/images/icons/delete.png"/>
              </button>
        </div>
      </div> 
    )
});
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
      .post( `${REACT_APP_HOST}EditQuiz1.php`, uploadData)
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

  return (
    <>
    <NavBar/>
      <div className="midde_cont">
        <div className="container-fluid">
        <div className="row column_title page_title">
            <div className="col-6">
                <h2>Phonetics Quiz One for Letter {phonetic_name}</h2>
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
              <span style={{paddingLeft:'5px'}}>Add Quiz One</span>
              </Button>
          </div>
          </div>
            {PhoneticsQuizOneList}
          <div className="row">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>
                <h6>Add Quiz One </h6>
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
                  <input type="file"  className="form-control" onChange={(evt) =>
                   setimage1(evt.target.files[0])}/>
                  <input type="file"  className="form-control"
                   onChange={(evt) => setimage2(evt.target.files[0])}/>
                  <input type="file"  className="form-control" 
                  onChange={(evt) => setimage3(evt.target.files[0])}/>
                </div>
                {imageemptyError ? (
                  alertImageEmptyError()
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
                    Save Quiz One
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
                {imageemptyError ? (
                  alertImageEmptyError()
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
                    Edit Quiz One
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
export default QuizOnePhonetics;
