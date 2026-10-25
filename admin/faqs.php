<?php
require __DIR__ . '/auth.php';
require_login();
// require __DIR__ . '/../config/db.php';

$pdo   = null;
$error = '';
$edit  = ['id' => 0, 'question' => '', 'answer' => '', 'sort_order' => 0, 'is_active' => 1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // check_csrf();
    $action = $_POST['action'] ?? '';
    $id     = (int)($_POST['id'] ?? 0);

    if ($action === 'save') {
        $edit = [
            'id'         => $id,
            'question'   => trim($_POST['question'] ?? ''),
            'answer'     => trim($_POST['answer'] ?? ''),
            'sort_order' => (int)($_POST['sort_order'] ?? 0),
            'is_active'  => isset($_POST['is_active']) ? 1 : 0,
        ];
        if ($edit['question'] === '' || $edit['answer'] === '' || mb_strlen($edit['question']) > 255) {
            $error = 'Vui lòng nhập đủ câu hỏi (tối đa 255 ký tự) và câu trả lời.';
        } else {
            // if ($id > 0) {
            //     $pdo->prepare('UPDATE faqs SET question=?, answer=?, sort_order=?, is_active=? WHERE id=?')
            //         ->execute([$edit['question'], $edit['answer'], $edit['sort_order'], $edit['is_active'], $id]);
            // } else {
            //     $pdo->prepare('INSERT INTO faqs (question, answer, sort_order, is_active) VALUES (?, ?, ?, ?)')
            //         ->execute([$edit['question'], $edit['answer'], $edit['sort_order'], $edit['is_active']]);
            // }
            header('Location: faqs.php');
            exit;
        }
    } elseif ($action === 'delete') {
        // $pdo->prepare('DELETE FROM faqs WHERE id = ?')->execute([$id]);
        header('Location: faqs.php');
        exit;
    }
} elseif (isset($_GET['edit'])) {
    // $stmt = $pdo->prepare('SELECT * FROM faqs WHERE id = ?');
    // $stmt->execute([(int)$_GET['edit']]);
    // if ($row = $stmt->fetch()) {
    //     $edit = $row;
    // }
}

$faqs = [];
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quản lý FAQ · Kèo Cưới</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
<style>
  .bar{display:flex;justify-content:space-between;align-items:center;padding:18px 0;gap:16px;flex-wrap:wrap}
  .bar h1{font-family:"Playfair Display",serif;font-weight:500;margin:0}
  .box{background:var(--paper);padding:24px;border-radius:var(--radius);box-shadow:var(--shadow);margin-bottom:28px}
  .box h2{font-family:"Playfair Display",serif;font-weight:500;margin:0 0 16px;font-size:24px}
  .box .field{margin-bottom:14px}
  .row{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
  .row .field{margin:0}
  .err{background:#f8e0da;color:#8e402e;padding:10px;border-radius:10px;font-size:13px;margin-bottom:14px}
  .table-wrap{overflow-x:auto;background:var(--paper);border-radius:var(--radius);box-shadow:var(--shadow);margin-bottom:40px}
  table{width:100%;border-collapse:collapse;font-size:13px;min-width:700px}
  th,td{padding:14px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
  .del{background:none;border:0;color:var(--terra-dark);cursor:pointer;font-weight:700}
  .off{opacity:.5}
  .actions{display:flex;gap:14px;align-items:center}
</style>
</head>
<body>
<div class="wrap">
  <div class="bar">
    <h1>Quản lý FAQ</h1>
    <div>
      <a class="text-link" href="index.php">← Khách liên hệ</a> ·
      <a class="text-link" href="services.php">Quản lý Dịch vụ</a> ·
      <a class="text-link" href="logout.php">Đăng xuất</a>
    </div>
  </div>

  <form class="box" method="post">
    <h2><?= $edit['id'] ? 'Sửa câu hỏi' : 'Thêm câu hỏi mới' ?></h2>
    <?php if ($error): ?><div class="err"><?= e($error) ?></div><?php endif; ?>
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= (int)$edit['id'] ?>">

    <div class="field">
      <label for="question">Câu hỏi</label>
      <input id="question" name="question" maxlength="255" value="<?= e($edit['question']) ?>" required>
    </div>
    <div class="field">
      <label for="answer">Câu trả lời</label>
      <textarea id="answer" name="answer" rows="4" required><?= e($edit['answer']) ?></textarea>
    </div>
    <div class="row">
      <div class="field">
        <label for="sort_order">Thứ tự (số nhỏ hiện trước)</label>
        <input id="sort_order" name="sort_order" type="number" value="<?= (int)$edit['sort_order'] ?>">
      </div>
      <label><input type="checkbox" name="is_active" <?= $edit['is_active'] ? 'checked' : '' ?>> Hiển thị trên website</label>
    </div>
    <div class="row" style="margin-top:18px">
      <button class="btn" type="submit"><?= $edit['id'] ? 'Lưu thay đổi' : 'Thêm câu hỏi' ?></button>
      <?php if ($edit['id']): ?><a class="text-link" href="faqs.php">Huỷ sửa</a><?php endif; ?>
    </div>
  </form>

  <div class="table-wrap">
    <table>
      <thead><tr><th>Thứ tự</th><th>Câu hỏi</th><th>Trạng thái</th><th></th></tr></thead>
      <tbody>
      <?php if (!$faqs): ?><tr><td colspan="4">Chưa có câu hỏi nào.</td></tr><?php endif; ?>
      <?php foreach ($faqs as $f): ?>
        <tr class="<?= $f['is_active'] ? '' : 'off' ?>">
          <td><?= (int)$f['sort_order'] ?></td>
          <td><strong><?= e($f['question']) ?></strong></td>
          <td><?= $f['is_active'] ? 'Đang hiện' : 'Đang ẩn' ?></td>
          <td>
            <div class="actions">
              <a class="text-link" href="?edit=<?= (int)$f['id'] ?>">Sửa</a>
              <form method="post" onsubmit="return confirm('Xoá câu hỏi này?')">
                <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="id" value="<?= (int)$f['id'] ?>">
                <button class="del" type="submit">Xoá</button>
              </form>
            </div>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>