<?php

include 'db.php';


$sql = "SELECT * FROM `admin`";
$result = mysqli_query($db, $sql);

$data = [];
if (mysqli_num_rows($result) > 0) {
  while ($r = mysqli_fetch_assoc($result)) {
    if($r['password']){
      $r['password'] = convert_uudecode($r['password']);
      array_push($data, $r);
    } 
  }
}
print(json_encode($data));
?>