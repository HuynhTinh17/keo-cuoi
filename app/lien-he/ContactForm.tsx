"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const form = e.currentTarget;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await res.json();
      setResult(data);
      if (data.ok) form.reset();
    } catch {
      setResult({ ok: false, message: "Không gửi được, bạn thử lại sau nhé." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" id="leadForm" onSubmit={handleSubmit}>
      {/* Honeypot chống spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px" }}
        aria-hidden="true"
      />

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Tên của bạn *</label>
          <input id="name" name="name" placeholder="Tên bạn" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Số điện thoại / Zalo *</label>
          <input id="phone" name="phone" placeholder="09xx xxx xxx" required />
        </div>
        <div className="field full">
          <label htmlFor="email">Email (để nhận xác nhận)</label>
          <input id="email" name="email" type="email" placeholder="ban@email.com" />
        </div>
        <div className="field">
          <label htmlFor="date">Ngày cưới dự kiến</label>
          <input id="date" name="date" type="date" />
        </div>
        <div className="field">
          <label htmlFor="budget">Ngân sách dự kiến</label>
          <select id="budget" name="budget">
            <option value="">Chọn khoảng ngân sách</option>
            <option>Dưới 50 triệu</option>
            <option>50–100 triệu</option>
            <option>100–200 triệu</option>
            <option>Trên 200 triệu</option>
            <option>Chưa xác định</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="service">Bạn đang cần hỗ trợ gì?</label>
          <select id="service" name="service">
            <option value="">Chọn dịch vụ quan tâm</option>
            <option>Full Planning</option>
            <option>Partial Planning</option>
            <option>Styling &amp; Decor</option>
            <option>Day-of Coordination</option>
            <option>Mình chưa rõ, cần tư vấn</option>
          </select>
        </div>
        <div className="field full">
          <label htmlFor="message">Điều bạn muốn Kèo Cưới biết thêm</label>
          <textarea
            id="message"
            name="message"
            placeholder="Phong cách yêu thích, số khách dự kiến, điều quan trọng nhất với hai bạn..."
          ></textarea>
        </div>
      </div>

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Đang gửi..." : "Gửi lời nhắn cho Kèo Cưới"} <span>↗</span>
      </button>
      <p className="form-note">Thông tin của bạn chỉ dùng để Kèo Cưới liên hệ tư vấn.</p>

      {result && (
        <div
          className="form-success"
          id="formSuccess"
          role="status"
          style={{
            display: "block",
            background: result.ok ? "#e8f0df" : "#f8e0da",
            color: result.ok ? "#36522b" : "#8e402e",
          }}
        >
          {result.message}
        </div>
      )}
    </form>
  );
}