<?php
//to allow comunicate between react and php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: 'X-Requested-With,content-type'");
header("Access-Control-Allow-Methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE'");

$server_db = "localhost";
$user_db = "root";
$pass_db = "root";
$name_db = "phonetic";
  
  $db = mysqli_connect($server_db, $user_db, $pass_db, $name_db);
 
  if($db === false){
      die("ERROR: Could not connect. " . mysqli_connect_error());
  }
  
  function db_insert($table , $dataarray) {
    $db = $GLOBALS['db'];
    $para = "";  
    for ($i=0; $i<count($dataarray); $i++) {
           $para .= "'$dataarray[$i]'";
           if ($i<(count($dataarray)-1)) $para .= ",";
    }
    // $sql = "INSERT INTO `users` VALUES ('$username','$password','$email')";
    $sql = "INSERT INTO `$table` VALUES ($para)";
    //echo $sql;
    mysqli_query($db, $sql);
	
	if (mysqli_affected_rows($db)) echo "1";
  }


  function db_checkUser($table, $username, $password) {
    $db = $GLOBALS['db'];

    $sql = "SELECT * FROM `$table` WHERE `username`='$username' AND `password`='$password'";
    $res = mysqli_query($db, $sql);
    if (mysqli_num_rows($res) == 0) die();
        
  }


  // $paraarray is an array with format array("Column1"=>"value1", "Column2"=>"value2");
  function db_select($table , $paraarray=null ,$last=null, $date_from=null, $date_to=null, $time_from=null, $time_to=null) {
    $db = $GLOBALS['db'];

    $para = "";
    $where = false;

    if ($paraarray != null) {
        $i = 0;
        $para = " WHERE ";
        $where = true;
        foreach($paraarray as $k => $k_value) {
            $para .= "`$k`='$k_value'";
            if ($i<(count($paraarray)-1)) $para .= " AND ";
            $i++;
        }
    }

    // date

    if ($date_from!=null) {
      if (!$where) {
        $para .= " WHERE ";
        $where = true;
      }
      else $para .= " AND "; 
 
      if ($time_from!=null) 
		  $para .= "`datetime`>='$date_from $time_from'"; 
	  else 
      	  $para .= "`datetime`>='$date_from 00:00:00'"; 
      
    }
          
    
    if ($date_to!=null) {
      if (!$where) {
        $para .= " WHERE ";
        $where = true;
      }
      else $para .= " AND "; 

      if ($time_to!=null) 
		  $para .= "`datetime`<='$date_to $time_to'"; 
	  else 
      	  $para .= "`datetime`<='$date_to 23:59:59'";   
    }
      
	  /*    
    if ($time_from!=null) {
      if (!$where) {
        $para .= " WHERE ";
        $where = true;
      }
      else $para .= " AND "; 
      $para .= "`time`>='$time_from'"; 
    }
	
          
    if ($time_to!=null) {
      if (!$where) {
        $para .= " WHERE ";
        $where = true;
      }
      else $para .= " AND "; 
      $para .= "`time`<'$time_to'"; 
    }
*/

    $one = false;
    // Order DESC and LIMIT
    if ($last != null) {
         $para .= " ORDER BY datetime DESC LIMIT " . $last; 
         if (intval($last)==1) $one = true; 
    }

    $sql = "SELECT * FROM `$table`" . $para;

    $res = mysqli_query($db, $sql);
  
    if ($res) {
        if (mysqli_num_rows($res) > 0) {
                //echo "number of results = " . mysqli_num_rows($res) . "<br>";
            if (!$one) {          
                $data = [];
                while($r = mysqli_fetch_assoc($res)){
                    array_push($data , $r);
                }
                print(json_encode($data));
            } else {
                if($r = mysqli_fetch_assoc($res))  print(json_encode($r)); 
            }
        }
    }
  }


  function db_select_one($table , $paraarray=null) {
    $db = $GLOBALS['db'];

    $para = "";
    $where = false;

    if ($paraarray != null) {
        $i = 0;
        $para = " WHERE ";
        $where = true;
        foreach($paraarray as $k => $k_value) {
            $para .= "`$k`='$k_value'";
            if ($i<(count($paraarray)-1)) $para .= " AND ";
            $i++;
        }
    }

    $sql = "SELECT * FROM `$table`" . $para;
    $res = mysqli_query($db, $sql);
  
    if ($res) {
        if (mysqli_num_rows($res) > 0) {
            if($r = mysqli_fetch_assoc($res)){
				        print(json_encode($r));
            }
        }
    }
  }
  
  function db_getdevices_lastdata($username) {
      $db = $GLOBALS['db'];
  
      $sql = "SELECT * FROM `devices` WHERE `username`='$username'";
      $res = mysqli_query($db, $sql);
    
      if ($res) {
          if (mysqli_num_rows($res) > 0) {
                  //echo "number of results = " . mysqli_num_rows($res) . "<br>";
              $data = [];
              while($r = mysqli_fetch_assoc($res)){
                  $dev = $r['devID'];
                  ////////////////////////////////////////////////////////////////////
                  $sql2 = "SELECT `devices`.`name` , `devices`.`place`, `data`.* FROM `devices`,`data` WHERE `devices`.`username`='$username' AND `devices`.`devID`='$dev' AND `data`.`devID`='$dev' ORDER BY date DESC, time DESC LIMIT 1";
                  $res2 = mysqli_query($db, $sql2);
                
                  if ($res2) {
                      if (mysqli_num_rows($res2) > 0) {
                          if($r2 = mysqli_fetch_assoc($res2)){
                              array_push($data , $r2);
                          }
                      }
                  }
                  ///////////////////////////////////////////////////////////////////
              }
              print(json_encode($data));
          }
      }

  }

  function db_close() {
    $db = $GLOBALS['db'];
    mysqli_close($db);
  }



?>
