import ContactForm from "./ContactForm";

export const metadata = {
  title: "Liên hệ — Kèo Cưới",
};

export default function Page() {
  return (
    <section className="section contact" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">Let&apos;s make it yours</span>
          <h2>Kể tụi mình nghe về ngày của bạn.</h2>
          <p>Chưa cần quyết định ngay. Hãy bắt đầu bằng vài thông tin cơ bản, Kèo Cưới sẽ cùng bạn tìm hướng đi phù hợp.</p>
          <div className="contact-details">
            <span>♡ &nbsp; Lắng nghe trước khi đề xuất</span>
            <span>✳ &nbsp; Linh hoạt theo nhu cầu thực tế</span>
            <span>⌁ &nbsp; Rõ ràng về phạm vi công việc</span>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}