<?php
require __DIR__ . '/auth.php';
require_login();
// require __DIR__ . '/../config/db.php';

$pdo = null;
$error = '';

$styles = [
    'normal'   => 'Thẻ thường (nền kem)',
    'featured' => 'Thẻ nổi bật (nền đất nung)',
    'soft'     => 'Thẻ nền kem đậm',
];

$edit = [
    'id'          => 0,
    'icon'        => '✿',
    'label'       => '',
    'title'       => '',
    'description' => '',
    'footer_text' => '',
    'link_text'   => 'Tìm hiểu ↗',
    'card_style'  => 'normal',
    'sort_order'  => 0,
    'is_active'   => 1,
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // check_csrf();
    $action = $_POST['action'] ?? '';
    $id     = (int)($_POST['id'] ?? 0);

    if ($action === 'save') {
        $edit = [
            'id'          => $id,
            'icon'        => trim($_POST['icon'] ?? ''),
            'label'       => trim($_POST['label'] ?? ''),
            'title'       => trim($_POST['title'] ?? ''),
            'description' => trim($_POST['description'] ?? ''),
            'footer_text' => trim($_POST['footer_text'] ?? ''),
            'link_text'   => trim($_POST['link_text'] ?? ''),
            'card_style'  => $_POST['card_style'] ?? 'normal',
            'sort_order'  => (int)($_POST['sort_order'] ?? 0),
            'is_active'   => isset($_POST['is_active']) ? 1 : 0,
        ];
        if (!isset($styles[$edit['card_style']])) {
            $edit['card_style'] = 'normal';
        }

        if ($edit['title'] === '' || $edit['description'] === '') {
            $error = 'Vui lòng nhập tiêu đề và mô tả.';
        } elseif (mb_strlen($edit['title']) > 150 || mb_strlen($edit['label']) > 50
               || mb_strlen($edit['icon']) > 10 || mb_strlen($edit['footer_text']) > 100
               || mb_strlen($edit['link_text']) > 50) {
            $error = 'Có ô nhập quá dài, bạn rút gọn giúp nhé.';
        } else {
            // $values = [
            //     $edit['icon'], $edit['label'], $edit['title'], $edit['description'],
            //     $edit['footer_text'], $edit['link_text'], $edit['card_style'],
            //     $edit['sort_order'], $edit['is_active'],
            // ];
            // if ($id > 0) {
            //     $pdo->prepare(
            //         'UPDATE services SET icon=?, label=?, title=?, description=?, footer_text=?,
            //          link_text=?, card_style=?, sort_order=?, is_active=? WHERE id=?'
            //     )->execute([...$values, $id]);
            // } else {
            //     $pdo->prepare(
            //         'INSERT INTO services (icon, label, title, description, footer_text,
            //          link_text, card_style, sort_order, is_active) VALUES (?,?,?,?,?,?,?,?,?)'
            //     )->execute($values);
            // }
            header('Location: services.php');
            exit;
        }
    } elseif ($action === 'delete') {
        // $pdo->prepare('DELETE FROM services WHERE id = ?')->execute([$id]);
        header('Location: services.php');
        exit;
    }
} elseif (isset($_GET['edit'])) {
    // $stmt = $pdo->prepare('SELECT * FROM services WHERE id = ?');
    // $stmt->execute([(int)$_GET['edit']]);
    // if ($row = $stmt->fetch()) {
    //     $edit = $row;
    // }
}

$services = [];
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Quản lý Dịch vụ · Kèo Cưới</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
<style>
  .bar{display:flex;justify-content:space-between;align-items:center;padding:18px 0;gap:16px;flex-wrap:wrap}
  .bar h1{font-family:"Playfair Display",serif;font-weight:500;margin:0}
  .box{background:var(--paper);padding:24px;border-radius:var(--radius);box-shadow:var(--shadow);margin-bottom:28px}
  .box h2{font-family:"Playfair Display",serif;font-weight:500;margin:0 0 16px;font-size:24px}
  .row{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
  .err{background:#f8e0da;color:#8e402e;padding:10px;border-radius:10px;font-size:13px;margin-bottom:14px}
  .table-wrap{overflow-x:auto;background:var(--paper);border-radius:var(--radius);box-shadow:var(--shadow);margin-bottom:40px}
  table{width:100%;border-collapse:collapse;font-size:13px;min-width:760px}
  th,td{padding:14px;text-align:left;border-bottom:1px solid var(--line);vertical-align:top}
  th{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
  .del{background:none;border:0;color:var(--terra-dark);cursor:pointer;font-weight:700}
  .off{opacity:.5}
  .actions{display:flex;gap:14px;align-items:center}
  .small{color:var(--muted);font-size:11px}
</style>
</head>
<body>
<div class="wrap">
  <div class="bar">
    <h1>Quản lý Dịch vụ</h1>
    <div>
      <a class="text-link" href="index.php">← Khách liên hệ</a> ·
      <a class="text-link" href="faqs.php">Quản lý FAQ</a> ·
      <a class="text-link" href="logout.php">Đăng xuất</a>
    </div>
  </div>

  <form class="box" method="post">
    <h2><?= $edit['id'] ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới' ?></h2>
    <?php if ($error): ?><div class="err"><?= e($error) ?></div><?php endif; ?>
    <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
    <input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= (int)$edit['id'] ?>">

    <div class="form-grid">
      <div class="field">
        <label for="icon">Biểu tượng (1 ký tự, ví dụ ✿ ♡ ✳)</label>
        <input id="icon" name="icon" maxlength="10" value="<?= e($edit['icon']) ?>">
      </div>
      <div class="field">
        <label for="label">Nhãn nhỏ (ví dụ 01 / FULL)</label>
        <input id="label" name="label" maxlength="50" value="<?= e($edit['label']) ?>">
      </div>
      <div class="field full">
        <label for="title">Tiêu đề *</label>
        <input id="title" name="title" maxlength="150" value="<?= e($edit['title']) ?>" required>
      </div>
      <div class="field full">
        <label for="description">Mô tả *</label>
        <textarea id="description" name="description" rows="3" required><?= e($edit['description']) ?></textarea>
      </div>
      <div class="field">
        <label for="footer_text">Dòng phụ phía dưới thẻ</label>
        <input id="footer_text" name="footer_text" maxlength="100" value="<?= e($edit['footer_text']) ?>">
      </div>
      <div class="field">
        <label for="link_text">Chữ trên nút liên kết</label>
        <input id="link_text" name="link_text" maxlength="50" value="<?= e($edit['link_text']) ?>">
      </div>
      <div class="field">
        <label for="card_style">Kiểu thẻ</label>
        <select id="card_style" name="card_style">
          <?php foreach ($styles as $key => $label): ?>
            <option value="<?= e($key) ?>" <?= $edit['card_style'] === $key ? 'selected' : '' ?>><?= e($label) ?></option>
          <?php endforeach; ?>
        </select>
      </div>
      <div class="field">
        <label for="sort_order">Thứ tự (số nhỏ hiện trước)</label>
        <input id="sort_order" name="sort_order" type="number" value="<?= (int)$edit['sort_order'] ?>">
      </div>
    </div>

    <div class="row" style="margin-top:16px">
      <label><input type="checkbox" name="is_active" <?= $edit['is_active'] ? 'checked' : '' ?>> Hiển thị trên website</label>
    </div>
    <div class="row" style="margin-top:18px">
      <button class="btn" type="submit" style="width:auto"><?= $edit['id'] ? 'Lưu thay đổi' : 'Thêm dịch vụ' ?></button>
      <?php if ($edit['id']): ?><a class="text-link" href="services.php">Huỷ sửa</a><?php endif; ?>
    </div>
  </form>

  <div class="table-wrap">
    <table>
      <thead>
        <tr><th>Thứ tự</th><th>Dịch vụ</th><th>Kiểu thẻ</th><th>Trạng thái</th><th></th></tr>
      </thead>
      <tbody>
      <?php if (!$services): ?><tr><td colspan="5">Chưa có dịch vụ nào.</td></tr><?php endif; ?>
      <?php foreach ($services as $s): ?>
        <tr class="<?= $s['is_active'] ? '' : 'off' ?>">
          <td><?= (int)$s['sort_order'] ?></td>
          <td>
            <strong><?= e($s['icon']) ?> <?= e($s['title']) ?></strong><br>
            <span class="small"><?= e($s['label']) ?></span>
          </td>
          <td><?= e($styles[$s['card_style']] ?? $s['card_style']) ?></td>
          <td><?= $s['is_active'] ? 'Đang hiện' : 'Đang ẩn' ?></td>
          <td>
            <div class="actions">
              <a class="text-link" href="?edit=<?= (int)$s['id'] ?>">Sửa</a>
              <form method="post" onsubmit="return confirm('Xoá dịch vụ này?')">
                <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
                <input type="hidden" name="action" value="delete">
                <input type="hidden" name="id" value="<?= (int)$s['id'] ?>">
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