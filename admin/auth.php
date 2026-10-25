<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'secure'   => !empty($_SERVER['HTTPS']), // chỉ gửi cookie qua HTTPS khi có HTTPS
    'httponly' => true,                      // JavaScript không đọc được cookie
    'samesite' => 'Lax',
]);

session_start();

// Chống XSS: luôn dùng e() khi in dữ liệu ra HTML
function e($s): string {
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
}

// Chưa đăng nhập thì đưa về trang login
function require_login(): void {
    if (empty($_SESSION['admin_id'])) {
        header('Location: login.php');
        exit;
    }
}

// Chống CSRF cho các form POST
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function check_csrf(): void {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(419);
        exit('Phiên làm việc không hợp lệ, hãy tải lại trang.');
    }
}