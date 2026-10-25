export const metadata = {
  title: "Về Kèo Cưới — Đám cưới theo cách của bạn",
};

export default function Page() {
  return (
    <>
      <section className="section" id="about">
        <div className="wrap story-grid">
          <div className="story-photo-wrap">
            <img className="story-photo" src="/assets/img/about.jpg" alt="Cô dâu chú rể trong khoảnh khắc riêng tư" />
            <div className="photo-tag">Chỉn chu trong từng chi tiết. Tự do trong cách thể hiện.</div>
          </div>
          <div className="story">
            <span className="eyebrow">Not just pretty. Personal.</span>
            <h2>Tụi mình không lên kế hoạch cho “một đám cưới đẹp”.</h2>
            <p>Tụi mình lên kế hoạch cho <strong>đám cưới của bạn</strong>. Có thể thân mật trong khu vườn, rộn ràng ở nhà hàng, tối giản mà ấm cúng — điều quan trọng không phải trông giống ai, mà là hai bạn thấy mình trong từng lựa chọn.</p>
            <div className="principles">
              <div className="principle">
                <span className="principle-icon">♡</span>
                <div>
                  <h3>Cá nhân hoá trước, xu hướng sau</h3>
                  <p>Sở thích, câu chuyện và ưu tiên của bạn là điểm bắt đầu; trend chỉ là nguồn cảm hứng.</p>
                </div>
              </div>
              <div className="principle">
                <span className="principle-icon">↗</span>
                <div>
                  <h3>Linh hoạt, không ép package</h3>
                  <p>Chọn dịch vụ theo mức độ hỗ trợ cần thiết, với phạm vi công việc rõ ràng.</p>
                </div>
              </div>
              <div className="principle">
                <span className="principle-icon">✳</span>
                <div>
                  <h3>Ngân sách có tiếng nói</h3>
                  <p>Cùng xác định điều đáng đầu tư và những phần có thể tối giản — không phán xét lựa chọn của bạn.</p>
                </div>
              </div>
            </div>
            <a className="btn" href="/quy-trinh">Xem cách tụi mình làm việc ↗</a>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="section-head">
            <div>
              <span className="eyebrow">Little details, big feelings</span>
              <h2>Những điều nhỏ,<br />mang dấu ấn của hai bạn.</h2>
            </div>
            <p>Không cần xa hoa để đáng nhớ. Đôi khi, một chi tiết đúng chất mình đã đủ làm ngày cưới trở nên đặc biệt.</p>
          </div>
          <div className="gallery-grid">
            <img src="/assets/img/gallery-1.jpg" alt="Hoa cưới và trang trí bàn tiệc" />
            <img src="/assets/img/gallery-2.jpg" alt="Không gian tiệc cưới ngoài trời" />
            <img src="/assets/img/gallery-3.jpg" alt="Chi tiết trang trí tiệc cưới" />
            <img src="/assets/img/gallery-4.jpg" alt="Bàn tiệc cưới với hoa và nến" />
          </div>
        </div>
      </section>
    </>
  );
}
