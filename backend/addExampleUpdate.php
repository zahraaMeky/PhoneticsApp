<?php

include 'db.php';

//$types = ["i"=>"initially", "I"=>"initially", "m"=>"medially", "M"=>"medially", "f"=>"finally", "F"=>"finally" ];
$types = ["initially"=>"i", "medially"=>"m",  "finally"=>"f"];

// retrieve parameters

if ($word==null)          $word         = $_POST['word']         ?? null;
if ($image==null)         $image        = $_POST['image']        ?? null;
if ($type==null)          $type         = $_POST['type']         ?? null;
if ($phonetic_id==null)   $phonetic_id  = $_POST['phonetic_id']  ?? null;


// check required parameters
if ($word==null && $phonetic_id==null && $image==null && $type==null) die();

$word_type = $types[$type];

//select phonetics name where id 
$sql = "SELECT name FROM `phonemes` WHERE `id`='$phonetic_id'";
$result = mysqli_query($db, $sql);
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_array($result)) {
    $phoneticsName = $row['name'];
}
   
}
 // check if exist
     $sql = "SELECT * FROM `phoneme_examples` WHERE `word`='$word' AND phonetic_id=$phonetic_id";
    $result = mysqli_query($db, $sql);
    if (mysqli_num_rows($result) > 0) {
        echo 'word';
        die();
    }else{
        $target_dir = "/var/www/html/phonetics_app/assets/images/$phoneticsName";
        if (!is_dir($target_dir)) {
         mkdir($target_dir, 0777, true);
         //echo $target_dir;
        }
        if (($_FILES['image']['name']!="")){
        
    // Where the file is going to be stored
    	$file = $_FILES['image']['name'];
    	$path = pathinfo($file);
    	$filename = $path['filename'];
    	$ext = $path['extension'];
    	$temp_name = $_FILES['image']['tmp_name'];
    	$path_filename_ext = $target_dir . "/" .$filename.".".$ext;
        $database_dir = "/assets/images/". $phoneticsName . "/" .$filename.".".$ext;
   
	    //echo $path_filename_ext . "<br>";
        }
        // Check if file already exists
        if(file_exists($path_filename_ext)){
            unlink($path_filename_ext);
        }
        move_uploaded_file($temp_name,$path_filename_ext);
        // if (file_exists($path_filename_ext)) {
        //  echo "file";
        //  }else{
        //       move_uploaded_file($temp_name,$path_filename_ext);
        //       echo move_uploaded_file($temp_name,$path_filename_ext);
              // query process
            $sql = "INSERT INTO `phoneme_examples`(`word`, `image`, `type`, `phonetic_id`) VALUES ('$word','$database_dir','$word_type',$phonetic_id)";
            
            $result = mysqli_query($db, $sql);
            $sql = "SELECT LAST_INSERT_ID()";
            $result = mysqli_query($db, $sql);
            if (mysqli_num_rows($result) > 0) {
                $r = mysqli_fetch_assoc($result);
                $example_id = $r['LAST_INSERT_ID()'];
            } 
            else {$example_id = 0;}
        
            echo $example_id;
         }

        
// }

db_close();

?>