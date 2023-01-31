<?php 
include 'db.php';
// retrieve parameters
$QuizID      =     $_POST['Quiz_id']  ?? null;
$word        =     $_POST['word']         ?? null;
$wordCount   =     $_POST['wordCount']         ?? null;

if ($Quiz_id==null)                    $QuizID  = $_POST['Quiz_id']  ?? null;
if ($word==null)                       $word    = $_POST['word']        ?? null;
if ($wordCount==null)                   $word    = $_POST['wordCount']        ?? null;

//echo $wordCount;

if ($QuizID==null && $word==null && $wordCount==null) die();

$sql = "SELECT voice_url, image_url,id FROM quiz3_content  WHERE correct_word='$word' and quiz_id = '$QuizID' ";
$result = mysqli_query($db, $sql);
if (mysqli_num_rows($result) > 0) {
   
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
    $word_id = $row["id"];
    //echo $word_id;
    $imagePath = $row["image_url"];
    $voicePath = $row["voice_url"];
    $voice_dir = $_SERVER['DOCUMENT_ROOT'].'/phonetics_app'.$voicePath;
    $image_dir = $_SERVER['DOCUMENT_ROOT'].'/phonetics_app'.$imagePath;
// check if the file does exist
    if (file_exists($voice_dir)) {
      // delete file 
      unlink($voice_dir);
      }
      // check if the file does exist
    if (file_exists($image_dir)) {
      // delete file 
      unlink($image_dir);
      }
    $sql = "DELETE FROM quiz3_content WHERE id='$word_id'";
    if (mysqli_query($db, $sql)) {
      //echo "delete";
    } else {
      //echo "Error deleting record: " . mysqli_error($db);
    }

}
}
$sql = "SELECT `words_list` FROM quiz3 WHERE id=$QuizID";
$result = mysqli_query($db, $sql);
if (mysqli_num_rows($result) > 0) {
   
  // output data of each row
  while($row = mysqli_fetch_assoc($result)) {
    $words_list = $row["words_list"];
    //echo $word_list;
    $word_arr = explode(":",$words_list);
    //  echo $word_arr;
     
  }
  $key = array_search($word, $word_arr, true);
    if ($key !== false) {
        array_splice($word_arr, $key, 1);
    }
  //print(json_encode($word_arr));
  $arr_count =  count($word_arr);
  if ($arr_count > 1){
    $words_list_new = implode(":", $word_arr);
   
  }else{
    $words_list_new = implode($word_arr);
  }
  // if ($wordCount == 0 || $wordCount ==1){
  //   $wordNew = $word.':';
  // }else{
  //   $wordNew = ':'.$word;
  // }
  // $words_list_new = str_replace($wordNew, '', $words_list);
  //echo $words_list_new;
}
if($words_list_new == ""){
  $sql="DELETE FROM quiz3  WHERE id='$QuizID'";

}else{
  $sql="UPDATE quiz3 SET words_list = '$words_list_new'  WHERE id='$QuizID'";

}
//echo $sql;
if (mysqli_query($db, $sql)) {
  echo "updated";
} else {
  echo "Error updating: " . mysqli_error($db);
}

db_close();

?>