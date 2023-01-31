<?php

include 'db.php';

// retrieve parameters
$Quiz_id  = $_POST['Quiz_id'] ?? null;

if ($Quiz_id==null)   $Quiz_id  = $_POST['Quiz_id'] ?? null;


// check required parameters
if ($Quiz_id==null) die();

//get path of image file 
$getQuiz_image = "select image from quiz2 where id='$Quiz_id'";
$result = mysqli_query($db, $getQuiz_image);

if(mysqli_num_rows($result) > 0 ){

$row = mysqli_fetch_assoc($result);
$image =  $row['image'];
$image_dir = $_SERVER['DOCUMENT_ROOT'].'/phonetics_app'.$image;
// check if the file does exist
if (file_exists($image_dir)) {
  // delete file 
  unlink($image_dir);
  // sql to delete a record
  $sql = "DELETE FROM quiz2 WHERE id=$Quiz_id";

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