const form = document.querySelector('form')
const formResponse = document.querySelector('#formResponse')
const username = document.querySelector('#username')
const password = document.querySelector('#password')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const usernameValue = username.value
  const passwordValue = password.value
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const { data } = await axios.post(
    '/login',
    { usernameValue, passwordValue },
    config
  )

  if (data && data.username === usernameValue) {
    getAdmin(data.token)
  } else {
    formResponse.textContent = 'Username or Password Invalid'
  }
})

const getAdmin = async (token) => {
  const adminConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const { data } = await axios.get('/admin', adminConfig)
  console.log(data)
  //window.location.href = 'http://localhost:8080/admin'
}
