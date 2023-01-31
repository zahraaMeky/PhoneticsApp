<?php

include 'db.php';

// retrieve parameters
$phonetic_name  = $_GET['name'] ?? null;

if ($phonetic_name==null)        $phonetic_name   = $_POST['name'] ?? null;


// check required parameters

if ($phonetic_name!=null) {
    // get phonetic id
    $sql = "SELECT id FROM `phonemes` WHERE `name`='$phonetic_name'";
    $result = mysqli_query($db, $sql);
    if(mysqli_num_rows($result) > 0 ){

        $row = mysqli_fetch_assoc($result);
        $phonetic_id =  $row['id'];
    }
    
}

if ($phonetic_id==null) die();

//my code get id from phonetics table
$getphonetic_id = "SELECT * FROM `quiz1` WHERE `phonetic_id`=$phonetic_id";
$result = mysqli_query($db, $getphonetic_id);

$data = [];
if(mysqli_num_rows($result) > 0 ){

        while($row = mysqli_fetch_assoc($result)) {
            $id = $row['id'];
            $sql_ = "SELECT * FROM `quiz1_content` WHERE `quiz_id`=$id ORDER BY `order_` ASC";
            $result_ = mysqli_query($db, $sql_);
            $items = [];
            while($row_ = mysqli_fetch_assoc($result_)) {
                array_push($items, $row_);
            }
            $row["data"] = $items;
            array_push($data, $row);
        }     
}

print(json_encode($data));  


?>