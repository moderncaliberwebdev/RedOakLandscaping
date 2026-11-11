import EstimateForm from './EstimateForm'

export const metadata = { title: 'Free Estimate | Red Oak Landscaping Inc' }

export default function Estimate() {
  return (
    <>
      <p id='galleryTitle'>Free Estimate</p>
      <main id='estimateMain'>
        <EstimateForm />
      </main>
    </>
  )
}
