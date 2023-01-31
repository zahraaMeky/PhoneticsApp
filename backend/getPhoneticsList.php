<?php

include 'db.php';

$type = $_GET['type'] ?? null;
if ($type==null) $type = $_POST['type'] ?? null;

$get_all_data = true;

// get phonemes for specific type
if ($type!=null) { 
  $sql_ = "SELECT * FROM `phoneme_types` WHERE id=$type";
  $result_ = mysqli_query($db, $sql_);
  if (mysqli_num_rows($result_) > 0) {
    $get_all_data = false;
    $sql = "SELECT * FROM `phonemes` WHERE type_id=$type";
    $result = mysqli_query($db, $sql);
    $data = [];
    if (mysqli_num_rows($result) > 0) {
      while ($r = mysqli_fetch_assoc($result)) {
        array_push($data, $r);
      }
    }
    print(json_encode($data));
  } 
}

// if no valid type specific, get all phonemes
if ($get_all_data) {
  $alldata = Array();
  $sql_ = "SELECT * FROM `phoneme_types`";
  $result_ = mysqli_query($db, $sql_);
  if (mysqli_num_rows($result_) > 0) {
    while ($r_ = mysqli_fetch_assoc($result_)) {
      $type_id= $r_['id'];
      $type_name= $r_['type'];
      $sql = "SELECT * FROM `phonemes` WHERE type_id=$type_id";
      $result = mysqli_query($db, $sql);
      $data = [];
      if (mysqli_num_rows($result) > 0) {
        while ($r = mysqli_fetch_assoc($result)) {
          array_push($data, $r);
        }
      }
      $alldata[$type_name] = $data;
      // array_push($alldata, $type_name=>$data);
    }
    print(json_encode($alldata));
  }
}


?>