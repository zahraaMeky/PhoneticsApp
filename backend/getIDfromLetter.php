<?php

   $letter=$_GET['letter'];

   

    $servername = "localhost";

 

    // Give your username and password

    $username = "root";

    $password = "ESTRLab@2017";

 

   // Give your Database name

    $dbname = "phonetics_app";

 

  // Give your table name

   // $table = "phonetics_list"; // lets create a table named Employees.

     

    // Create Connection

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check Connection

    if($conn->connect_error){

        die("Connection Failed: " . $conn->connect_error);

        return;

    }

 

    // Get all records from the database

 

    $sql = "SELECT id from phonemes where name='$letter'";

    $db_data = array();

 

    $result = $conn->query($sql);

    if($result->num_rows > 0){

        while($row = $result->fetch_assoc()){

            $db_data[] = $row;

        }

        // Send back the complete records as a json

        echo json_encode($db_data);

    }

    $conn->close();

    

    return;

 

?>