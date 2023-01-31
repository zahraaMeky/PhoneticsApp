import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useNavigate,Navigate } from "react-router-dom";
import LettersList4Quiz2 from "./LettersList4Quiz2";
import AddQuiztwo from "./AddQuiztwo";
import NavBar from "./NavBar";

function Quiz_2() {
  const { REACT_APP_HOST } = process.env;
  const navigate = useNavigate();
  const user = localStorage.getItem('username');

  const fetchData = async () => {
    if (user){
      navigate('/quiz-two');
    
    }else{
      navigate('/login');
    }
   
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <NavBar/>
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title page_title">
          <div className="col-6">
              <h2>Phonetics Quiz two</h2>
          </div>
          <AddQuiztwo/>
        </div>
          <LettersList4Quiz2/>
      </div>
    </div>
    </>
  );
}
export default Quiz_2;
