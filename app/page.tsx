export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Wedding planning, made personal</span>
            <h1>
              Đám cưới của bạn.<br />
              <em>Không phải bản sao.</em>
            </h1>
            <p className="hero-copy">Một ngày thật giống hai bạn — từ chiếc nơ trên bó hoa đến cách cả nhà cùng nâng ly. Kèo Cưới giúp bạn biến những điều rất riêng thành một ngày đáng nhớ, theo đúng nhu cầu và ngân sách của mình.</p>
            <div className="hero-actions">
              <a className="btn" href="/dich-vu">Tìm dịch vụ phù hợp <span>↗</span></a>
              <a className="btn btn-outline" href="/ve-chung-toi">Khám phá Kèo Cưới</a>
            </div>
            <div className="micro-proof">
              <div className="avatars">
                <span>♡</span>
                <span>✿</span>
                <span>✦</span>
              </div>
              <span>
                Không có một công thức chung cho tình yêu.<br />Vậy nên đám cưới cũng không cần giống nhau.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img className="hero-photo" src="/assets/img/hero.jpg" alt="Không gian tiệc cưới ấm áp với hoa và ánh nến" />
            <div className="hero-note">
              <span className="note-top">A little reminder</span>
              <p>Ngày cưới là của hai bạn. Hãy làm nó thật riêng.</p>
            </div>
            <div className="hero-stamp">
              made with<br />♡ &amp; intention
            </div>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Start exploring</span>
              <h2>Bắt đầu từ<br />điều bạn quan tâm.</h2>
            </div>
            <p>Chọn một hướng để xem kỹ hơn. Tụi mình luôn sẵn sàng lắng nghe, dù bạn mới chỉ có vài ý tưởng đầu tiên.</p>
          </div>

          <div className="service-grid">
            <article className="service-card featured">
              <div className="service-top">
                <span className="service-icon">✿</span>
                <span className="service-number">01 / DỊCH VỤ</span>
              </div>
              <h3>Dịch vụ</h3>
              <p>Từ Full Planning đến Day-of Coordination, chọn đúng phần bạn cần.</p>
              <div className="service-bottom">
                <span>5 mức hỗ trợ linh hoạt</span>
                <a className="text-link" href="/dich-vu">Xem dịch vụ ↗</a>
              </div>
            </article>

            <article className="service-card">
              <div className="service-top">
                <span className="service-icon">♡</span>
                <span className="service-number">02 / VỀ CHÚNG TÔI</span>
              </div>
              <h3>Về Kèo Cưới</h3>
              <p>Cá nhân hoá trước, xu hướng sau. Đây là cách tụi mình nghĩ về đám cưới.</p>
              <div className="service-bottom">
                <span>Câu chuyện của tụi mình</span>
                <a className="text-link" href="/ve-chung-toi">Khám phá ↗</a>
              </div>
            </article>

            <article className="service-card">
              <div className="service-top">
                <span className="service-icon">◷</span>
                <span className="service-number">03 / QUY TRÌNH</span>
              </div>
              <h3>Cách tụi mình làm</h3>
              <p>4 bước rõ ràng từ lần trò chuyện đầu tiên đến ngày vui.</p>
              <div className="service-bottom">
                <span>Minh bạch từng bước</span>
                <a className="text-link" href="/quy-trinh">Xem quy trình ↗</a>
              </div>
            </article>
          </div>

          <div className="flex-banner">
            <div>
              <strong>Chưa biết bắt đầu từ đâu?</strong>
              <p>Chỉ cần kể vài điều về ngày của bạn, tụi mình sẽ cùng gỡ từng bước.</p>
            </div>
            <a className="btn" href="/lien-he">Kể tụi mình nghe ↗</a>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-mark">“</div>
        <blockquote>Ngày cưới không cần làm hài lòng tất cả mọi người. Ngày cưới nên khiến hai bạn mỉm cười và nghĩ: “Đúng là tụi mình rồi.”</blockquote>
        <p>— Một lời hứa từ Kèo Cưới —</p>
      </section>
    </>
  );
}
