<?php
include 'db.php';
$id  = $_POST['id'];
$word  = $_POST['word'];
$image  = $_POST['image'];
$phName  = $_POST['phonetic_name'];

// check required parameters
if ($id==null && $word==null && $image==null && $phName==null) die();
//image Path
$target_dir = "/var/www/html/phonetics_app/assets/images/$phoneticsName";
//check if new Example word exit in phoneme table 
$check_phExample = "SELECT * FROM `phoneme_examples` WHERE `word` = '$word'";
$phEx_result = mysqli_query($db, $check_phExample);
if (mysqli_num_rows($phEx_result) > 0) {
    echo -1;
}else{

// Where the file is going to be stored
if (($_FILES['image']['name']!="")){
        $file = $_FILES['image']['name'];
    	$path = pathinfo($file);
    	$filename = $path['filename'];
    	$ext = $path['extension'];
    	$temp_name = $_FILES['image']['tmp_name'];
    	$path_filename_ext = $target_dir . "/" .$filename.".".$ext;
        $database_dir = "/assets/images". $phoneticsName . "/" .$filename.".".$ext;
        }
        if(file_exists($path_filename_ext)){
            unlink($path_filename_ext);
        }
        move_uploaded_file($temp_name,$path_filename_ext);
        //Update phonemeExaple
        $update_phonemesExample = "UPDATE `phoneme_examples` SET `word` = '$word',`image`='$database_dir' WHERE `id`='$id'";
        if (mysqli_query($db, $update_phonemesExample)) {
            echo 1;
          } else {
            // echo $update_phonemes;
             echo "Error updating record: " . mysqli_error($db);
          }

}
db_close();
?>