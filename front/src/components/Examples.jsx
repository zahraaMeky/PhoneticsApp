import React, { useState, useEffect } from "react";
import { Link,useNavigate,Navigate } from "react-router-dom";
import axios from "axios";
import LettersList from "./LettersList";
import AddExample from "./AddExamples";
import NavBar from "./NavBar";
function PhoneticsList() {
  const navigate = useNavigate();
  const user = localStorage.getItem('username');

  const fetchData = async () => {
    if (user){
      navigate('/phoneticsexamples');
    
    }else{
      navigate('/login');
    }
   
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { REACT_APP_HOST } = process.env;
  return (
    <>
    <NavBar/>
    <div className="midde_cont">
      <div className="container-fluid">
      <div className="row column_title page_title">
          <div className="col-6">
              <h2>Phonetics Examples</h2>
          </div>
        <AddExample/>
        </div>
          <LettersList/>
      </div>
    </div>
    </>
  );
}
export default PhoneticsList;
