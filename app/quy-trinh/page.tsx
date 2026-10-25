export const metadata = {
  title: "Cách tụi mình làm — Kèo Cưới",
};

export default function Page() {
  return (
    <section className="section section-paper" id="process">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Simple, clear, collaborative</span>
            <h2>Từ “tụi mình muốn…”<br />đến ngày thật vui.</h2>
          </div>
          <p>Một quy trình rõ ràng để bạn luôn biết điều gì đang diễn ra, ai đang phụ trách và bước tiếp theo là gì.</p>
        </div>

        <div className="steps">
          <div className="step">
            <span className="step-no">01</span>
            <h3>Ngồi xuống trò chuyện</h3>
            <p>Tìm hiểu câu chuyện, mong muốn, ngân sách và những điều bạn muốn giữ lại trong ngày cưới.</p>
          </div>
          <div className="step">
            <span className="step-no">02</span>
            <h3>Chọn phạm vi phù hợp</h3>
            <p>Thống nhất dịch vụ, đầu việc, mốc thời gian và cách phối hợp — rõ ràng ngay từ đầu.</p>
          </div>
          <div className="step">
            <span className="step-no">03</span>
            <h3>Cùng nhau chuẩn bị</h3>
            <p>Phát triển ý tưởng, kết nối nhà cung cấp và cập nhật kế hoạch theo từng cột mốc.</p>
          </div>
          <div className="step">
            <span className="step-no">04</span>
            <h3>Tận hưởng ngày vui</h3>
            <p>Tụi mình hỗ trợ theo phạm vi đã thống nhất để bạn có thêm thời gian ở bên người thương.</p>
          </div>
        </div>

        <div className="flex-banner">
          <div>
            <strong>Sẵn sàng bắt đầu bước đầu tiên?</strong>
            <p>Chỉ cần một cuộc trò chuyện, chưa cần quyết định gì ngay.</p>
          </div>
          <a className="btn" href="/lien-he">Kể tụi mình nghe ↗</a>
        </div>
      </div>
    </section>
  );
}
