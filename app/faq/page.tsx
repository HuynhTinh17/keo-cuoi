export const metadata = {
  title: "FAQs — Kèo Cưới",
};

export default function Page() {
  return (
    <section className="section section-paper" id="faq">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <span className="eyebrow">Good to know</span>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:43,lineHeight:1.1,fontWeight:500,margin:"14px 0"}}>Bạn đang thắc mắc?</h2>
          <p>Tụi mình muốn mọi thứ rõ ràng và dễ bắt đầu nhất có thể.</p>
          <a className="text-link" href="/lien-he">Hỏi tụi mình một câu ↗</a>
        </div>
        <div>
          <p>Các câu hỏi thường gặp đang được cập nhật.</p>
        </div>
      </div>
    </section>
  );
}
