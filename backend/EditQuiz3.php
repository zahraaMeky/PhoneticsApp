<?php
include 'db.php';
$quiz_id  = $_POST['qid'];
$word  = $_POST['word'];
$image  = $_POST['image'];
$phName  = $_POST['phonetic_name'];
$word_id  = $_POST['wid'];
$word_Count  = $_POST['wCount'];

// check required parameters
if ($id==null && $word==null && $image==null && $phName==null && $word_id  == null && $word_Count ==null) die();
//image Path
$target_dir = "/var/www/html/phonetics_app/assets/images/$phoneticsName";
//check if new Example word exit in phoneme table 
$check_phQuiz = "SELECT * FROM `quiz3_content` WHERE `correct_word` = '$word'";
$phqz_result = mysqli_query($db,$check_phQuiz);
if (mysqli_num_rows($phqz_result) > 0) {
    echo -1;
}else{
    //fetch word list and store it 
    $Fetch_word_list = "SELECT `words_list` FROM quiz3 WHERE id=$quiz_id";
    $WL_result = mysqli_query($db, $Fetch_word_list);
    if (mysqli_num_rows($WL_result) > 0) {
       
      // output data of each row
      while($row = mysqli_fetch_assoc($WL_result)) {
        $words_list = $row["words_list"];
        $word_arr = explode(":",$words_list);
        $arrlength = count($word_arr);
      }
      for($x = 0; $x < $arrlength; $x++) {
        if  ($x == $word_Count){
            $word_arr[$x]=$word;
        }
      }
      $words_list_new = implode(":", $word_arr);
  
    $Update_quiz3="UPDATE `quiz3` SET `words_list` = '$words_list_new'  WHERE `id`='$quiz_id'";
    //echo $sql;
    if (mysqli_query($db, $Update_quiz3)) {
      //echo "updated";
    } else {
      //echo "Error updating: " . mysqli_error($db);
    }
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
        $update_Quiz3 = "UPDATE `quiz3_content` SET `correct_word` = '$word',`image_url`='$database_dir' WHERE `id`='$word_id'";
        if (mysqli_query($db, $update_Quiz3)) {
            echo 1;
          } else {
            // echo $update_phonemes;
             echo "Error updating record: " . mysqli_error($db);
          }

}
}
db_close();
?>