<?php
include 'db.php';

$name  = $_POST['name'];
$type  = $_POST['type'];
$id  = $_POST['id'];

// check required parameters
if ($name==null && $type==null && $id==null) die();
//check if new phonetics name exit in phoneme table 
$check_phonemes = "SELECT * FROM `phonemes` WHERE `name` = '$name'";
$ph_result = mysqli_query($db, $check_phonemes);
if (mysqli_num_rows($ph_result) > 0) {
    echo -1;
}
else{
    $update_phonemes = "UPDATE `phonemes` SET `name` = '$name',`type_id`='$type' WHERE `id`='$id'";
    if (mysqli_query($db, $update_phonemes)) {
        echo 1;
      } else {
        // echo $update_phonemes;
         echo "Error updating record: " . mysqli_error($db);
      }
     
}


db_close();
?>