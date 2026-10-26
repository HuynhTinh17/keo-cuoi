import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Chống bot (honeypot)
    if (formData.get("website")) {
      return NextResponse.json({ ok: true, message: "Cảm ơn bạn!" });
    }

    const name = ((formData.get("name") as string) || "").trim();
    const phone = ((formData.get("phone") as string) || "")
      .replace(/[\s\.\-]/g, "")
      .trim();
    const date = ((formData.get("date") as string) || "").trim();
    const budget = ((formData.get("budget") as string) || "").trim();
    const service = ((formData.get("service") as string) || "").trim();
    const message = ((formData.get("message") as string) || "").trim();

    if (name === "" || name.length > 100) {
      return NextResponse.json(
        { ok: false, message: "Vui lòng nhập tên của bạn." },
        { status: 422 }
      );
    }
    if (!/^(0|\+84)\d{9,10}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, message: "Số điện thoại chưa đúng định dạng." },
        { status: 422 }
      );
    }
    if (date !== "") {
      const d = new Date(date);
      if (isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== date) {
        return NextResponse.json(
          { ok: false, message: "Ngày cưới không hợp lệ." },
          { status: 422 }
        );
      }
    }
    if (message.length > 2000) {
      return NextResponse.json(
        { ok: false, message: "Lời nhắn hơi dài, bạn rút gọn giúp tụi mình nhé." },
        { status: 422 }
      );
    }

    const port = Number(process.env.MAIL_PORT || 587);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const time = new Date().toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const mailText = `Có khách mới vừa gửi form liên hệ:

Tên: ${name}
SĐT/Zalo: ${phone}
Ngày cưới: ${date || "—"}
Ngân sách: ${budget || "—"}
Dịch vụ: ${service || "—"}
Lời nhắn:
${message || "—"}

Thời gian: ${time}`;

    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME || "Kèo Cưới"}" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      subject: `Khách mới: ${name}`,
      text: mailText,
    });

    return NextResponse.json({
      ok: true,
      message: "Cảm ơn bạn đã chia sẻ! Kèo Cưới sẽ liên hệ với bạn sớm nhất.",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { ok: false, message: "Có lỗi xảy ra, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}