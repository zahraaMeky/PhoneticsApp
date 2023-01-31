<?php

include 'db.php';
// retrieve parameters
$userName       = $_GET['userName']         ?? null;
$password  = $_POST['password']  ?? null;


// if ($words==null)         $words        = $_POST['words']        ?? null;
if ($userName==null)   $userName  = $_POST['userName']  ?? null;
if ($password==null)         $password        = $_POST['password']        ?? null;

// echo $phonetic_id . "<br>";

// check required parameters
if ($password==null && $password==null) die();
// echo $userName;
// echo $password;
$encPass =  convert_uuencode($password); 
//echo $decPass;
// check if user input  email or username
if (filter_var($userName, FILTER_VALIDATE_EMAIL)) {
    $sql = "SELECT id,type FROM admin WHERE email = '$userName' and password = '$encPass'";
    //echo  $sql;
  } else {
    $sql = "SELECT id,type FROM admin WHERE username = '$userName' and password = '$encPass'";
    //echo  $sql;
  }
$result = mysqli_query($db,$sql);
if (mysqli_num_rows($result) > 0) {
  $row = mysqli_fetch_assoc($result);
  $user_type =  $row['type'];
  if ($user_type == 1){
    echo 1;
  }else{
    echo 0;
  }

}else{
    echo -1;
}

?>


