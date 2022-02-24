const galleryTitle = document.getElementById('galleryTitle')
const formResponse = document.getElementById('formResponse')
const formSubmit = document.querySelector('button')

const name = document.getElementById('name').textContent
const email = document.getElementById('email').textContent
const phone = document.getElementById('phone').textContent
const address = document.getElementById('address').textContent
const city = document.getElementById('city').textContent
const state = document.getElementById('state').textContent
const zip = document.getElementById('zip').textContent
const message = document.getElementById('message').textContent
const spamMsg = document.getElementById('spamMsg').textContent
const inputs = [name, email, phone, address, city, state, zip, message]

formSubmit.addEventListener('click', (e) => {
  e.preventDefault()
  galleryTitle.scrollIntoView({ behavior: 'smooth' })
  if (spamMsg.value === '') {
    formResponse.textContent = 'Sending...'
    fetch(
      `/email?name=${name}&email=${email}&phone=${phone}&address=${address}&city=${city}&state=${state}&zip=${zip}&message=${message}`
    ).then((res) => {
      res.json().then((data) => {
        if (data.formResponse) {
          formResponse.textContent = data.formResponse
        } else {
          formResponse.textContent = 'Message Sent'
          inputs.forEach((input) => {
            input.value = ''
          })
        }
      })
    })
  }
})
