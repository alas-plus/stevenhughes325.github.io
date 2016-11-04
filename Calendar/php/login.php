<?php

// request variables
$user = $_REQUEST["user"];
$pass = $_REQUEST["pass"];
$mode = $_REQUEST["mode"];

// DB connection variables
$db_host = "localhost";
$db_user = "id86089_shughes";
$db_pass = "tshughes325";
$db_name = "id86089_caldb";

if ($mode == 1) {
  // Call the function to attempt to log the user in
  echo user_login($user, $pass);
} else {
  echo signup($user, $pass);
}

function user_login($u, $p){
  // References to the db login details
  global $db_host, $db_user, $db_pass, $db_name;
  // Connection object for the DB
  $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
  // Ensure the connection was successful
  if ($conn->connect_error) {
    die("Unable to connect to databse: " . $conn->connect_error);
  }
  $sql = "SELECT * FROM users WHERE username = '$u' LIMIT 1";
  $res = $conn->query($sql);
  if ($res->num_rows > 0) {
    // rsult was found
    $user_info = $res->fetch_assoc();
    if (password_verify($p, $user_info["password"])) {
      session_start();
      $_SESSION["user"] = $u;
      $_SESSION["pass"] = $p;
    } else {
      echo "ERROR: Invalid Password";
    }
  } else {
    echo "ERROR: User not found...";
  }
}

function signup($u, $p){
  // References to the db login details
  global $db_host, $db_user, $db_pass, $db_name;
  // Connection object for the DB
  $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
  // Ensure the connection was successful
  if ($conn->connect_error) {
    die("Unable to connect to databse: " . $conn->connect_error);
  }
  $chk_exist_sql = "SELECT * FROM users WHERE username = '$u' LIMIT 1";
  $q_res = $conn->query($chk_exist_sql);
  if ($q_res->num_rows > 0){
    echo "ERROR: User Taken";
  } else {
      $p = password_hash($p, PASSWORD_DEFAULT);
      $insert_sql = "INSERT INTO users (username, password) VALUES ('$u', '$p')";
      if($conn->query($insert_sql) === TRUE){
        echo "Insert Successful!";
      }else{
        echo "ERROR: Unable to create user";
      }
  }
}

?>
