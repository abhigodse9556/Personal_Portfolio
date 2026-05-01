import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !phone || !message) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    const {
      ZOHO_MAIL_USER,
      ZOHO_MAIL_PASS,
      ZOHO_MAIL_TO,
      ZOHO_MAIL_REGION = "in",
      ZOHO_SMTP_PORT = "465",
    } = process.env;

    if (!ZOHO_MAIL_USER || !ZOHO_MAIL_PASS || !ZOHO_MAIL_TO) {
      return Response.json(
        { error: "Zoho Mail environment variables are not configured." },
        { status: 500 },
      );
    }

    const port = Number(ZOHO_SMTP_PORT);
    const smtpHost = ["smtp", "zoho", ZOHO_MAIL_REGION].join(".");
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure: port === 465,
      auth: {
        user: ZOHO_MAIL_USER,
        pass: ZOHO_MAIL_PASS,
      },
      connectionTimeout: 10000,
    });

    await transporter.sendMail({
      from: ZOHO_MAIL_USER,
      replyTo: email,
      to: ZOHO_MAIL_TO,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
    });

    return Response.json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Zoho contact API error:", error);
    return Response.json({ error: "Failed to send message." }, { status: 500 });
  }
}
