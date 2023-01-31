<?php

include 'db.php';

// query process
$sql = "SELECT * FROM `phonemes`";
$result = mysqli_query($db, $sql);
$data = [];
if (mysqli_num_rows($result) > 0) {
  while ($r = mysqli_fetch_assoc($result)) {
    array_push($data, $r);
  }
  // print(json_encode($data));
}
print(json_encode($data));
?>