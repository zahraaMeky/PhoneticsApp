import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LettersSelectOption() {
  const { REACT_APP_HOST } = process.env;
  const [Phonetics, SetPhonetics] = useState([]);
  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `${REACT_APP_HOST}getphonetics.php`
      );
      SetPhonetics(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const PhoneticsList = Phonetics.map((phonetics, i) => {
    return (
      <>
        <option key={i} value={phonetics.id}>
            {phonetics.name}
        </option>
    
      </>
    );
  });
  return (
    <> {PhoneticsList}</>
  );
}
export default LettersSelectOption;
