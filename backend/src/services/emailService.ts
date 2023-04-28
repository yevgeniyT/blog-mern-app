import nodemailer from "nodemailer";
import dev from "../config";

type EmailData = {
    email: string | undefined;
    subject: string;
    html: string;
};

const sendEmailWithNodeMailer = async (emailData: EmailData) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: dev.app.smtpUsername, // generated ethereal user
                pass: dev.app.smtpPassword, // generated ethereal password
            },
        });

        const mailOptions = {
            from: dev.app.smtpUsername, // sender address
            to: emailData.email, // list of receivers
            subject: emailData.subject, // Subject line
            html: emailData.html, // html body
        };

        // send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.response);
    } catch (error) {
        console.log("Problem sending Email: ", error);
    }
};

export default sendEmailWithNodeMailer;
