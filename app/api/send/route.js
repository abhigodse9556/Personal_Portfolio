import nodemailer from "nodemailer";

export async function POST(request) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !phone || !message) {
    return new Response("Missing required fields.", { status: 400 });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.EMAIL_TO) {
    return new Response("Email environment variables are not configured.", { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_TO,
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  });

  return new Response("Email sent successfully.", { status: 200 });
}
