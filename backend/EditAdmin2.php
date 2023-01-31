<?php
include 'db.php';
$id  = $_POST['ID'];
$username  = $_POST['user'];
$email     = $_POST['email'];
$type      = $_POST['type'];
$password  = $_POST['password'];

$para = "";

if (empty($id)) die();

if (!empty($username)){
    $para .= "`username`='$username'";
}
if (!empty($email)){
    if ($para!="") $para .= ",";
    $para .= "`email`='$email'";
}
if (!empty($type)){
   if($type == 'a'){
    $type = "0";
   }
   if($type == 's'){
    $type = "1";
   }

    if ($para!="") $para .= ",";
    $para .= "`type`='$type'";
}
if (!empty($password)){
    $encPass =  convert_uuencode($password); 
    if ($para!="") $para .= ",";
    $para .= "`password`='$encPass'";
}

if ($para!="") {
    $sql = "UPDATE `admin` SET $para WHERE `id`='$id'";
    mysqli_query($db, $sql);
    echo 1;
}

db_close();
?>