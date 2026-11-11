import Link from 'next/link'
import './not-found.css'

export default function NotFound() {
  return (
    <div className='error'>
      <img src='/images/sadtree.png' alt='Sad Tree' />
      <p className='error__message'>Uh oh. You&apos;ve found a page that doesn&apos;t exist. Try going home!</p>
      <Link href='/'><button className='error__button'>Home</button></Link>
    </div>
  )
}
