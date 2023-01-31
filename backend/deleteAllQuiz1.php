<?php 
include 'db.php';
// retrieve parameters
$Quiz_id      =     $_POST['Quiz_id']  ?? null;

if ($Quiz_id==null)  $Quiz_id  = $_POST['Quiz_id']  ?? null;


//echo $wordCount;

if ($Quiz_id==null) die();
$select_id = "SELECT `id` FROM quiz1_content WHERE quiz_id=$Quiz_id";
$select_id_result = mysqli_query($db, $select_id);
if (mysqli_num_rows($select_id_result) > 0) {
   
  // output data of each row
  while($row = mysqli_fetch_assoc($select_id_result)) {
    $id = $row["id"];
    mysqli_query($db,"DELETE FROM quiz1_content WHERE id=$id");
  }
}
$sql = "DELETE FROM quiz1 WHERE id=$Quiz_id";

if (mysqli_query($db, $sql)) {
  echo 1;
} 

db_close();
?>