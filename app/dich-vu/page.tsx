export const metadata = {
  title: "Dịch vụ — Kèo Cưới",
};

export default function Page() {
  return (
    <section className="section section-paper" id="services">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Pick what you need</span>
            <h2>Đúng dịch vụ.<br />Đúng câu chuyện.</h2>
          </div>
          <p>Bạn không cần mua một gói trọn vẹn nếu chỉ cần người giúp lên concept hay điều phối ngày cưới. Chọn phần phù hợp — tụi mình cùng hoàn thiện phần còn lại.</p>
        </div>

        <p>Các dịch vụ đang được cập nhật. Bạn hãy <a className="text-link" href="/lien-he">liên hệ tụi mình</a> để được tư vấn nhé.</p>

        <div className="flex-banner">
          <div>
            <strong>Một hạng mục nhỏ cũng xứng đáng được chăm chút.</strong>
            <p>Chọn đúng mức hỗ trợ bạn cần — không phải trả cho những thứ bạn không cần.</p>
          </div>
          <a className="btn" href="/lien-he">Cùng chọn dịch vụ ↗</a>
        </div>
      </div>
    </section>
  );
}
