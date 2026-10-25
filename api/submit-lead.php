<?php
header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/../config/db.php';

function out(bool $ok, string $message, int $code = 200): void {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    out(false, 'Yêu cầu không hợp lệ.', 405);
}

// Chống bot: ô ẩn "website" phải để trống
if (!empty($_POST['website'])) {
    out(true, 'Cảm ơn bạn!');
}

$name    = trim($_POST['name'] ?? '');
$phone   = preg_replace('/[\s\.\-]/', '', trim($_POST['phone'] ?? ''));
$date    = trim($_POST['date'] ?? '');
$budget  = trim($_POST['budget'] ?? '');
$service = trim($_POST['service'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || mb_strlen($name) > 100) {
    out(false, 'Vui lòng nhập tên của bạn.', 422);
}
if (!preg_match('/^(0|\+84)\d{9,10}$/', $phone)) {
    out(false, 'Số điện thoại chưa đúng định dạng.', 422);
}
if ($date !== '') {
    $d = DateTime::createFromFormat('Y-m-d', $date);
    if (!$d || $d->format('Y-m-d') !== $date) {
        out(false, 'Ngày cưới không hợp lệ.', 422);
    }
} else {
    $date = null;
}
if (mb_strlen($message) > 2000) {
    out(false, 'Lời nhắn hơi dài, bạn rút gọn giúp tụi mình nhé.', 422);
}

// 1) Lưu vào database
try {
    $stmt = db()->prepare(
        'INSERT INTO leads (name, phone, wedding_date, budget, service, message)
         VALUES (?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $name,
        $phone,
        $date,
        mb_substr($budget, 0, 50)   ?: null,
        mb_substr($service, 0, 100) ?: null,
        $message ?: null,
    ]);
} catch (Throwable $e) {
    error_log($e->getMessage());
    out(false, 'Có lỗi xảy ra, bạn thử lại sau nhé.', 500);
}

// 2) Gửi email báo (lỗi email KHÔNG làm hỏng việc lưu khách)
try {
    require_once __DIR__ . '/../config/mailer.php';
    $sent = send_lead_mail([
        'name'    => $name,
        'phone'   => $phone,
        'date'    => $date,
        'budget'  => $budget,
        'service' => $service,
        'message' => $message,
    ]);
    error_log('send_lead_mail: ' . ($sent ? 'OK' : 'FAIL'));
} catch (Throwable $e) {
    error_log('Mail error: ' . $e->getMessage());
}

out(true, 'Cảm ơn bạn đã chia sẻ! Kèo Cưới sẽ liên hệ với bạn sớm nhất.');