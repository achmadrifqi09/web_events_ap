const nodemailer = require('nodemailer')
const mustache = require('mustache')
const fs = require('fs')
const { mail, password } = require('../../configs/config')

const transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   secure: false,
   auth: {
      user: mail,
      pass: password,
   },
})

const otpMail = async (mailOfClient) => {
   try {
      let template = fs.readFileSync('app/views/mail/otp.html', 'utf8')
      let message = {
         from: mail,
         to: mailOfClient,
         subject: 'Kode Registrasi',
         html: mustache.render(template),
      }
      return await transporter.sendMail(message)
   } catch (error) {
      console.log(error)
   }
}

const invoiceMail = async (mailOfClient) => {
   try {
      let template = fs.readFileSync('app/views/mail/invoice.html', 'utf8')

      let message = {
         from: mail,
         to: mailOfClient,
         subject: 'Invoice',
         html: mustache.render(template),
      }
      return await transporter.sendMail(message)
   } catch (error) {
      console.log(error)
   }
}

module.exports = { otpMail, invoiceMail }
