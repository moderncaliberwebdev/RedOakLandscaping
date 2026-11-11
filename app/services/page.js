export const metadata = { title: 'Services | Red Oak Landscaping Inc' }

const services = [
  {
    img: 'hardscaping.jpg',
    title: 'Hardscaping',
    text: 'Installation of Patios, Walks, and Retaining Walls, and Outdoor Living Areas.',
    headerClass: 'oneLineHeader',
  },
  {
    img: 'residential.jpg',
    title: 'Residential Landscape Design & Installation',
    text: 'Designing and landscaping new homes as well as updating landscapes on older home designs.',
  },
  {
    img: 'excavating.jpg',
    title: 'Light Excavating',
    text: 'Grading Swales and installation of Drain Pipes for buried down spouts. Light Excavator/Skid Loader Work.',
    headerClass: 'oneLineHeader',
  },
  {
    img: 'commercial.jpg',
    title: 'Commercial Landscaping',
    text: 'Landscape Installations as per plan provided by a contractor. Includes Plantings, Retaining Walls, and Hardscaping.',
  },
  {
    img: 'seeding.jpg',
    title: 'Seeding and Erosion Control',
    text: 'Installation of lawns and erosion control materials for residential and commercial projects.',
    headerClass: 'seedingHeader',
  },
  {
    img: 'driveway.jpg',
    title: 'Permeable Driveways and Patios',
    text: 'Installation of permeable driveway and patio systems.',
    headerClass: 'seedingHeader',
  },
]

export default function Services() {
  return (
    <>
      <p id='galleryTitle'>Services</p>
      <main id='servicesMain'>
        {services.map(({ img, title, text, headerClass }) => (
          <div className='servicesContainer' key={title}>
            <img className='serviceImg' src={`/images/${img}`} alt={title} />
            <p className={`imgHeader ${headerClass || ''}`}>{title}</p>
            <p className='imgText'>{text}</p>
          </div>
        ))}
      </main>
    </>
  )
}
