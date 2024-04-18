'use client'

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { isAddress } from "viem"

export const AddressForm = () => {
  const router = useRouter()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const address = form.address.value
    if (!isAddress(address)) toast.error('Invalid address')
    router.push(`/${address}`)
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="address" type="text" placeholder="Enter an address" className='p-2 min-w-[26rem]' />
      <button type="submit" className="hidden">Submit</button>
    </form>
  )
}