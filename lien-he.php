<?php
require __DIR__ . '/config/db.php';

$page  = 'lien-he';
$title = 'Liên hệ — Kèo Cưới';

try {
    $svcTitles = db()->query('SELECT title FROM services WHERE is_active = 1 ORDER BY sort_order, id')
                     ->fetchAll(PDO::FETCH_COLUMN);
} catch (Throwable $e) {
    error_log($e->getMessage());
    $svcTitles = [];
}

require __DIR__ . '/includes/header.php';
?>

<section class="section contact" id="contact">
  <div class="wrap contact-grid">
    <div class="contact-copy">
      <span class="eyebrow">Let's make it yours</span>
      <h2>Kể tụi mình nghe về ngày của bạn.</h2>
      <p>Chưa cần quyết định ngay. Hãy bắt đầu bằng vài thông tin cơ bản, Kèo Cưới sẽ cùng bạn tìm hướng đi phù hợp.</p>
      <div class="contact-details">
        <span>♡ &nbsp; Lắng nghe trước khi đề xuất</span>
        <span>✳ &nbsp; Linh hoạt theo nhu cầu thực tế</span>
        <span>⌁ &nbsp; Rõ ràng về phạm vi công việc</span>
      </div>
    </div>

    <form class="contact-form" id="leadForm">
      <!-- Ô chống spam, người dùng không thấy -->
      <input type="text" name="website" tabindex="-1" autocomplete="off"
             style="position:absolute;left:-9999px" aria-hidden="true">

      <div class="form-grid">
        <div class="field">
          <label for="name">Tên của bạn *</label>
          <input id="name" name="name" placeholder="Tên bạn" required>
        </div>
        <div class="field">
          <label for="phone">Số điện thoại / Zalo *</label>
          <input id="phone" name="phone" placeholder="09xx xxx xxx" required>
        </div>
        <div class="field">
          <label for="date">Ngày cưới dự kiến</label>
          <input id="date" name="date" type="date">
        </div>
        <div class="field">
          <label for="budget">Ngân sách dự kiến</label>
          <select id="budget" name="budget">
            <option value="">Chọn khoảng ngân sách</option>
            <option>Dưới 50 triệu</option>
            <option>50–100 triệu</option>
            <option>100–200 triệu</option>
            <option>Trên 200 triệu</option>
            <option>Chưa xác định</option>
          </select>
        </div>
        <div class="field full">
          <label for="service">Bạn đang cần hỗ trợ gì?</label>
          <select id="service" name="service">
  <option value="">Chọn dịch vụ quan tâm</option>
  <?php foreach ($svcTitles as $t): ?>
    <option><?= htmlspecialchars($t, ENT_QUOTES, 'UTF-8') ?></option>
  <?php endforeach; ?>
  <option>Mình chưa rõ, cần tư vấn</option>
</select>
        </div>
        <div class="field full">
          <label for="message">Điều bạn muốn Kèo Cưới biết thêm</label>
          <textarea id="message" name="message" placeholder="Phong cách yêu thích, số khách dự kiến, điều quan trọng nhất với hai bạn..."></textarea>
        </div>
      </div>

      <button class="btn" type="submit">Gửi lời nhắn cho Kèo Cưới <span>↗</span></button>
      <p class="form-note">Thông tin của bạn chỉ dùng để Kèo Cưới liên hệ tư vấn.</p>
      <div class="form-success" id="formSuccess" role="status"></div>
    </form>
  </div>
</section>

<?php require __DIR__ . '/includes/footer.php'; ?>