import nodemailer from "nodemailer";

export const runtime = "nodejs";

const leadRecipient = "mdsarfaraz1987@gmail.com";

function getEnv(key) {
  const value = process.env[key];
  return typeof value === "string" ? value.trim() : "";
}

function escapeText(value) {
  return String(value ?? "").replace(/\r/g, "").trim();
}

function classifySmtpError(err) {
  const responseCode = Number(err?.responseCode || 0);
  const code = typeof err?.code === "string" ? err.code : "";

  if (responseCode === 535 || code === "EAUTH") {
    return "SMTP authentication failed. If you're using Gmail, set SMTP_PASS to a Google App Password.";
  }

  if (code === "ECONNECTION" || code === "ETIMEDOUT") {
    return "Could not connect to the email server. Verify SMTP_HOST/SMTP_PORT and network access.";
  }

  if (code === "EENVELOPE") {
    return "Email envelope was rejected. Verify SMTP_FROM and recipient address.";
  }

  return "Failed to send email. Verify SMTP configuration.";
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = escapeText(payload?.name);
  const email = escapeText(payload?.email);
  const phone = escapeText(payload?.phone);
  const service = escapeText(payload?.service);
  const message = escapeText(payload?.message);
  const pageUrl = escapeText(payload?.pageUrl);
  const userAgent = escapeText(request.headers.get("user-agent"));
  const ip =
    escapeText(request.headers.get("x-forwarded-for")) ||
    escapeText(request.headers.get("x-real-ip"));

  if (!name) {
    return Response.json({ ok: false, error: "Name is required" }, { status: 400 });
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return Response.json({ ok: false, error: "Valid email is required" }, { status: 400 });
  }

  const host = getEnv("SMTP_HOST");
  const port = Number(getEnv("SMTP_PORT") || "587");
  const user = getEnv("SMTP_USER");
  const pass = getEnv("SMTP_PASS");
  const from = getEnv("SMTP_FROM") || user;
  const serviceName = getEnv("SMTP_SERVICE");

  if ((!serviceName && (!host || !port)) || !user || !pass || !from) {
    return Response.json(
      { ok: false, error: "Email service is not configured" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport(
    serviceName
      ? { service: serviceName, auth: { user, pass } }
      : {
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
          requireTLS: port !== 465,
        }
  );

  const submittedAt = new Date().toISOString();
  const subjectBits = ["New Lead", name];
  if (service) subjectBits.push(service);
  const subject = subjectBits.join(" • ");

  const text = [
    "New lead received",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "-"}`,
    `Service: ${service || "-"}`,
    "",
    "Message:",
    message || "-",
    "",
    `Page: ${pageUrl || "-"}`,
    `Submitted at: ${submittedAt}`,
    `User-Agent: ${userAgent || "-"}`,
    `IP: ${ip || "-"}`,
  ].join("\n");

  try {
    await transporter.sendMail({
      from,
      to: leadRecipient,
      subject,
      text,
      replyTo: email,
    });
  } catch (err) {
    console.error("Lead email send failed", {
      code: err?.code,
      command: err?.command,
      responseCode: err?.responseCode,
    });

    return Response.json({ ok: false, error: classifySmtpError(err) }, { status: 502 });
  }

  return Response.json({ ok: true });
}
