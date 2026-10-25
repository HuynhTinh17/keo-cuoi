<?php
require __DIR__ . '/auth.php';
require_login();
// require __DIR__ . '/../config/db.php';

$statuses = [
    'new'       => 'Mới',
    'contacted' => 'Đã liên hệ',
    'done'      => 'Hoàn tất',
    'cancelled' => 'Huỷ',
];

// Giữ nguyên bộ lọc đang xem ở trang admin
$filter = $_GET['status'] ?? '';
$q      = trim($_GET['q'] ?? '');

// $sql    = 'SELECT * FROM leads WHERE 1';
// $params = [];
// if (isset($statuses[$filter])) {
//     $sql .= ' AND status = ?';
//     $params[] = $filter;
// }
// if ($q !== '') {
//     $sql .= ' AND (name LIKE ? OR phone LIKE ?)';
//     $params[] = "%$q%";
//     $params[] = "%$q%";
// }
// $sql .= ' ORDER BY created_at DESC';

// $stmt = db()->prepare($sql);
// $stmt->execute($params);
$stmt = null;

// Chặn "CSV injection": ô bắt đầu bằng = + - @ sẽ bị Excel hiểu là công thức
function csv_safe($v): string {
    $v = (string)$v;
    return preg_match('/^[=+\-@\t\r]/', $v) ? "'" . $v : $v;
}

header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename="khach-lien-he-' . date('Y-m-d') . '.csv"');

$out = fopen('php://output', 'w');
fwrite($out, "\xEF\xBB\xBF"); // BOM để Excel đọc đúng tiếng Việt

fputcsv($out, ['Ngày gửi', 'Tên', 'Số điện thoại', 'Ngày cưới', 'Ngân sách', 'Dịch vụ', 'Lời nhắn', 'Trạng thái'], ',', '"', '\\');

if ($stmt) {
    while ($l = $stmt->fetch()) {
        fputcsv($out, [
            date('d/m/Y H:i', strtotime($l['created_at'])),
            csv_safe($l['name']),
            "\t" . $l['phone'],            // dấu tab giữ số 0 ở đầu số điện thoại
            $l['wedding_date'] ?? '',
            csv_safe($l['budget'] ?? ''),
            csv_safe($l['service'] ?? ''),
            csv_safe($l['message'] ?? ''),
            $statuses[$l['status']] ?? $l['status'],
        ], ',', '"', '\\');
    }
}

fclose($out);