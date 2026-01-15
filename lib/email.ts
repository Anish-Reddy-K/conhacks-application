import nodemailer from 'nodemailer';

// Create transporter with Hostinger SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface SendConfirmationEmailParams {
  to: string;
  firstName: string;
}

export async function sendConfirmationEmail({ to, firstName }: SendConfirmationEmailParams) {
  const mailOptions = {
    from: `"ConHacks" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Application Received - ConHacks 2026',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 40px 20px; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 40px;">
    <tr>
      <td style="text-align: center; padding-bottom: 24px; border-bottom: 1px solid #eee;">
        <h1 style="margin: 0; color: #333; font-size: 20px; font-weight: 600;">ConHacks 2026</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 24px 0; color: #333; font-size: 15px; line-height: 1.6;">
        <p style="margin: 0 0 16px 0;">Hi ${firstName},</p>
        <p style="margin: 0 0 16px 0;">Thanks for applying to ConHacks 2026! We've received your application.</p>
        <p style="margin: 0 0 16px 0;"><strong>March 27-29, 2026</strong><br>Conestoga College, Waterloo Campus</p>
        <p style="margin: 0;">We'll be in touch with next steps soon.</p>
      </td>
    </tr>
    <tr>
      <td style="padding-top: 24px; border-top: 1px solid #eee; text-align: center;">
        <p style="margin: 0; color: #888; font-size: 13px;">
          Questions? Email <a href="mailto:contact@conhacks.io" style="color: #666;">contact@conhacks.io</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    text: `Hi ${firstName},

Thanks for applying to ConHacks 2026! We've received your application.

March 27-29, 2026
Conestoga College, Waterloo Campus

We'll be in touch with next steps soon.

Questions? Email contact@conhacks.io
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    return { success: false, error };
  }
}
