export const metadata = { title: 'TrueGrid | Red Oak Landscaping Inc' }

const TRUEGRID_URL = 'https://www.truegridpaver.com/'

export default function TrueGrid() {
  return (
    <>
      <a id='trueGridTitle' href={TRUEGRID_URL}>TrueGrid</a>
      <main id='servicesMain'>
        <a href={TRUEGRID_URL}>
          <img src='/images/truegrid-shot.png' alt='TrueGrid' className='truegrid-img' />
        </a>
      </main>
      <p className='truegrid-desc'>
        We are now a dealer of TrueGrid products, the world&apos;s strongest permeable pavers!
        Got heavy loads or need help with stormwater management? Trucks, rigs, or a high
        volume of automobiles? Commercial, industrial or retail site? Roadway, truck yard or
        parking lot? Need to delineate your parking? We have the permeable paver that fits
        your application.
        <a className='truegrid-button' href={TRUEGRID_URL}>Learn More</a>
      </p>
    </>
  )
}
