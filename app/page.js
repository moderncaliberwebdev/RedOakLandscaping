import { ADDRESS, PHONE, COPYRIGHT } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <div className='imgContainer'>
        <img className='flowersImg img__small' src='/images/flowers.jpg' alt='flowers' />
        <img className='flowersImg img__large' src='/images/flowers-large.jpg' alt='flowers' />
      </div>
      <main>
        <p id='mainTxt'>
          Welcome to Red Oak Landscaping serving Lancaster, Lebanon, Berks, and Chester
          Counties. Providing Design, Installing Landscapes and Hardscapes. We enhance the
          beauty and value of your home on any scale whether large or small. Not only is your
          home a sanctuary, it is an investment. At Red Oak Landscaping we strive to enhance
          the beauty of both.
        </p>
        <p className='contact'>{ADDRESS}</p>
        <p className='contact'>{PHONE}</p>
      </main>
      <p id='copyright'>{COPYRIGHT}</p>
    </>
  )
}
