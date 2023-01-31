<?php
include 'db.php';
$id  = $_POST['ID'];
$username  = $_POST['user'];
$email     = $_POST['email'];
$type      = $_POST['type'];
$password  = $_POST['password'];
/* echo "typpe".$type.gettype($type);  */
if (!empty($username)){
    $sql = "UPDATE `admin` SET `username`= '$username' WHERE `id`='$id'";
    mysqli_query($db, $sql);
    $adminname =1;
}
if (!empty($email)){
    $sql = "UPDATE `admin` SET `email`= '$email' WHERE `id`='$id'";
    mysqli_query($db, $sql);
    $adminemail =1;
}
if (!empty($type)){
   if($type == 'a'){
    $type = "0";
   }
   if($type == 's'){
    $type = "1";
   }
    $sql = "UPDATE `admin` SET `type`= '$type' WHERE `id`='$id'";
    mysqli_query($db, $sql);
    $admintype =1;
}
if (!empty($password)){
    $encPass =  convert_uuencode($password); 
    $sql = "UPDATE `admin` SET `password`= '$encPass' WHERE `id`='$id'";
    mysqli_query($db, $sql);
    $adminpassword =1;
}

if ($adminname || $adminemail ||$adminpassword ||$admintype){
    echo 1;
}

db_close();
?>