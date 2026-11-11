import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <Link href='/'>
        <img id='logo' src='/images/logo.png' alt='Red Oak Landscaping Inc.' />
      </Link>
      <nav>
        <Link href='/'>Home</Link>
        <Link href='/gallery'>Photo Gallery</Link>
        <Link href='/services'>Services</Link>
        <Link href='/estimate'>Free Estimate</Link>
        <Link href='/truegrid'>TrueGrid</Link>
        <Link href='/login'>Log In</Link>
      </nav>
    </header>
  )
}
