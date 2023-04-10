import Image from 'next/image'
import { Inter } from 'next/font/google'
import Form from '@/components/Prompts/Form'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="">
      <Form />
    </main>
  )
}
