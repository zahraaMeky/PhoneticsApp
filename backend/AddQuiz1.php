<?php

include 'db.php';

function uploadFile($phonetic_id, $type , $name) {
    $db = $GLOBALS['db'];
    $path_filename_ext = "";
    
    $sql = "SELECT name FROM `phonemes` WHERE `id`=$phonetic_id";
    // echo $sql;
    $result = mysqli_query($db, $sql);
    if (mysqli_num_rows($result) > 0) {
        if($row = mysqli_fetch_assoc($result)) {
            $phoneticsName = $row['name'];
            // echo $phoneticsName;
        }
    
        if($phoneticsName!=null) {
            
            $database_dir = "/assets/$type" . "s/$phoneticsName"  ;
            $target_dir = "/var/www/html/phonetics_app/assets/$type" . "s/$phoneticsName"  ;
            //echo $target_dir;
            $path_filename_ext = "";
        
            if (!is_dir($target_dir)) {
                mkdir($target_dir, 0777, true);
            }
            if (($_FILES[$name]['name']!="")){
                    
                    // Where the file is going to be stored
                	$file = $_FILES[$name]['name'];
                	$path = pathinfo($file);
                	$filename = $path['filename'];
                	$ext = $path['extension'];
                	$temp_name = $_FILES[$name]['tmp_name'];
                	$path_filename_ext = $target_dir . "/" .$filename.".".$ext;
                    $path_database_ext = $database_dir . "/" .$filename.".".$ext;
            }
            // Check if file already exists
            if(file_exists($path_filename_ext)){
                unlink($path_filename_ext);
            }
            move_uploaded_file($temp_name,$path_filename_ext);
        }
    
    }
    
    return $path_database_ext;
}


// retrieve parameters
// $words        = $_GET['words']         ?? null;
$phonetic_id  = $_POST['phonetic_id']  ?? null;
$items        = $_POST['items']         ?? null;
$done = false;
// if ($words==null)         $words        = $_POST['words']        ?? null;
if ($phonetic_id==null)   $phonetic_id  = $_POST['phonetic_id']  ?? null;
if ($items==null)         $items        = $_POST['items']        ?? null;

// echo $phonetic_id . "<br>";

// check required parameters
if ($phonetic_id==null && $items==null) die();

// echo $items;

$words = "";
$items_json = json_decode($items, true);
// echo $items_json;
for ($i = 0 ; $i<3; $i++) {
    // echo $items_json[$i];
    $word = $items_json[$i]["word"];
    if ($i>0) $words .= ":";
    $words .= $word;
}

// echo $words;

// foreach($items as $i) {
//     $word = $i["word"];
//     if ($words!="") $words .= ":";
//     $words .= $word;
// }

 // check if exist
 $sql = "SELECT * FROM `quiz1` WHERE `words_list`='$words'";
//  echo $sql . "<br>";
 $result = mysqli_query($db, $sql);
 if (mysqli_num_rows($result) > 0) {
    echo 0;
    die();
 }
 
 else{
     
    // insert to quiz2 table
    $sql = "INSERT INTO `quiz1`( `words_list`, `phonetic_id`) VALUES ('$words',$phonetic_id)";
    $result = mysqli_query($db, $sql);
            
    $sql = "SELECT LAST_INSERT_ID()";
    $result = mysqli_query($db, $sql);
    if (mysqli_num_rows($result) > 0) {
        $r = mysqli_fetch_assoc($result);
        $quiz_id = $r['LAST_INSERT_ID()'];
       echo  $quiz_id;
        // add quiz2 content
        // $items = [{"order": 1, image":"", "voice":"", "word":""}]
        if ($items!=null) {
            // $items_json = $items;
            //echo $items;
            $items_json = json_decode($items, true);
            
            foreach($items_json as $item) {
               $order   = intval($item['order']);
               $image    = $item['image'];
            //    $voice    = $item['voice'];
               $word    = $item['word'];             
               // upload files and get files path
               $image_path = uploadFile($phonetic_id, "images" , $image);
            //    $voice_path = uploadFile($phonetic_id, "voice", $voice);
               
               //echo $image_path . "<>" . $voice_path . "<br>";
                
               $SQL = "INSERT INTO `quiz1_content`(`quiz_id`, `order_`, `image_url`, `correct_word`) VALUES ($quiz_id,$order,'$image_path','$word')";
            //    echo $SQL;
               $res = mysqli_query($db, $SQL);

               if ($res) $done = true;
            }
        }

   } else {
       $quiz_id = 0;
   }
 }        

//  if ($done) echo $quiz_id;

db_close();

?>