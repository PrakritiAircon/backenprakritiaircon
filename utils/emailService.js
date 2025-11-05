const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendSiteVisitNotification = async (visitData) => {
  const { name, email, phone, address, preferred_date, preferred_time, service_type, message } = visitData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL,
    subject: `📅 Site Visit Request - ${service_type.replace('-', ' ').toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { background: white; margin: 10px 0; padding: 15px; border-radius: 5px; border-left: 4px solid #28a745; }
          .label { font-weight: bold; color: #28a745; }
          .message-box { background: white; padding: 20px; border-radius: 5px; margin-top: 15px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .urgent { background: #fff3cd; border-left: 4px solid #ffc107; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 10px;">
              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #28a745; font-weight: bold; font-size: 24px;">P</span>
              </div>
              <div>
                <h1 style="margin: 0; font-size: 28px;">Prakriti Aircon</h1>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">Premium HVAC Solutions</p>
              </div>
            </div>
            <p style="margin: 10px 0 0 0;">🏠 Site Visit Request</p>
          </div>
          <div class="content">
            <div class="info-row urgent">
              <span class="label">⚠️ URGENT:</span> Site visit requested - Please confirm within 24 hours
            </div>
            <div class="info-row">
              <span class="label">👤 Customer Name:</span> ${name}
            </div>
            <div class="info-row">
              <span class="label">📧 Email Address:</span> <a href="mailto:${email}">${email}</a>
            </div>
            <div class="info-row">
              <span class="label">📱 Phone Number:</span> <a href="tel:${phone}">${phone}</a>
            </div>
            <div class="info-row">
              <span class="label">📍 Visit Address:</span> ${address}
            </div>
            <div class="info-row">
              <span class="label">📅 Preferred Date:</span> ${new Date(preferred_date).toLocaleDateString('en-IN')}
            </div>
            <div class="info-row">
              <span class="label">🕐 Preferred Time:</span> ${preferred_time}
            </div>
            <div class="info-row">
              <span class="label">🔧 Service Type:</span> ${service_type.replace('-', ' ').toUpperCase()}
            </div>
            ${message ? `<div class="message-box">
              <div class="label">💬 Additional Notes:</div>
              <p style="margin-top: 10px; font-style: italic;">${message}</p>
            </div>` : ''}
            <div style="text-align: center; margin-top: 30px;">
              <p><strong>⏰ Requested:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
          <div class="footer">
            <p>This site visit was requested through the Prakriti Aircon website.</p>
            <p><strong>Action Required:</strong> Please contact the customer to confirm the appointment.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  const result = await transporter.sendMail(mailOptions);
  console.log('📧 Site visit email sent:', result.messageId);
};

const sendContactNotification = async (contactData) => {
  const { name, email, phone, service, message } = contactData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.CONTACT_EMAIL,
    subject: `🔔 New Customer Inquiry - ${service.replace('-', ' ').toUpperCase()}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { background: white; margin: 10px 0; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; }
          .label { font-weight: bold; color: #667eea; }
          .message-box { background: white; padding: 20px; border-radius: 5px; margin-top: 15px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 10px;">
              <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: #667eea; font-weight: bold; font-size: 24px;">P</span>
              </div>
              <div>
                <h1 style="margin: 0; font-size: 28px;">Prakriti Aircon</h1>
                <p style="margin: 0; font-size: 14px; opacity: 0.9;">Premium HVAC Solutions</p>
              </div>
            </div>
            <p style="margin: 10px 0 0 0;">New Customer Inquiry Received</p>
          </div>
          <div class="content">
            <div class="info-row">
              <span class="label">👤 Customer Name:</span> ${name}
            </div>
            <div class="info-row">
              <span class="label">📧 Email Address:</span> <a href="mailto:${email}">${email}</a>
            </div>
            <div class="info-row">
              <span class="label">📱 Phone Number:</span> <a href="tel:${phone}">${phone}</a>
            </div>
            <div class="info-row">
              <span class="label">🔧 Service Required:</span> ${service.replace('-', ' ').toUpperCase()}
            </div>
            <div class="message-box">
              <div class="label">💬 Customer Message:</div>
              <p style="margin-top: 10px; font-style: italic;">${message}</p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <p><strong>⏰ Received:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
          <div class="footer">
            <p>This inquiry was submitted through the Prakriti Aircon website contact form.</p>
            <p>Please respond to the customer within 24 hours for best service.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  const result = await transporter.sendMail(mailOptions);
  console.log('📧 Email notification sent:', result.messageId);
};

module.exports = { sendContactNotification, sendSiteVisitNotification };