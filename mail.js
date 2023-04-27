const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')
const validator = require('validator')

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_API_DOMAIN,
  },
}

const transporter = nodemailer.createTransport(mailGun(auth))

// mail function
const mailTo = (
  name,
  email,
  phone,
  address,
  city,
  state,
  zip,
  message,
  callback
) => {
  //validation
  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !zip ||
    !message
  ) {
    return callback('Please fill in all fields', undefined)
  } else if (!validator.isEmail(email)) {
    return callback('Provide a valid email', undefined)
  } else if (!validator.isMobilePhone(phone)) {
    return callback('Provide a valid phone number', undefined)
  } else {
    const output = `
                <h3>Name:</h3> ${name}
                <h3>Phone:</h3> ${phone}
                <h3>Email:</h3> ${email}
                <h3>Address:</h3> ${address}
                <h3>City:</h3> ${city}
                <h3>State:</h3> ${state}
                <h3>Zipcode:</h3> ${zip}
                <h3>Message:</h3> ${message}
            `

    console.log(output)
    const mailOptions = {
      from: email,
      to: 'jesse@redoakinc.org',
      subject: 'Red Oak Estimate',
      html: output,
    }

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        callback('Internal Error', undefined)
      } else {
        callback(undefined, data)
      }
    })
  }
}

module.exports = mailTo
