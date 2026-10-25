<?php
// Dùng với: php -S localhost:8080 router.php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? '/';

$blockedDir  = preg_match('#^/(config|includes|libs)(/|$)#i', $path);
$blockedFile = preg_match('#\.(sql|log|md|json|lock|ini)$#i', $path);
$dotFile     = str_starts_with(basename($path), '.');

if ($blockedDir || $blockedFile || $dotFile) {
    http_response_code(403);
    echo 'Forbidden';
    return true;
}

return false; // để PHP phục vụ file như bình thường