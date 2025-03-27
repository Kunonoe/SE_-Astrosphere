"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.resend = void 0;
const resend_1 = require("resend");
exports.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
const sendMessage = async (email, message) => {
    if (process.env.NODE_ENV === 'development')
        return;
    const isSent = await exports.resend.emails.send({
        from: 'noreply@email.astrosphere.website',
        to: email,
        subject: 'Astrosphere - ✉️ ข้อความวันนี้ เมื่อปีที่แล้ว ✉️',
        html: `
            <!DOCTYPE html>
            <html lang="th">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>OTP Code</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 50px auto;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        font-size: 24px;
                        color: #4CAF50;
                    }
                    .otp-code {
                        font-size: 32px;
                        font-weight: bold;
                        color: #333;
                        text-align: center;
                        padding: 10px 0;
                    }
                    .footer {
                        text-align: center;
                        font-size: 14px;
                        color: #777;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>

            <div class="container">
                <div class="header">
                ✉️ ข้อความวันนี้ เมื่อปีที่แล้ว ✉️
                </div>
                <div class="message-code">
                    ${message}
                </div>
                <div class="footer">
                    ............
                </div>
            </div>

            </body>
            </html>
            `,
    });
    if (!isSent) {
        console.error('Failed to send email');
        return false;
    }
    return true;
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=sendMessage.js.map