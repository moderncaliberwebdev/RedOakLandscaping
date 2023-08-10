const validator = require('validator')
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
    const msg = {
      to: 'jesse@redoakinc.org',
      from: {
        name: 'Red Oak Inc Contact',
        email: 'cmartin@moderncaliber.com',
      },
      templateId: 'd-b13ca8fd92a9438d8c836527c786286f',
      dynamic_template_data: {
        name,
        email,
        phone,
        address,
        city,
        state,
        zip,
        message,
        callback,
      },
    }
    //ES8
    const sendSGMail = async () => {
      try {
        await sgMail.send(msg)

        callback(undefined, { sent: true })
      } catch (error) {
        console.error(error)

        if (error.response) {
          console.error(error.response.body)
        }
      }
    }
    sendSGMail()
  }
}

module.exports = mailTo
