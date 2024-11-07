<?php
require_once 'db_connection.php'; // Ensure this file contains your database connection function

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$response = array();
$mysqli = db_connect();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch Recipes based on selected ingredients
    if (isset($_GET['ingredients'])) {
        $ingredients = $mysqli->real_escape_string($_GET['ingredients']);
        $ingredientArray = explode(',', $ingredients); // Get ingredients as an array

        // Build the SQL query
        $conditions = [];
        foreach ($ingredientArray as $ingredient) {
            $conditions[] = "ingredients LIKE '%" . $ingredient . "%'"; // Use LIKE to match any ingredient
        }
        $sql = "SELECT * FROM recipes WHERE " . implode(' OR ', $conditions); // Use OR to match any ingredient
    } else {
        // Fetch all recipes if no ingredients are provided
        $sql = "SELECT * FROM recipes";
    }

    $result = $mysqli->query($sql);
    $recipes = [];
    while ($row = $result->fetch_assoc()) {
        $row['ingredients'] = json_decode($row['ingredients']); // Decode JSON
        $recipes[] = $row;
    }
    $response = ['status' => 'success', 'data' => $recipes];
}

echo json_encode($response);
?>

