<?php

include 'db.php';
// retrieve parameters

if ($userN==null)                $userN= $_POST['userN']?? null;
if ($userpassword==null)         $userpassword= $_POST['userpassword']?? null;
if ($useremail==null)            $useremail= $_POST['useremail']?? null;
if ($userrole==null)             $userrole  = $_POST['userrole']  ?? null;
// check required parameters
if ($userN==null && $userpassword==null && $useremail==null && $userrole==null) die();
$encPass = convert_uuencode($userpassword);
// check if username exit
$sql = "SELECT id FROM `admin` WHERE `username`='$userN' OR `email`='$useremail'";
$result = mysqli_query($db, $sql);
if (mysqli_num_rows($result) > 0) {
   echo 1;
}else{
    $sql = "INSERT INTO `admin`  (`username`, `password`, `email`, `type`) VALUES ('$userN','$encPass','$useremail',$userrole)";
    $result = mysqli_query($db, $sql);
    if ($result){
      echo 0;
    }else{ echo -1;}
   
}

db_close();

?>
