<?php

include 'db.php';

// retrieve parameters
$phonetic_name  = $_GET['name'] ?? null;
$type         = $_GET['type'] ?? null;

if ($phonetic_name==null)   $phonetic_name  = $_POST['name'] ?? null;
if ($type==null)            $type         = $_POST['type'] ?? null;

// echo $phonetic_name , $type; 
// check required parameters
if ($phonetic_name==null) die();

//my code get id from phonetics table
$getphonetic_id = "select id from phonemes where name='$phonetic_name'";
$result = mysqli_query($db, $getphonetic_id);

if(mysqli_num_rows($result) > 0 ){

$row = mysqli_fetch_assoc($result);
$phonetic_id =  $row['id'];
}
// query process
$sql = "SELECT * FROM `quiz2` WHERE `phonetic_id`='$phonetic_id'";

if ($type!=null) {
    if ($type=='f' || $type=='F' || $type=='finally')       $word_type = "f";
    else if ($type=='m' || $type=='M' || $type=='medially') $word_type = "m";
    else                                                    $word_type = "i";
    $sql .= " AND type='$word_type'";
}

$result = mysqli_query($db, $sql);

$data = [];
if (mysqli_num_rows($result) > 0) {
  while ($r = mysqli_fetch_assoc($result)) {
    array_push($data, $r);
  }
  // print(json_encode($data));

}
print(json_encode($data));
?>

