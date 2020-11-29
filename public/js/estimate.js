const galleryTitle = document.getElementById('galleryTitle')
const formResponse = document.getElementById('formResponse')
const formSubmit = document.querySelector('button')

const name = document.getElementById('name')
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const address = document.getElementById('address')
const city = document.getElementById('city')
const state = document.getElementById('state')
const zip = document.getElementById('zip')
const message = document.getElementById('message')
const spamMsg = document.getElementById('spamMsg')
const inputs = [name, email, phone, address, city, state, zip, message]

formSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    galleryTitle.scrollIntoView({ behavior: 'smooth' })
    if(spamMsg.value === '') {
        formResponse.textContent = 'Sending...'
        fetch(`/email?name=${name.value}&email=${email.value}&phone=${phone.value}&address=${address.value}&city=${city.value}&state=${state.value}&zip=${zip.value}&message=${message.value}`)
        .then((res) => {
            res.json().then((data) => {
                if(data.formResponse) {
                    formResponse.textContent = data.formResponse
                } else {
                    formResponse.textContent = 'Message Sent'
                    inputs.forEach(input => {
                        input.value = ''
                    })
                }
            })
        })
    }
    
})