const formSubmit = document.querySelector('button')
const galleryTitle = document.getElementById('galleryTitle')
const formResponse = document.getElementById('formResponse')

formSubmit.addEventListener('click', (e) => {
  e.preventDefault()

  const fullName = document.getElementById('name').value
  const email = document.getElementById('email').value
  const phone = document.getElementById('phone').value
  const address = document.getElementById('address').value
  const city = document.getElementById('city').value
  const state = document.getElementById('state').value
  const zip = document.getElementById('zip').value
  const message = document.getElementById('message').value
  const spamMsg = document.getElementById('spamMsg').value
  const inputs = [fullName, email, phone, address, city, state, zip, message]

  console.log(inputs)

  galleryTitle.scrollIntoView({ behavior: 'smooth' })
  if (spamMsg == '') {
    formResponse.textContent = 'Sending...'
    fetch(
      `/email?name=${fullName}&email=${email}&phone=${phone}&address=${address}&city=${city}&state=${state}&zip=${zip}&message=${message}`
    ).then((res) => {
      res.json().then((data) => {
        if (data.formResponse) {
          formResponse.textContent = data.formResponse
        } else {
          formResponse.textContent = 'Message Sent'
          document.querySelector('form').reset()
        }
      })
    })
  }
})
