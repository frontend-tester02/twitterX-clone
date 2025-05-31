import { Feather } from 'lucide-react'
import Link from 'next/link'

const SidebarPostBtn = () => {
	return (
		<Link href={'/'}>
			{/* MOBILE POST */}
			<div className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-blue-500 hover:bg-opacity-70 transition cursor-pointer'>
				<Feather size={24} color='white' />
			</div>

			{/* DESKTOP POST */}
			<div className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-blue-500 hover:bg-opacity-70 cursor-pointer'>
				<p className='hidden lg:block text-center font-semibold text-white text-[20px]'>
					POST
				</p>
			</div>
		</Link>
	)
}

export default SidebarPostBtn
