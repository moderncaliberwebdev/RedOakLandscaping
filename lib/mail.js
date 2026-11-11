import validator from 'validator'
import sgMail from '@sendgrid/mail'

const FIELDS = ['name', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message']

// Returns an error message, or undefined when the email was sent
export default async function sendEstimate(data) {
  if (FIELDS.some((field) => !data[field])) return 'Please fill in all fields'
  if (!validator.isEmail(data.email)) return 'Provide a valid email'
  if (!validator.isMobilePhone(data.phone)) return 'Provide a valid phone number'

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  try {
    await sgMail.send({
      to: 'jesse@redoakinc.org',
      from: { name: 'Red Oak Inc Contact', email: 'cmartin@moderncaliber.com' },
      templateId: 'd-b13ca8fd92a9438d8c836527c786286f',
      dynamic_template_data: Object.fromEntries(FIELDS.map((f) => [f, data[f]])),
    })
  } catch (error) {
    console.error(error, error.response?.body)
    return 'Something went wrong, please try again'
  }
}
