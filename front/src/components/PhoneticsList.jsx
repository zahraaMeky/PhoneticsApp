import React, { useState, useEffect } from "react";
import { Link,useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import Toast from 'react-bootstrap/Toast';
import NavBar from "./NavBar";
function PhoneticsList() {
  const { REACT_APP_HOST } = process.env;
  const navigate = useNavigate();
    // #Open and close model
    const handleClose = () => 
    {
      setshow(false);
      setEditflag(false)
      setname("")
      setphType("")
      setflashmsgshow(false)
      setletterError(false)
    }
    const handleShow = () => setshow(true);
    const handleEditModalClose = () => {
      setshowEditModal(false);
      setEditflag(false)
      setflashmsgshow(false)
      setletterError(false)
      setEditletter("")
      setEdittype("")
    }
  
    const handleEditModalShow = () => setshowEditModal(true);
    const [show, setshow] = useState(false);
    const [showEditModal, setshowEditModal] = useState(false);
    const [name, setname] = useState("");
    const [Editletter, setEditletter] = useState("");
    const [Edittype, setEdittype] = useState("");
    const [Pid, setPid] = useState("");
    const [pname, setpname] = useState("");
    const [pht, setpht] = useState("");
    const [flashmsgshow, setflashmsgshow] = useState(false);
    const [letterError, setletterError] = useState(false);
    const [affricates, Setaffricates] = useState([]);
    const [diphthongs, Setdiphthongs] = useState([]);
    const [fricatives, Setfricatives] = useState([]);
    const [glidings, Setglidings] = useState([]);
    const [leteral, Setleteral] = useState([]);
    const [long, Setlong] = useState([]);
    const [nasals, Setnasals] = useState([]);
    const [short, Setshort] = useState([]);
    const [stops, Setstops] = useState([]);
    const [phType, setphType] = useState("");
    const [Editflag, setEditflag] = useState("");
    const user = localStorage.getItem('username');
    const fetchData = async () => {
      if (user){
        try {
          const { data: response } = await axios.get(
            `${REACT_APP_HOST}getPhoneticsList.php`
          );
          Setaffricates(response.affricates);
          Setdiphthongs(response.diphthongs);
          Setfricatives(response.fricatives);
          Setglidings(response.glidings);
          Setleteral(response.leteral);
          Setlong(response.long);
          Setnasals(response.nasals);
          Setshort(response.short);
          Setstops(response.stops);
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
const getPhoneticsDetails = (id,name,type) =>{
      setPid(id)
      setpname(name)
      setpht(type)
      console.log('getPhoneticsDetails:Pid',Pid)
     
} 
const getPhoneticsType = (type) =>{
  console.log('getPhoneticsType :type',type)
  let phtypes = {
  '1':'fricatives',
  '2':'glidings',
  '3':'leteral',
  '4':'nasals',
  '5':'stops',
  '6':'short',
  '7':'long',
  '8':'diphthongs',
  '9':'affricates'
  }
  return (
    <>
    {Object.entries(phtypes).map(([key,value]) => (
        value == pht? (
          <option key={key} value={key} selected>{value}</option>
    ) : (
      <option key={key} value={key}>{value}</option>
    )
        
    ))}
     
    
    </>
  );

 
} 
const handleDeleteLetter =(id)=>{
  console.log('letterId',id)
  const uploadData = new FormData();
  uploadData.append("phonetic_id", id)
  axios
  .post( `${REACT_APP_HOST}deletePhonetic.php`, uploadData)
  .then((res) => {
  console.log(res);
  if (res.data==1){
    successDeleteMsgAlert()
    fetchData();
  } 
})
  .catch((error) => console.log(error));
}

const shortList = short.map((phonetic, i) => {
  return (
    <>
      <div className="col-md-3 col-sm-4">
        <Link key={phonetic.id} 
          to={`/phoneticssexample/${phonetic.name}`}
          className="button-50 button"
          role="button"
        >
          {phonetic.name}
        </Link>
        <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
            <img src="http://localhost:3000/images/icons/delete.png"/>
        </button>
        <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"short");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
        </button>
      </div>
      <div className="custom-margin"></div>
    </>
  );
});
const nasalsList = nasals.map((phonetic, i) => {
  return (
    <>
      <div className="col-md-3 col-sm-4">
        <Link key={phonetic.id} 
          to={`/phoneticssexample/${phonetic.name}`}
          className="button-50 button"
          role="button"
        >
          {phonetic.name}
        </Link>
        <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
            <img src="http://localhost:3000/images/icons/delete.png"/>
        </button>
        <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"nasals");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
        </button>
      </div>
      <div className="custom-margin"></div>
    </>
  );
});
const longList = long.map((phonetic, i) => {
  return (
    <>
      <div className="col-md-3 col-sm-4">
        <Link key={phonetic.id} 
          to={`/phoneticssexample/${phonetic.name}`}
          className="button-50 button"
          role="button"
        >
          {phonetic.name}
        </Link>
        <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
            <img src="http://localhost:3000/images/icons/delete.png"/>
        </button>
        <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"long");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
        </button>
      </div>
      <div className="custom-margin"></div>
    </>
  );
});
const leteralList = leteral.map((phonetic, i) => {
  return (
    <>
      <div className="col-md-3 col-sm-4">
        <Link key={phonetic.id} 
          to={`/phoneticssexample/${phonetic.name}`}
          className="button-50 button"
          role="button"
        >
          {phonetic.name}
        </Link>
        <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
            <img src="http://localhost:3000/images/icons/delete.png"/>
        </button>
        <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"leteral");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
        </button>
      </div>
      <div className="custom-margin"></div>
    </>
  );
});
const glidingsList = glidings.map((phonetic, i) => {
  return (
    <>
      <div className="col-md-3 col-sm-4">
        <Link key={phonetic.id} 
          to={`/phoneticssexample/${phonetic.name}`}
          className="button-50 button"
          role="button"
        >
          {phonetic.name}
        </Link>
        <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
            <img src="http://localhost:3000/images/icons/delete.png"/>
        </button>
        <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"glidings");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
        </button>
      </div>
      <div className="custom-margin"></div>
    </>
  );
});
const diphthongsList = diphthongs.map((phonetic, i) => {
  return (
    <>
      <div className="col-md-3 col-sm-4">
        <Link key={phonetic.id} 
          to={`/phoneticssexample/${phonetic.name}`}
          className="button-50 button"
          role="button"
        >
          {phonetic.name}
        </Link>
        <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
            <img src="http://localhost:3000/images/icons/delete.png"/>
        </button>
        <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"diphthongs");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
        </button>
      </div>
      <div className="custom-margin"></div>
    </>
  );
});
const fricativesList = fricatives.map((phonetic, i) => {
  return (
    <>
      <div className="col-md-3 col-sm-4">
        <Link key={phonetic.id} 
          to={`/phoneticssexample/${phonetic.name}`}
          className="button-50 button"
          role="button"
        >
          {phonetic.name}
        </Link>
        <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
            <img src="http://localhost:3000/images/icons/delete.png"/>
        </button>
        <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"fricatives");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
        </button>
      </div>
      <div className="custom-margin"></div>
    </>
  );
});
const stopsList = stops.map((phonetic, i) => {
  return (
    <>
      <div className="col-md-3 col-sm-4">
        <Link key={phonetic.id} 
          to={`/phoneticssexample/${phonetic.name}`}
          className="button-50 button"
          role="button"
        >
          {phonetic.name}
        </Link>
        <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
            <img src="http://localhost:3000/images/icons/delete.png"/>
        </button>
        <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"stops");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
        </button>
      </div>
      <div className="custom-margin"></div>
    </>
  );
});
    const affricatesList = affricates.map((phonetic, i) => {
      return (
        <>
          <div className="col-md-3 col-sm-4">
            <Link key={phonetic.id} 
              to={`/phoneticssexample/${phonetic.name}`}
              className="button-50 button"
              role="button"
            >
              {phonetic.name}
            </Link>
            <button className="letterDelete" onClick={()=>handleDeleteLetter(phonetic.id)}>
                <img src="http://localhost:3000/images/icons/delete.png"/>
            </button>
            <button style={{border:'none'}}className="letterEdit"
        onClick={() => {
          handleEditModalShow();
          getPhoneticsDetails(phonetic.id,phonetic.name,"affricates");
          getPhoneticsType()
        }} >
        <img src="http://localhost:3000/images/icons/edit-image.png"/>
            </button>
          </div>
          <div className="custom-margin"></div>
        </>
      );
    });
 
    const successMsgAlert = () => {
      Swal.fire('Phonetics Leter added')
    };
    const successEditMsgAlert = () => {
      Swal.fire('Phonetics Leter Edit')
    };
    const successDeleteMsgAlert = () => {
      Swal.fire('Phonetics Leter Deleted')
    };
     //  form validation
  const validate = () => {
    if (name == "") {
      setflashmsgshow(true)
    } else {
      setflashmsgshow(false)
    }
    if (phType == "") {
      setEditflag(true)
    } else {
      setEditflag(false)
    }
    if (name == ""||phType=="") {
      return false;
    } else {
      return true;
    }
  };
  const Editvalidate = () => {
    if (Editletter == "") {
      setflashmsgshow(true)
    } else {
      setflashmsgshow(false)
    }
    if (Edittype == "") {
      setEditflag(true)
    } else {
      setEditflag(false)
    }
    
    if (Edittype == ""||Editletter=="") {
      return false;
    } else {
      return true;
    }
  };

const alertError = () =>  {
  return (
    <div className="row d-flex justify-content-center">
        <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setflashmsgshow(false)} show={flashmsgshow} delay={3000} autohide>
          <Toast.Body>Phonetics Name can not be empty!</Toast.Body>
        </Toast>
    </div>
  );
}
const alerttypeError = () =>  {
  return (
    <div className="row d-flex justify-content-center">
        <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setEditflag(false)} show={Editflag} delay={3000} autohide>
          <Toast.Body>Phonetics Type can not be empty!</Toast.Body>
        </Toast>
    </div>
  );
}
const alertletterError = () =>  {
  return (
    <div className="row d-flex justify-content-center">
        <Toast style={{padding:' 0.375rem 0.75rem',width:'95%',textAlign:'Center'}}className="mb-3 alert alert-danger" onClose={() => setletterError(false)} show={letterError} delay={3000} autohide>
          <Toast.Body>Phonetics Name Exit !</Toast.Body>
        </Toast>
    </div>
  );
}
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
    const uploadData = new FormData();
    uploadData.append("name", name)
    uploadData.append("type", phType)
    axios
      .post( `${REACT_APP_HOST}addNewPhonetic.php`, uploadData)
      .then((res) => {
        console.log(res);
        if (res.data>0){
          console.log('insert into database')
          setflashmsgshow(false)
          setletterError(false)
          setEditflag(false)
          setletterError(false)
          setname("")
          setphType("")
          handleClose()
          successMsgAlert()
          fetchData()
        }if (res.data==-1){
          console.log('letter exit in database')
          setletterError(true)
          setflashmsgshow(false)
        }
        
      })
      .catch((error) => console.log(error));
  }};
  const handleEditphSubmit = (e) => {
    e.preventDefault();
    const isValid = Editvalidate();
    if (isValid) {
    const uploadData = new FormData();
    uploadData.append("name", Editletter)
    uploadData.append("type", Edittype)
    console.log('Edittype',Edittype)
    uploadData.append("id", Pid)
    axios
      .post( `${REACT_APP_HOST}EditPhonetic.php`, uploadData)
      .then((res) => {
        console.log(res);
        if (res.data>0){
          setEditletter("")
          setEdittype("")
          setEditflag(false)
          setflashmsgshow(false)
          setletterError(false)
          successEditMsgAlert()
          handleEditModalClose()
          fetchData()
        }
        if (res.data==-1){
          console.log('letter exit in database')
          setletterError(true)
          setflashmsgshow(false)
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
            <div className="">
              <h2>Phonetics List</h2>
            </div>
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
              <span style={{paddingLeft:'5px'}}>Add Phonetics</span>
              </Button>
          </div>
        </div>
        <div className="fricatives">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>Fricatives Phonetics</h5>
        <div className="row column1">
          {fricativesList}
        </div>
        </div>
        <div className="glidings">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>glidings Phonetics</h5>
        <div className="row column1">
          {glidingsList}
        </div>
        </div>
        <div className="leteral">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>leteral Phonetics</h5>
        <div className="row column1">
          {leteralList}
        </div>
        </div>
        <div className="nasals">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>Nasals Phonetics</h5>
        <div className="row column1">
          {nasalsList}
        </div>
        </div>
        <div className="stops">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>stops Phonetics</h5>
        <div className="row column1">
          {stopsList}
        </div>
        </div>
        <div className="short">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>Short Phonetics</h5>
        <div className="row column1">
          {shortList}
        </div>
        </div>
       
        <div className="long">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>Long Phonetics</h5>
        <div className="row column1">
          {longList}
        </div>
        </div>
        
        <div className="diphthongs">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>Diphthongs Phonetics</h5>
        <div className="row column1">
          {diphthongsList}
        </div>
        </div>
       
        <div className="affricates">
        <h5 style={{marginBottom:'15px',color:'#15283c'}}>Affricates Phonetics</h5>
        <div className="row column1">
          {affricatesList}
        </div>
        </div>
    
        <div className="row">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Add Phonetics List</h6>
            </Modal.Title>
            <button onClick={handleClose}type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-sort-alpha-down"></i>
                    </span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setname(evt.target.value)}
                placeholder="Add Phonetics" aria-label="name" aria-describedby="basic-addon1"/>
              </div>
              <div className="input-group mb-3">
              <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
              <i className="fas fa-object-ungroup"></i>
              </span>
              </div>
              <select  className="custom-select" id="inputGroupSelect01" 
              onChange={(evt) => setphType(evt.target.value)} >
                  <option selected>Phonetics Type</option>
                  <option value="1">fricatives</option>
                  <option value="2">glidings</option>
                  <option value="3">leteral</option>
                  <option value="4">nasals</option>
                  <option value="5">stops</option>
                  <option value="6">short</option>
                  <option value="7">long</option>
                  <option value="8">diphthongs</option>
                  <option value="9">affricates</option>
              </select>
            </div>
              {flashmsgshow ? (
                alertError()
              ) : null}
              {letterError ? (
                alertletterError()
              ) : null}

                {setEditflag ? (
                alerttypeError()
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
                  Save Phonetics
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
        </div>
        <div className="row">
        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header>
            <Modal.Title>
              <h6>Edit Phonetics </h6>
            </Modal.Title>
            <button onClick={handleEditModalClose}type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleEditphSubmit}  encType="multipart/form-data">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-sort-alpha-down"></i>
                    </span>
                </div>
                <input type="text" className="form-control" onChange={(evt) => setEditletter(evt.target.value)}
                placeholder={pname} aria-label="name" aria-describedby="basic-addon1"/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-sort-alpha-down"></i>
                    </span>
                </div>
                <select  className="custom-select"  
                 onChange={(evt) => setEdittype(evt.target.value)} >
                  {getPhoneticsType()}
                </select>
                </div>
                {flashmsgshow ? (
                alertError()
              ) : null}
              {letterError ? (
                alertletterError()
              ) : null}

                {setEditflag ? (
                alerttypeError()
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
                  Edit Phonetics
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
export default PhoneticsList;
