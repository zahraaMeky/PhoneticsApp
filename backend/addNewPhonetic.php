<?php

include 'db.php';

// retrieve parameters
$phonetic_name  = $_POST['name'] ?? null;
$phonetic_type  = $_POST['type'] ?? null;
if ($phonetic_name==null)   $phonetic_name  = $_POST['name'] ?? null;
if ($phonetic_type==null)   $phonetic_type  = $_POST['type'] ?? null;

// check required parameters
if ($phonetic_name==null && $phonetic_type==null ) die();

// check if exist
$sql = "SELECT * FROM `phonemes` WHERE `name`='$phonetic_name' && `type_id`='$phonetic_type'";
$result = mysqli_query($db, $sql);
if (mysqli_num_rows($result) > 0) {
    echo -1;
    die();
}

// query process
$sql = "INSERT INTO `phonemes`(`name`,`type_id`) VALUES ('$phonetic_name','$phonetic_type')";
// echo $sql . "<br>";
$result = mysqli_query($db, $sql);

$sql = "SELECT LAST_INSERT_ID()";
$result = mysqli_query($db, $sql);
if (mysqli_num_rows($result) > 0) {
    $r = mysqli_fetch_assoc($result);
    $phonetic_id = $r['LAST_INSERT_ID()'];
} else $phonetic_id = 0;

echo $phonetic_id;

db_close();

?>