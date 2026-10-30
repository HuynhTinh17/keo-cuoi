export const metadata = {
  title: "Dịch vụ — Kèo Cưới",
};

const services = [
  {
    number: "01",
    icon: "✦",
    label: "Full-service Wedding Planning",
    title: "Dịch vụ trọn gói",
    items: [
      {
        heading: "Lộ trình từ A đến Z",
        body: "Đồng hành cùng cô dâu chú rể từ ngày đầu tiên lên ý tưởng, lập ngân sách, chọn ngày tốt, chọn địa điểm — cho đến khi kết thúc buổi tiệc.",
      },
      {
        heading: "Quản lý toàn diện",
        body: "Thay mặt dâu rể làm việc, thương lượng và ký kết hợp đồng với tất cả nhà cung cấp: vocalist, thợ chụp ảnh, trang trí, makeup, âm thanh ánh sáng...",
      },
    ],
    featured: true,
  },
  {
    number: "02",
    icon: "✿",
    label: "Wedding Design & Styling",
    title: "Thiết kế & trang trí",
    items: [
      {
        heading: "Concept độc quyền",
        body: "Xây dựng phong cách, màu sắc chủ đạo và câu chuyện tình yêu riêng biệt cho từng cặp đôi.",
      },
      {
        heading: "Thiết kế không gian",
        body: "Khu vực làm lễ, bàn gallery, backdrop chụp ảnh, sân khấu và table setting.",
      },
      {
        heading: "In ấn phẩm cưới",
        body: "Thiệp cưới, menu, bảng welcome, bảng chương trình mang đậm dấu ấn cá nhân.",
      },
    ],
    featured: false,
  },
  {
    number: "03",
    icon: "◷",
    label: "On-the-day Coordination",
    title: "Điều phối ngày cưới",
    items: [
      {
        heading: "Kịch bản chạy mượt mà",
        body: "Đội ngũ điều phối có mặt từ sáng sớm để kiểm tra tiến độ, đôn đốc nhà hàng, makeup, thợ quay chụp, âm thanh.",
      },
      {
        heading: "Xử lý sự cố phát sinh",
        body: "Giải quyết các vấn đề bất ngờ để cô dâu chú rể và hai bên gia đình hoàn toàn thảnh thơi tận hưởng ngày vui.",
      },
    ],
    featured: false,
  },
  {
    number: "04",
    icon: "♡",
    label: "Traditional & Engagement Rituals",
    title: "Lễ cưới truyền thống",
    items: [
      {
        heading: "Lễ Ăn Hỏi / Dạm Ngõ",
        body: "Hướng dẫn nghi thức chuẩn truyền thống ba miền, chuẩn bị mâm quả, đội bưng tráp, sắp xếp trật tự nghi lễ gia tiên.",
      },
      {
        heading: "Lễ Vu Quy / Tân Hôn",
        body: "Đảm bảo các nghi thức truyền thống diễn ra trang trọng, đúng phong tục nhưng gọn gàng và hiện đại.",
      },
    ],
    featured: false,
  },
  {
    number: "05",
    icon: "◈",
    label: "A-la-carte / Add-on Services",
    title: "Dịch vụ bổ trợ",
    items: [
      {
        heading: "Pre-wedding",
        body: "Tư vấn và sắp xếp ekip chụp ảnh cưới, quay phim phóng sự cưới, thiết kế trang phục cưới.",
      },
      {
        heading: "Bridal Shower / Bachelor Party",
        body: "Tổ chức tiệc thân mật ấm cúng cho nhóm bạn thân trước ngày cưới chính thức.",
      },
      {
        heading: "Giải trí & Biểu diễn",
        body: "MC dẫn chương trình, ban nhạc acoustic, vũ đoàn, DJ hoặc các tiết mục bất ngờ theo yêu cầu.",
      },
    ],
    featured: false,
  },
];

export default function Page() {
  return (
    <section className="section section-paper" id="services">
      <div className="wrap">
        {/* Header */}
        <div className="section-head">
          <div>
            <span className="eyebrow">Pick what you need</span>
            <h2>
              Đúng dịch vụ.<br />Đúng câu chuyện.
            </h2>
          </div>
          <p>
            Bạn không cần mua một gói trọn vẹn nếu chỉ cần người giúp lên concept hay điều phối ngày cưới.
            Chọn phần phù hợp — tụi mình cùng hoàn thiện phần còn lại.
          </p>
        </div>

        {/* Service cards */}
        <div style={{ display: "grid", gap: 16 }}>
          {/* Row 1: featured card full-width */}
          {services.slice(0, 1).map((s) => (
            <article
              key={s.number}
              className="service-card featured"
              style={{ minHeight: "auto", padding: "32px 36px" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 auto" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span className="service-icon" style={{ background: "rgba(255,255,255,.15)", color: "#fff", fontSize: 22 }}>{s.icon}</span>
                    <span style={{ fontSize: 11, opacity: .6, letterSpacing: ".12em", textTransform: "uppercase" }}>{s.number} / {s.label}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: 30, margin: "0 0 6px" }}>{s.title}</h3>
                </div>
                <div style={{ flex: 1, minWidth: 260, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "12px 32px" }}>
                  {s.items.map((item) => (
                    <div key={item.heading}>
                      <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 4px", color: "#ffe8df" }}>{item.heading}</p>
                      <p style={{ fontSize: 13, margin: 0, color: "#f7e7df", lineHeight: 1.6 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {/* Row 2: 2 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {services.slice(1, 3).map((s) => (
              <ServiceCard key={s.number} s={s} />
            ))}
          </div>

          {/* Row 3: 2 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {services.slice(3, 5).map((s) => (
              <ServiceCard key={s.number} s={s} />
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="flex-banner" style={{ marginTop: 32 }}>
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

function ServiceCard({ s }: { s: (typeof services)[number] }) {
  return (
    <article className="service-card" style={{ padding: "28px 28px 24px" }}>
      <div className="service-top">
        <span className="service-icon">{s.icon}</span>
        <span className="service-number">{s.number} / {s.label}</span>
      </div>
      <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: 22, margin: "0 0 16px" }}>
        {s.title}
      </h3>
      <div style={{ display: "grid", gap: 12 }}>
        {s.items.map((item) => (
          <div key={item.heading} style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "var(--terra)", fontSize: 14, lineHeight: 1.6, flexShrink: 0 }}>—</span>
            <div>
              <span style={{ fontWeight: 700, fontSize: 13, color: "var(--ink)" }}>{item.heading}: </span>
              <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{item.body}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="service-bottom" style={{ marginTop: 20 }}>
        <a className="text-link" href="/lien-he" style={{ fontSize: 12, fontWeight: 700 }}>Tư vấn ngay ↗</a>
      </div>
    </article>
  );
}
