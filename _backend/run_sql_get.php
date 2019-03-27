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

// header('Content-Type: application/json');
if (isset($_GET['sql'])) {
    $sql = $_GET['sql'];
    $as = $_GET['as'];

    // echo $sql;
    $json_array = array();

    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        // output data of each row 
        if ($as == 'string') {
            while($row = $result->fetch_assoc()) {
                echo json_encode($row);
            }
        } else if ($as == 'json') {
            while($row = mysqli_fetch_assoc($result)) {
                $json_array[] = $row;
            }
        }

        echo json_encode($json_array);
    } else {
        echo "0 results";
    }
};

$conn->close();

?>