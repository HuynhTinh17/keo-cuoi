"use client";

import { useState } from "react";

type Errors = Partial<Record<string, string>>;

function ErrorMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <span
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        color: "#b85f45",
        marginTop: 4,
        fontWeight: 500,
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="5.5" stroke="#b85f45" />
        <path d="M6 4v3M6 8.5v.5" stroke="#b85f45" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {msg}
    </span>
  );
}

function validate(form: HTMLFormElement): Errors {
  const d = new FormData(form);
  const errs: Errors = {};

  if (!String(d.get("name")).trim())
    errs.name = "Làm ơn hãy điền tên của bạn.";

  const phone = String(d.get("phone")).trim();
  if (!phone)
    errs.phone = "Làm ơn hãy điền số điện thoại / Zalo.";
  else if (!/^[0-9+\s\-()]{8,15}$/.test(phone))
    errs.phone = "Số điện thoại chưa hợp lệ, bạn kiểm tra lại nhé.";

  const email = String(d.get("email")).trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errs.email = "Email chưa đúng định dạng, bạn kiểm tra lại nhé.";

  if (!String(d.get("date")).trim())
    errs.date = "Làm ơn hãy chọn ngày cưới dự kiến.";

  if (!String(d.get("budget")).trim())
    errs.budget = "Làm ơn hãy chọn khoảng ngân sách.";

  if (!String(d.get("service")).trim())
    errs.service = "Làm ơn hãy chọn dịch vụ bạn quan tâm.";

  return errs;
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  /* Xoá error của field khi người dùng bắt đầu sửa */
  function clearError(field: string) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      /* Focus vào field lỗi đầu tiên */
      const firstKey = Object.keys(errs)[0];
      (form.elements.namedItem(firstKey) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);
    setResult(null);

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

  const fieldBorder = (name: string) =>
    errors[name]
      ? "1px solid #b85f45"
      : "1px solid var(--line)";

  const fieldShadow = (name: string) =>
    errors[name]
      ? "0 0 0 3px rgba(184,95,69,.12)"
      : undefined;

  return (
    <form className="contact-form" id="leadForm" onSubmit={handleSubmit} noValidate>
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
        {/* Tên */}
        <div className="field">
          <label htmlFor="name">Tên của bạn *</label>
          <input
            id="name"
            name="name"
            placeholder="Tên bạn"
            onChange={() => clearError("name")}
            style={{ border: fieldBorder("name"), boxShadow: fieldShadow("name") }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          <ErrorMsg msg={errors.name} />
        </div>

        {/* SĐT */}
        <div className="field">
          <label htmlFor="phone">Số điện thoại / Zalo *</label>
          <input
            id="phone"
            name="phone"
            placeholder="09xx xxx xxx"
            onChange={() => clearError("phone")}
            style={{ border: fieldBorder("phone"), boxShadow: fieldShadow("phone") }}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
          />
          <ErrorMsg msg={errors.phone} />
        </div>

        {/* Email */}
        <div className="field full">
          <label htmlFor="email">
            Email{" "}
            <span style={{ fontWeight: 400, color: "var(--muted)", fontSize: 10, letterSpacing: ".05em" }}>
              (không bắt buộc — để nhận xác nhận)
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ban@email.com"
            onChange={() => clearError("email")}
            style={{ border: fieldBorder("email"), boxShadow: fieldShadow("email") }}
            aria-invalid={!!errors.email}
          />
          <ErrorMsg msg={errors.email} />
        </div>

        {/* Ngày cưới */}
        <div className="field">
          <label htmlFor="date">Ngày cưới dự kiến *</label>
          <input
            id="date"
            name="date"
            type="date"
            onChange={() => clearError("date")}
            style={{ border: fieldBorder("date"), boxShadow: fieldShadow("date") }}
            aria-invalid={!!errors.date}
          />
          <ErrorMsg msg={errors.date} />
        </div>

        {/* Ngân sách */}
        <div className="field">
          <label htmlFor="budget">Ngân sách dự kiến *</label>
          <select
            id="budget"
            name="budget"
            onChange={() => clearError("budget")}
            style={{ border: fieldBorder("budget"), boxShadow: fieldShadow("budget") }}
            aria-invalid={!!errors.budget}
          >
            <option value="">Chọn khoảng ngân sách</option>
            <option>Dưới 50 triệu</option>
            <option>50–100 triệu</option>
            <option>100–200 triệu</option>
            <option>Trên 200 triệu</option>
            <option>Chưa xác định</option>
          </select>
          <ErrorMsg msg={errors.budget} />
        </div>

        {/* Dịch vụ */}
        <div className="field full">
          <label htmlFor="service">Bạn đang cần hỗ trợ gì? *</label>
          <select
            id="service"
            name="service"
            onChange={() => clearError("service")}
            style={{ border: fieldBorder("service"), boxShadow: fieldShadow("service") }}
            aria-invalid={!!errors.service}
          >
            <option value="">Chọn dịch vụ quan tâm</option>
            <option>Full Planning</option>
            <option>Partial Planning</option>
            <option>Styling &amp; Decor</option>
            <option>Day-of Coordination</option>
            <option>Mình chưa rõ, cần tư vấn</option>
          </select>
          <ErrorMsg msg={errors.service} />
        </div>

        {/* Lời nhắn */}
        <div className="field full">
          <label htmlFor="message">Điều bạn muốn Kèo Cưới biết thêm</label>
          <textarea
            id="message"
            name="message"
            placeholder="Phong cách yêu thích, số khách dự kiến, điều quan trọng nhất với hai bạn..."
          />
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
