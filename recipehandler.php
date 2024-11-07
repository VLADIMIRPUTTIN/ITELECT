<?php
require_once 'db_connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$response = array();
$mysqli = db_connect();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['addRecipe'])) {
        $recipe = json_decode($_POST['addRecipe'], true);
        $name = $mysqli->real_escape_string($recipe['name']);
        $description = $mysqli->real_escape_string($recipe['description']);
        $ingredients = $mysqli->real_escape_string(json_encode($recipe['ingredients'])); // Store ingredients as JSON

        $sql = "INSERT INTO recipes (name, description, ingredients) VALUES ('$name', '$description', '$ingredients')";
        if ($mysqli->query($sql) === TRUE) {
            $response = [
                'message' => 'Recipe added successfully.',
                'recipe_id' => $mysqli->insert_id
            ];
        } else {
            $response = ['error' => 'Error adding recipe: ' . $mysqli->error];
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['ingredients']) && !empty($_GET['ingredients'])) {
        $ingredients = $_GET['ingredients'];
        $ingredientArray = explode(',', $mysqli->real_escape_string($ingredients));

        $conditions = [];
        foreach ($ingredientArray as $ingredient) {
            $conditions[] = "ingredients LIKE '%" . $ingredient . "%'";
        }
        $sql = "SELECT * FROM recipes WHERE " . implode(' AND ', $conditions); // Fetch recipes with all selected ingredients
    } else {
        $sql = "SELECT * FROM recipes"; // Fetch all recipes if no ingredients are specified
    }

    $result = $mysqli->query($sql);
    $recipes = [];
    while ($row = $result->fetch_assoc()) {
        $row['ingredients'] = json_decode($row['ingredients']); // Decode ingredients JSON for frontend
        $recipes[] = $row;
    }
    $response = ['status' => 'success', 'data' => $recipes];
}

echo json_encode($response);
?>
