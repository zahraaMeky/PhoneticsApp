<?php

include 'db.php';

// retrieve parameters
$phonetic_id  = $_POST['phonetic_id'] ?? null;

if ($phonetic_id==null)   $phonetic_id  = $_POST['phonetic_id'] ?? null;
// check required parameters
if ($phonetic_id==null) die();
$quiz_id = [];
// mysqli_autocommit($db,FALSE);

$delete_Example = mysqli_query($db,"DELETE FROM phoneme_examples WHERE phonetic_id=$phonetic_id");
$select_quiz1_id=  mysqli_query($db,"SELECT id  FROM quiz1 WHERE phonetic_id=$phonetic_id");
if(mysqli_num_rows($select_quiz1_id) > 0 ){
  while($row = mysqli_fetch_assoc($select_quiz1_id)) {
    $id = $row['id'];
    $delete_quiz1_content=  mysqli_query($db,"DELETE FROM quiz1_content WHERE quiz_id=$id");

  }
}
$delete_quiz1=  mysqli_query($db,"DELETE FROM quiz1 WHERE phonetic_id=$phonetic_id");
$delete_quiz2=  mysqli_query($db,"DELETE FROM quiz2 WHERE phonetic_id=$phonetic_id");

$select_quiz3_id =  mysqli_query($db,"SELECT id  FROM quiz3 WHERE phonetic_id=$phonetic_id");
if(mysqli_num_rows($select_quiz3_id) > 0 ){
  while($row = mysqli_fetch_assoc($select_quiz3_id)) {
    $id = $row['id'];
    $delete_quiz3_content=  mysqli_query($db,"DELETE FROM quiz3_content WHERE quiz_id=$id");

  }
}

$delete_quiz3=  mysqli_query($db,"DELETE FROM quiz3 WHERE phonetic_id=$phonetic_id");
$delete_phonetics =  mysqli_query($db,"DELETE FROM phonemes WHERE id=$phonetic_id");
// Commit transaction
if (!mysqli_commit($db)) {
  echo "Commit transaction failed";
  exit();

}else{ echo 1; }

db_close();

?>