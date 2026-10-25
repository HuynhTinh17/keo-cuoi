<?php
require __DIR__ . '/auth.php';
require __DIR__ . '/../config/db.php';

// Đã đăng nhập thì vào thẳng trang quản lý
if (!empty($_SESSION['admin_id'])) {
    header('Location: index.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = db()->prepare('SELECT * FROM admins WHERE username = ?');
    $stmt->execute([trim($_POST['username'] ?? '')]);
    $admin = $stmt->fetch();

    if ($admin && password_verify($_POST['password'] ?? '', $admin['password_hash'])) {
        session_regenerate_id(true);
        $_SESSION['admin_id']   = $admin['id'];
        $_SESSION['admin_name'] = $admin['username'];
        header('Location: index.php');
        exit;
    }
    $error = 'Sai tên đăng nhập hoặc mật khẩu.';
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Đăng nhập · Kèo Cưới Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/css/style.css">
<style>
  body{display:grid;place-items:center;min-height:100vh}
  .login-box{background:var(--paper);padding:32px;border-radius:var(--radius);box-shadow:var(--shadow);width:min(380px,90vw)}
  .login-box h1{font-family:"Playfair Display",serif;font-weight:500;margin:0 0 18px}
  .login-box .field{margin-bottom:14px}
  .err{background:#f8e0da;color:#8e402e;padding:10px;border-radius:10px;font-size:13px;margin-bottom:14px}
</style>
</head>
<body>
  <form class="login-box" method="post">
    <h1>Kèo Cưới Admin</h1>
    <?php if ($error): ?><div class="err"><?= e($error) ?></div><?php endif; ?>
    <div class="field">
      <label for="username">Tên đăng nhập</label>
      <input id="username" name="username" required autofocus>
    </div>
    <div class="field">
      <label for="password">Mật khẩu</label>
      <input id="password" name="password" type="password" required>
    </div>
    <button class="btn" type="submit" style="width:100%">Đăng nhập</button>
  </form>
</body>
</html>