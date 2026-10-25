<?php
require __DIR__ . '/auth.php';
require_login();
// require __DIR__ . '/../config/db.php';

$pdo = null;
$statuses = [
    'new'       => 'Mới',
    'contacted' => 'Đã liên hệ',
    'done'      => 'Hoàn tất',
    'cancelled' => 'Huỷ',
];

// Xử lý đổi trạng thái / xoá
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // check_csrf();
    // $id     = (int)($_POST['id'] ?? 0);
    // $action = $_POST['action'] ?? '';

    // if ($action === 'status' && isset($statuses[$_POST['status'] ?? ''])) {
    //     $pdo->prepare('UPDATE leads SET status = ? WHERE id = ?')
    //         ->execute([$_POST['status'], $id]);
    // } elseif ($action === 'delete') {
    //     $pdo->prepare('DELETE FROM leads WHERE id = ?')->execute([$id]);
    // }
    header('Location: ' . $_SERVER['REQUEST_URI']);
    exit;
}

// Lọc + tìm kiếm
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
// $stmt = $pdo->prepare($sql);
// $stmt->execute($params);
$leads = [];

// $counts = $pdo->query('SELECT status, COUNT(*) FROM leads GROUP BY status')
//               ->fetchAll(PDO::FETCH_KEY_PAIR);
$counts = [];
$total = 0;
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quản lý khách · Kèo Cưới</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
<style>
  .bar{display:flex;justify-content:space-between;align-items:center;padding:18px 0;gap:16px;flex-wrap:wrap}
  .bar h1{font-family:"Playfair Display",serif;font-weight:500;margin:0}
  .tabs{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0 18px}
  .tabs a{padding:8px 14px;border-radius:999px;border:1px solid var(--line);background:var(--paper);font-size:13px}
  .tabs a.active{background:var(--terra);color:#fff;border-color:var(--terra)}
  .search{display:flex;gap:8px;margin-bottom:18px}
  .search input{flex:1;max-width:320px;border:1px solid var(--line);border-radius:10px;padding:10px 12px}
  .table-wrap{overflow-x:auto;background:var(--paper);border-radius:var(--radius);box-shadow:var(--shadow);margin-bottom:40px}
  table{width:100%;border-collapse:collapse;font-size:13px;min-width:900px}
  th,td{padding:14px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
  select.st{padding:6px 8px;border-radius:8px;border:1px solid var(--line)}
  .del{background:none;border:0;color:var(--terra-dark);cursor:pointer;font-weight:700}
  .msg{max-width:260px;color:var(--muted)}
</style>
</head>
<body>
<div class="wrap">
  <div class="bar">
    <h1>Khách liên hệ (<?= (int)$total ?>)</h1>
    <div>
      Xin chào, <strong><?= e($_SESSION['admin_name']) ?></strong> ·
      <a class="text-link" href="faqs.php">Quản lý FAQ</a> ·
      <a class="text-link" href="services.php">Quản lý Dịch vụ</a> ·
      <a class="text-link" href="logout.php">Đăng xuất</a>
    </div>
  </div>

  <div class="tabs">
    <a href="index.php" class="<?= $filter === '' ? 'active' : '' ?>">Tất cả</a>
    <?php foreach ($statuses as $key => $label): ?>
      <a href="?status=<?= e($key) ?>" class="<?= $filter === $key ? 'active' : '' ?>">
        <?= e($label) ?> (<?= (int)($counts[$key] ?? 0) ?>)
      </a>
    <?php endforeach; ?>
  </div>

  <form class="search" method="get">
    <?php if ($filter): ?><input type="hidden" name="status" value="<?= e($filter) ?>"><?php endif; ?>
    <input name="q" value="<?= e($q) ?>" placeholder="Tìm theo tên hoặc số điện thoại">
    <button class="btn" type="submit">Tìm</button>
    <a class="btn btn-outline" href="export.php?<?= e(http_build_query(['status' => $filter, 'q' => $q])) ?>">Xuất CSV</a>
  </form>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Ngày gửi</th><th>Khách</th><th>Ngày cưới</th><th>Ngân sách</th>
          <th>Dịch vụ</th><th>Lời nhắn</th><th>Trạng thái</th><th></th>
        </tr>
      </thead>
      <tbody>
      <?php if (!$leads): ?>
        <tr><td colspan="8">Chưa có dữ liệu.</td></tr>
      <?php endif; ?>
      <?php foreach ($leads as $l): ?>
        <tr>
          <td><?= e(date('d/m/Y H:i', strtotime($l['created_at']))) ?></td>
          <td>
            <strong><?= e($l['name']) ?></strong><br>
            <a href="tel:<?= e($l['phone']) ?>"><?= e($l['phone']) ?></a>
          </td>
          <td><?= $l['wedding_date'] ? e(date('d/m/Y', strtotime($l['wedding_date']))) : '—' ?></td>
          <td><?= e($l['budget'] ?: '—') ?></td>
          <td><?= e($l['service'] ?: '—') ?></td>
          <td class="msg"><?= nl2br(e($l['message'] ?: '—')) ?></td>
          <td>
            <form method="post">
              <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
              <input type="hidden" name="action" value="status">
              <input type="hidden" name="id" value="<?= (int)$l['id'] ?>">
              <select class="st" name="status" onchange="this.form.submit()">
                <?php foreach ($statuses as $key => $label): ?>
                  <option value="<?= e($key) ?>" <?= $l['status'] === $key ? 'selected' : '' ?>>
                    <?= e($label) ?>
                  </option>
                <?php endforeach; ?>
              </select>
            </form>
          </td>
          <td>
            <form method="post" onsubmit="return confirm('Xoá khách này?')">
              <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
              <input type="hidden" name="action" value="delete">
              <input type="hidden" name="id" value="<?= (int)$l['id'] ?>">
              <button class="del" type="submit">Xoá</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>