<?php
// require __DIR__ . '/config/db.php';

$page  = 'faq';
$title = 'FAQs — Kèo Cưới';

try {
    // $faqs = db()->query('SELECT question, answer FROM faqs WHERE is_active = 1 ORDER BY sort_order, id')->fetchAll();
    $faqs = [];
} catch (Throwable $e) {
    // error_log($e->getMessage());
    $faqs = [];
}

function h($s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

require __DIR__ . '/includes/header.php';
?>

<section class="section section-paper" id="faq">
  <div class="wrap faq-grid">
    <div class="faq-intro">
      <span class="eyebrow">Good to know</span>
      <h2 style="font-family:'Playfair Display',serif;font-size:43px;line-height:1.1;font-weight:500;margin:14px 0">Bạn đang thắc mắc?</h2>
      <p>Tụi mình muốn mọi thứ rõ ràng và dễ bắt đầu nhất có thể.</p>
      <a class="text-link" href="lien-he.php">Hỏi tụi mình một câu ↗</a>
    </div>
    <div>
      <?php if (!$faqs): ?>
        <p>Các câu hỏi thường gặp đang được cập nhật.</p>
      <?php endif; ?>
      <?php foreach ($faqs as $f): ?>
        <div class="faq-item">
          <button aria-expanded="false">
            <span><?= h($f['question']) ?></span>
            <span>＋</span>
          </button>
          <div class="faq-answer"><?= nl2br(h($f['answer'])) ?></div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>