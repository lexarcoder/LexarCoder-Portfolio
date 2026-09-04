import { createTransporter } from "../../config/mail.js";

async function contactController(req, res) {
  try {
    const { username, email, subject, message } = req.body;

    // Validate fields
    if (!username || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }


    // Create Gmail transporter
    const transporter = await createTransporter();

    // ==================================================
    // 📩 MAIL TO YOU
    // ==================================================

    await transporter.sendMail({
      from: `"Portfolio Contact (${username})" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 Contact Form: ${subject}`,

      html: `
        <div
          style="
            max-width: 650px;
            margin: auto;
            font-family: Arial, sans-serif;
            background: #f5f7fb;
            padding: 30px;
          "
        >

          <div
            style="
              background: #6C63FF;
              color: #fff;
              padding: 20px;
              border-radius: 10px 10px 0 0;
            "
          >
            <h2 style="margin: 0;">
              📩 New Contact Request
            </h2>
          </div>

          <div
            style="
              background: #fff;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,.08);
            "
          >

            <p>
              <strong>Name:</strong>
              ${username}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Subject:</strong>
              ${subject}
            </p>

            <hr style="margin: 25px 0;" />

            <p>
              <strong>Message:</strong>
            </p>

            <p
              style="
                background: #f8f8f8;
                padding: 15px;
                border-radius: 8px;
                line-height: 1.6;
              "
            >
              ${message}
            </p>

            <hr style="margin: 25px 0;" />

            <p style="color: #777; font-size: 13px;">
              You can directly reply to this email to respond to
              ${username}.
            </p>

          </div>
        </div>
      `,
    });

    // ==================================================
    // 📧 AUTO REPLY TO USER
    // ==================================================

    await transporter.sendMail({
      from: `"Nitesh Pandey" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: "✅ We received your message!",

      html: `
        <div
          style="
            max-width: 650px;
            margin: auto;
            font-family: Arial, sans-serif;
            background: #f5f7fb;
            padding: 30px;
          "
        >

          <!-- Header -->
          <div
            style="
              background: #6C63FF;
              color: #fff;
              padding: 20px;
              border-radius: 10px 10px 0 0;
            "
          >
            <h2 style="margin: 0;">
              Message Received ✔️
            </h2>
          </div>

          <!-- Content -->
          <div
            style="
              background: #fff;
              padding: 30px;
              border-radius: 0 0 10px 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,.08);
            "
          >

            <p>
              Hi <strong>${username}</strong>,
            </p>

            <p style="line-height: 1.6;">
              Thanks for reaching out.
              Your message has been received successfully.
              I will review it and reply within
              <strong>24 hours</strong>.
            </p>

            <hr style="margin: 25px 0;" />

            <!-- Contact Details -->
            <table
              style="
                width: 100%;
                border-collapse: collapse;
              "
            >

              <tr>
                <td style="padding: 8px 0;">
                  <strong>📧 Email</strong>
                </td>

                <td style="padding: 8px 0;">
                  ${email}
                </td>
              </tr>

              <tr>
                <td style="padding: 8px 0;">
                  <strong>📝 Subject</strong>
                </td>

                <td style="padding: 8px 0;">
                  ${subject}
                </td>
              </tr>

            </table>

            <hr style="margin: 25px 0;" />

            <p
              style="
                color: #555;
                font-size: 14px;
                line-height: 1.6;
              "
            >
              We have received your message successfully.
              Your message details are stored securely in our system.
            </p>

            <br />

            <strong>
              LexarCoder Team
            </strong>

            <br />

            Full Stack Web Developer 🚀

          </div>
        </div>
      `,
    });


    // ==================================================
    // ✅ RESPONSE
    // ==================================================

    return res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });

  } catch (error) {
    console.error("❌ CONTACT MAIL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending email.",
      error: error.message,
    });
  }
}

export default {
  contactController,
};