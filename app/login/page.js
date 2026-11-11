import LoginForm from './LoginForm'

export const metadata = { title: 'Login | Red Oak Landscaping Inc', robots: { index: false } }

export default function Login() {
  return (
    <>
      <p id='galleryTitle'>Login</p>
      <main id='loginMain'>
        <LoginForm />
      </main>
    </>
  )
}
