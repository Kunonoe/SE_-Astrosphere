import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOTP = async (email: string, otp: number) => {
    if (process.env.NODE_ENV === 'development') return;

    console.log(`📩 กำลังส่ง OTP: ${otp} ไปที่ ${email}`);
    
    const isSent = await resend.emails.send({
        from: 'noreply@email.astrosphere.website',
        to: email,
        subject: 'Astrosphere - OTP Code',
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
                    ยืนยันตัวตนด้วยรหัส OTP
                </div>
                <p>สวัสดีค่ะ/ครับ,</p>
                <p>คุณได้รับคำขอให้ยืนยันตัวตนด้วยรหัส OTP สำหรับการเข้าถึงบัญชีของคุณ โปรดใช้รหัส OTP ด้านล่างนี้:</p>
                <div class="otp-code">
                    ${otp}
                </div>
                <p>กรุณาใส่รหัสนี้ในช่องที่กำหนดภายใน 5 นาที</p>
                <div class="footer">
                    หากคุณไม่ได้ทำการขอรหัส OTP นี้, กรุณาละเลยอีเมล์นี้
                </div>
            </div>

            </body>
            </html>
            `
        ,
    });
    if (!isSent) {
        console.error('Failed to send email');
        return false
    }

    return true;
}