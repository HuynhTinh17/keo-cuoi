<?php
$page  = $page  ?? '';
$title = $title ?? 'Kèo Cưới — Đám cưới theo cách của bạn';
$desc  = $desc  ?? 'Kèo Cưới — wedding planning cá nhân hoá, linh hoạt theo câu chuyện, ngân sách và nhu cầu của bạn.';

function nav_active(string $key, string $page): string {
    return $key === $page ? ' class="active"' : '';
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#f7f1e7" />
<meta name="description" content="<?= htmlspecialchars($desc, ENT_QUOTES, 'UTF-8') ?>" />
<title><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<div class="announcement">YOUR DAY, YOUR WAY · LẬP KẾ HOẠCH CƯỚI THEO CÁCH CỦA BẠN</div>
<header class="nav">
  <div class="wrap nav-inner">
    <a class="logo" href="index.php" aria-label="Kèo Cưới - Trang chủ"><span class="logo-mark">k</span><span>Kèo Cưới<span style="color:var(--terra)">.</span></span></a>
    <button class="menu-toggle" aria-label="Mở menu" aria-expanded="false">☰</button>
    <nav class="nav-links" aria-label="Điều hướng chính">
      <a href="dich-vu.php"<?= nav_active('dich-vu', $page) ?>>Dịch vụ</a>
      <a href="ve-chung-toi.php"<?= nav_active('ve-chung-toi', $page) ?>>Về Kèo Cưới</a>
      <a href="quy-trinh.php"<?= nav_active('quy-trinh', $page) ?>>Cách tụi mình làm</a>
      <a href="faq.php"<?= nav_active('faq', $page) ?>>FAQs</a>
      <a class="btn" href="lien-he.php">Kể tụi mình nghe <span>↗</span></a>
    </nav>
  </div>
</header>
<main></main>