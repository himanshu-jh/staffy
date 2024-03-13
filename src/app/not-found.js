import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className='bg-slate-50 align-items-center'>

      <img src="/zamy_logo.png" alt="Logo" className="mb-4" style={{ maxWidth: '100px' }} />
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button> <Link href="/">Return Home</Link> </Button>
      
    </div>
  )
}