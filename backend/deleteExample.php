<?php

include 'db.php';

// retrieve parameters
$example_id  = $_POST['example_id'] ?? null;

if ($example_id==null)   $example_id  = $_POST['example_id'] ?? null;


// check required parameters
if ($example_id==null) die();

//get path of voice file 
$getExample_image = "select image from phoneme_examples where id='$example_id'";
$result = mysqli_query($db, $getExample_image);

if(mysqli_num_rows($result) > 0 ){

$row = mysqli_fetch_assoc($result);
$image =  $row['image'];
$image_dir = $_SERVER['DOCUMENT_ROOT'].'/phonetics_app'.$image;
// check if the file does exist
if (file_exists($image_dir)) {
  // delete file 
  unlink($image_dir);
  // sql to delete a record
  $sql = "DELETE FROM phoneme_examples WHERE id=$example_id";

  if (mysqli_query($db, $sql)) {
    echo "delete";
  } else {
    echo "Error deleting record: " . mysqli_error($db);
  }
} 
else {
  echo "Notdelete";
}
db_close();

}

?>