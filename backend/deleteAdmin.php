<?php
include 'db.php';

// retrieve parameters
$id  = $_POST['ID'] ?? null;
$user  = $_POST['user'] ?? null;
if ($id==null)     $id = $_POST['ID'] ?? null;
if ($user==null)   $user = $_POST['user'] ?? null;


// check required parameters
if ($id==null && $user==null) die();
$sql = "SELECT id FROM `admin` WHERE `username`='$user'";
$result = mysqli_query($db, $sql);
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $user_id =  $row['id'];
    if ($id == $user_id){
        echo 1;
    }else{
        // sql to delete a record
    $sql = "DELETE FROM admin WHERE id=$id";
    if (mysqli_query($db, $sql)) {
        echo 0;
      } else {
        echo "Error deleting record: " . mysqli_error($conn);
      }
    }
  
}

db_close();

?>