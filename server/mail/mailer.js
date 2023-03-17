import nodeMailer from 'nodemailer'
import mailConfig from '../config/mail.config.js'

const sendMail = (to, subject, htmlContent) => {
    // console.log('MAIL CONFIG: ', mailConfig)
    const transport = nodeMailer.createTransport({
        // host: mailConfig.HOST,
        host: 'smtp.gmail.com',
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        }
    })

    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent
    }
    // console.log('HOST: ',transport.options.host);
    return transport.sendMail(options);
}

export const mailer = { sendMail};