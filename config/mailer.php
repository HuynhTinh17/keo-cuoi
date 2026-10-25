<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../libs/PHPMailer/src/Exception.php';
require_once __DIR__ . '/../libs/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../libs/PHPMailer/src/SMTP.php';
require_once __DIR__ . '/mail.php';

function send_lead_mail(array $lead): bool {
    $mail = new PHPMailer(true);
    try {
        // Kết nối Gmail
        $mail->isSMTP();
        $mail->Host       = MAIL_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = MAIL_USER;
        $mail->Password   = MAIL_PASS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = MAIL_PORT;
        $mail->CharSet    = 'UTF-8';
        $mail->Timeout    = 10; // quá 10 giây thì bỏ cuộc, tránh khách phải chờ lâu

        // Người gửi và người nhận
        $mail->setFrom(MAIL_USER, MAIL_FROM_NAME);
        $mail->addAddress(MAIL_TO);

        // Nội dung
        $mail->isHTML(false);
        $mail->Subject = 'Khách mới: ' . $lead['name'];
        $mail->Body =
            "Có khách mới vừa gửi form liên hệ:\n\n" .
            "Tên: "        . $lead['name'] . "\n" .
            "SĐT/Zalo: "   . $lead['phone'] . "\n" .
            "Ngày cưới: "  . ($lead['date']    ?: '—') . "\n" .
            "Ngân sách: "  . ($lead['budget']  ?: '—') . "\n" .
            "Dịch vụ: "    . ($lead['service'] ?: '—') . "\n" .
            "Lời nhắn:\n"  . ($lead['message'] ?: '—') . "\n\n" .
            "Thời gian: "  . date('d/m/Y H:i') . "\n";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('Mail error: ' . $mail->ErrorInfo);
        return false;
    }
}