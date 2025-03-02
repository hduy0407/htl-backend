const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (userEmail, userName) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS   
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,   
        to: userEmail,                 
        subject: 'Welcome to the Pickleball Court Reservation System!',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f9;
                            margin: 0;
                            padding: 0;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        }
                        .email-header {
                            text-align: center;
                            padding: 20px;
                            background-color: #3A84C9;
                            color: white;
                            border-radius: 8px 8px 0 0;
                        }
                        .email-header h1 {
                            margin: 0;
                        }
                        .email-content {
                            padding: 20px;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .email-footer {
                            text-align: center;
                            padding: 10px;
                            font-size: 14px;
                            background-color: #f1f1f1;
                            border-radius: 0 0 8px 8px;
                        }
                        .cta-button {
                            display: inline-block;
                            background-color: #3A84C9;
                            color: white;
                            padding: 12px 20px;
                            border-radius: 4px;
                            text-decoration: none;
                            font-weight: bold;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="email-header">
                            <h1>Xác nhận tạo tài khoản thành công</h1>
                        </div>
                        <div class="email-content">
                            <p>Chào bạn ${userName},</p>
                            <p>Bạn đã thành công tạo tài khoản nhân viên</p>
                            <p><strong>Lưu ý</strong></p>
                            <p>Không chia sẻ code đăng nhập với bất kỳ ai.</p>
                            <p><strong>Admin of HTL</strong></p>
                        </div>
                        <div class="email-footer">
                            <p>© 2025 HTL Pickleball Court Reservation System | All Rights Reserved</p>
                        </div>
                    </div>
                </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent successfully!');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
};

const sendBookingConfirmationEmail = async (userEmail, userName, bookingDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS  
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,   
        to: userEmail,                  
        subject: 'Booking Pending - HTL Pickleball Court',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f9;
                            margin: 0;
                            padding: 0;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        }
                        .email-header {
                            text-align: center;
                            padding: 20px;
                            background-color: #3A84C9;
                            color: white;
                            border-radius: 8px 8px 0 0;
                        }
                        .email-header h1 {
                            margin: 0;
                        }
                        .email-content {
                            padding: 20px;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .email-footer {
                            text-align: center;
                            padding: 10px;
                            font-size: 14px;
                            background-color: #f1f1f1;
                            border-radius: 0 0 8px 8px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="email-header">
                            <h1>Đơn đặt sân đang chờ xác nhận</h1>
                        </div>
                        <div class="email-content">
                            <p>Xin Chào Anh/Chị ${userName},</p>
                            <p>Cảm ơn quy khách vì đã đặt sân pickleball của bên chúng tôi, đây là thông tin về đơn đặt sân:</p>
                            <ul>
                                <li><strong>Ngày:</strong> ${bookingDetails.date}</li>
                                <li><strong>Giờ: Từ </strong> ${bookingDetails.timeStart} đến ${bookingDetails.timeEnd}</li>
                                <li><strong>Sđt người đặt:</strong> ${bookingDetails.phone}</li>
                            </ul>
                            <p>Nhân viên chúng tôi sẽ kiểm tra lịch sân và sẽ xác nhận đơn của quý khách hàng trong thời gian sớm nhất</p>
                            <p>Nếu cần thêm thông tin gì quý khách có thể liên hệ với chúng tôi thông qua số điện thoại hoặc zalo/facebook.</p>
                            <p><strong>HTL PICKLEBALL</strong></p>
                        </div>
                        <div class="email-footer">
                            <p>© 2025 HTL Pickleball Court Reservation System | All Rights Reserved</p>
                        </div>
                    </div>
                </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully!');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
    }
};

const sendDoubleBookingConfirmationEmail = async (userEmail, userName, bookingDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS   
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,   
        to: userEmail,                  
        subject: 'Booking Confirmation - HTL Pickleball Court',
        html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f9;
                            margin: 0;
                            padding: 0;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        }
                        .email-header {
                            text-align: center;
                            padding: 20px;
                            background-color: #3A84C9;
                            color: white;
                            border-radius: 8px 8px 0 0;
                        }
                        .email-header h1 {
                            margin: 0;
                        }
                        .email-content {
                            padding: 20px;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .email-footer {
                            text-align: center;
                            padding: 10px;
                            font-size: 14px;
                            background-color: #f1f1f1;
                            border-radius: 0 0 8px 8px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="email-header">
                            <h1>Đơn đặt sân được xác nhận</h1>
                        </div>
                        <div class="email-content">
                            <p>Xin Chào Anh/Chị ${userName},</p>
                            <p>Cảm ơn quy khách vì đã đặt sân pickleball của bên chúng tôi, đây là thông tin về đơn đặt sân:</p>
                            <ul>
                                <li><strong>Ngày:</strong> ${bookingDetails.date}</li>
                                <li><strong>Giờ: Từ </strong> ${bookingDetails.timeStart} đến ${bookingDetails.timeEnd}</li>
                                <li><strong>Sđt người đặt:</strong> ${bookingDetails.phone}</li>
                            </ul>
                            <p>Nhân viên của chúng tôi đã xác nhận đơn của quý khách</p>
                            <p>Nếu cần thêm thông tin gì quý khách có thể liên hệ với chúng tôi thông qua số điện thoại hoặc zalo/facebook.</p>
                            <p><strong>HTL PICKLEBALL</strong></p>
                        </div>
                        <div class="email-footer">
                            <p>© 2025 HTL Pickleball Court Reservation System | All Rights Reserved</p>
                        </div>
                    </div>
                </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Booking confirmation email sent successfully!');
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
    }
}

module.exports = { sendConfirmationEmail, sendBookingConfirmationEmail, sendDoubleBookingConfirmationEmail }
