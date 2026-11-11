import Link from 'next/link'

export const ADDRESS = '403 North 6th Street, Denver PA, 17517'
export const PHONE = 'Phone: 717 336 6318 / Fax: 717 336 4998'
export const COPYRIGHT = `Copyright © ${new Date().getFullYear()} Red Oak Landscaping Inc.`

const links = [
  ['/', 'home.png', 'Home'],
  ['/gallery', 'picture.png', 'Photo Gallery'],
  ['/services', 'wrench.png', 'Services'],
  ['/estimate', 'calculator.png', 'Free Estimate'],
  ['/truegrid', 'foxblock.png', 'TrueGrid'],
]

export default function Footer() {
  return (
    <footer>
      {links.map(([href, icon, alt]) => (
        <Link key={href} href={href}>
          <img className='footerImg' src={`/images/${icon}`} alt={alt} />
        </Link>
      ))}

      <div className='footerContact'>
        <div className='footerContact__copyrightContainer'>
          <p id='footCopyright'>{COPYRIGHT}</p>
        </div>
        <div className='footerContact__contactContainer'>
          <p className='footContact' id='footAddress'>{ADDRESS}</p>
          <p className='footContact' id='footPhone'>{PHONE}</p>
        </div>
      </div>
    </footer>
  )
}
