import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LettersList4Quiz1 from "./LettersList4Quiz1";
import AddQuizOne from "./AddQuizOne";
import NavBar from "./NavBar";
import {useNavigate,Navigate } from "react-router-dom";
function Quiz_1() {
  const { REACT_APP_HOST } = process.env;
  const navigate = useNavigate();
  const user = localStorage.getItem('username');

  const fetchData = async () => {
    if (user){
      navigate('/quiz-One');
    
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
              <h2>Phonetics Quiz One</h2>
          </div>
        <AddQuizOne/>
        </div>
          <LettersList4Quiz1/>
      </div>
    </div>
    </>
  );
}
export default Quiz_1;
