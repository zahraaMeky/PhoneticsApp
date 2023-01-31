import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LettersList() {
  const { REACT_APP_HOST } = process.env;
  const [affricates, Setaffricates] = useState([]);
  const [diphthongs, Setdiphthongs] = useState([]);
  const [fricatives, Setfricatives] = useState([]);
  const [glidings, Setglidings] = useState([]);
  const [leteral, Setleteral] = useState([]);
  const [long, Setlong] = useState([]);
  const [nasals, Setnasals] = useState([]);
  const [short, Setshort] = useState([]);
  const [stops, Setstops] = useState([]);
  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, []);
  const glidingsList = glidings.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  const fricativesList = fricatives.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  const leteralList = leteral.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  const nasalsList = nasals.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  const stopsList = stops.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  const shortList = short.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  const longList = short.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  const diphthongsList = diphthongs.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  const affricatesList = affricates.map((phonetics, i) => {
    return (
      <>
        <div key={phonetics.id} className="col-md-2">
          <Link
            to={`/phoneticssexample/${phonetics.name}`}
            className="button-50 button"
            role="button"
          >
            {phonetics.name}
          </Link>
        </div>
        <div className="custom-margin"></div>
      </>
    );
  });
  return (
    <>
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
    </>
  
  );
}
export default LettersList;
