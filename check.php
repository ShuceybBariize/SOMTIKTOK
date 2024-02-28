<?php

if (isset($_GET['url'])) {
    $tiktokUrl = $_GET['url'];

    // Call your TikTok API or service to fetch video information
    // Replace this with your actual TikTok API endpoint
    $apiEndpoint = 'https://your-tiktok-api.com/get-video-info?url=' . urlencode($tiktokUrl);
    
    $response = file_get_contents($apiEndpoint);
    $data = json_decode($response, true);

    // Return the fetched data as JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    // Invalid request
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request']);
}
