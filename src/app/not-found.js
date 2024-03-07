import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='bg-slate-50'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}