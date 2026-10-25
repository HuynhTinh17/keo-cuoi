<?php
// require __DIR__ . '/config/db.php';

$page  = 'dich-vu';
$title = 'Dịch vụ — Kèo Cưới';

try {
    // $services = db()->query('SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order, id')->fetchAll();
    $services = [];
} catch (Throwable $e) {
    // error_log($e->getMessage());
    $services = [];
}

function h($s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

require __DIR__ . '/includes/header.php';
?>

<section class="section section-paper" id="services">
  <div class="wrap">
    <div class="section-head">
      <div>
        <span class="eyebrow">Pick what you need</span>
        <h2>Đúng dịch vụ.<br>Đúng câu chuyện.</h2>
      </div>
      <p>Bạn không cần mua một gói trọn vẹn nếu chỉ cần người giúp lên concept hay điều phối ngày cưới. Chọn phần phù hợp — tụi mình cùng hoàn thiện phần còn lại.</p>
    </div>

    <?php if (!$services): ?>
      <p>Các dịch vụ đang được cập nhật. Bạn hãy <a class="text-link" href="lien-he.php">liên hệ tụi mình</a> để được tư vấn nhé.</p>
    <?php endif; ?>

    <div class="service-grid">
      <?php foreach ($services as $s):
        $cls = 'service-card';
        if ($s['card_style'] === 'featured') $cls .= ' featured';
        if ($s['card_style'] === 'soft')     $cls .= ' soft';
      ?>
        <article class="<?= $cls ?>">
          <div class="service-top">
            <span class="service-icon"><?= h($s['icon']) ?></span>
            <span class="service-number"><?= h($s['label']) ?></span>
          </div>
          <h3><?= h($s['title']) ?></h3>
          <p><?= h($s['description']) ?></p>
          <div class="service-bottom">
            <span><?= h($s['footer_text']) ?></span>
            <a class="text-link" href="lien-he.php"><?= h($s['link_text']) ?></a>
          </div>
        </article>
      <?php endforeach; ?>
    </div>

    <div class="flex-banner">
      <div>
        <strong>Một hạng mục nhỏ cũng xứng đáng được chăm chút.</strong>
        <p>Chọn đúng mức hỗ trợ bạn cần — không phải trả cho những thứ bạn không cần.</p>
      </div>
      <a class="btn" href="lien-he.php">Cùng chọn dịch vụ ↗</a>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>