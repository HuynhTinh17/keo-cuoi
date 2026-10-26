"use client";

import { useState } from "react";

const faqGroups = [
  {
    title: "1. Về dịch vụ và quy trình làm việc",
    items: [
      {
        q: '"Kèo Cưới" cung cấp những dịch vụ cụ thể nào cho ngày cưới?',
        a: "Kèo Cưới cung cấp các gói: điều phối ngày cưới (on-the-day coordination), lập kế hoạch cưới trọn gói (full-planning) và tư vấn thiết kế concept trang trí. Tùy nhu cầu, bạn có thể chọn một gói phù hợp hoặc kết hợp các phần với nhau.",
      },
      {
        q: "Tụi mình nên bắt đầu liên hệ và chuẩn bị kế hoạch cưới trước bao lâu là hợp lý?",
        a: "Tụi mình khuyên nên liên hệ trước khoảng 6 – 12 tháng so với ngày cưới. Khoảng thời gian này đủ để bạn đặt nhà hàng, chụp ảnh cưới và hoàn thiện các hạng mục quan trọng mà không bị gấp gáp.",
      },
      {
        q: "Quy trình làm việc từ lúc gặp mặt đến ngày cưới diễn ra như thế nào?",
        a: "Quy trình gồm: Tư vấn ý tưởng → Báo giá & ký hợp đồng → Lên timeline chi tiết → Khảo sát địa điểm → Tổng duyệt → Điều phối ngày cưới. Mỗi bước đều có trao đổi hai chiều để mọi thứ đúng ý bạn.",
      },
    ],
  },
  {
    title: "2. Về chi phí và hợp đồng",
    items: [
      {
        q: "Chi phí dịch vụ lập kế hoạch cưới được tính như thế nào?",
        a: "Chi phí được tính theo gói cố định hoặc theo phần trăm ngân sách, tùy phạm vi công việc bạn chọn. Tụi mình báo giá rõ ràng ngay từ đầu và cam kết không phát sinh chi phí ẩn.",
      },
      {
        q: "Nếu ngày cưới thay đổi hoặc có sự cố phát sinh thì chính sách xử lý ra sao?",
        a: "Chính sách hoãn, hủy hoặc thay đổi lịch trình được ghi rõ trong hợp đồng. Tụi mình luôn cố gắng linh hoạt và trao đổi trực tiếp để bạn an tâm nhất.",
      },
    ],
  },
  {
    title: "3. Về ngày cưới (On-the-day)",
    items: [
      {
        q: 'Vào ngày cưới, đội ngũ "Kèo Cưới" sẽ hỗ trợ những gì?',
        a: "Vào ngày cưới, đội ngũ Kèo Cưới sẽ kiểm tra timeline, đón khách, phối hợp với nhà cung cấp và hỗ trợ cô dâu chú rể xử lý các tình huống phát sinh để buổi lễ diễn ra suôn sẻ.",
      },
      {
        q: 'Tụi mình đã tự chuẩn bị một số phần rồi, "Kèo Cưới" có nhận hỗ trợ riêng phần điều phối ngày cưới không?',
        a: "Có nhé. Ngoài các gói trọn gói, tụi mình nhận hỗ trợ riêng phần điều phối ngày cưới (on-the-day) nếu bạn đã tự chuẩn bị các phần khác.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item" style={{ borderBottom: "1px solid var(--line)" }}>
      <button
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "100%",
          border: 0,
          background: "none",
          padding: "20px 0",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 15,
          fontWeight: 700,
          cursor: "pointer",
          color: "var(--ink)",
          fontSize: 14,
          transition: "color .2s",
        }}
      >
        <span style={{ flex: 1 }}>{q}</span>
        {/* Animated +/× icon */}
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: open ? "var(--terra)" : "var(--cream)",
            border: "1px solid",
            borderColor: open ? "var(--terra)" : "var(--line)",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            color: open ? "#fff" : "var(--terra)",
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1,
            transition: "background .25s, border-color .25s, color .25s, transform .3s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          ＋
        </span>
      </button>

      {/* Smooth accordion via max-height + overflow */}
      <div
        style={{
          maxHeight: open ? 400 : 0,
          overflow: "hidden",
          transition: "max-height .35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <p
          style={{
            margin: 0,
            paddingBottom: 20,
            paddingRight: 30,
            color: "var(--muted)",
            fontSize: 13,
            lineHeight: 1.7,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <section className="section section-paper" id="faq">
      <div className="wrap faq-grid">
        {/* ── Intro column ── */}
        <div className="faq-intro">
          <span className="eyebrow">Good to know</span>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 43,
              lineHeight: 1.1,
              fontWeight: 500,
              margin: "14px 0",
              letterSpacing: "-0.03em",
            }}
          >
            Bạn đang thắc mắc?
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Tụi mình muốn mọi thứ rõ ràng và dễ bắt đầu nhất có thể.
          </p>
          <a className="text-link" href="/lien-he">
            Hỏi tụi mình một câu ↗
          </a>
        </div>

        {/* ── Accordion column ── */}
        <div>
          {faqGroups.map((group) => (
            <div className="faq-group" key={group.title}>
              <h3 className="faq-group-title">{group.title}</h3>
              {group.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
