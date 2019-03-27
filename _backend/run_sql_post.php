<?php

// Database connection info
$str = file_get_contents('db.json');
$json = json_decode($str, true);
// echo '<script> console.log(' . print_r($json, true) . ')</script>';

$servername = $json["0"]["db"]["host"];
$username = $json["0"]["db"]["user"];
$password = $json["0"]["db"]["passwd"];
$db = $json["0"]["db"]["db"];

// Create connection
$conn = new mysqli($servername, $username, $password, $db);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

/* Get data from Client side using $_POST array */
$sql  = $_POST['sql'];

if (mysqli_query($conn, $sql)) {
    echo "true";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

mysqli_close($conn);
?>