'use client'
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { BsDot } from 'react-icons/bs'

interface Props {
	label: string
	icon: LucideIcon
	notification?: boolean
	path: string
}

const SidebarItem = ({ icon: Icon, label, notification, path }: Props) => {
	return (
		<div className='flex flex-row items-center'>
			{/* MOBILE SIDEBAR ITEM */}
			<div className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-blue-500 hover:bg-opacity-70 lg:hidden'>
				<Icon size={28} color='white' />
			</div>

			{/* DESKTOP SIDEBAR ITEM */}
			<div
				className={
					'relative hidden lg:flex gap-4 p-4 rounded-full hover:bg-blue-500 hover:bg-opacity-70 cursor-pointer items-center'
				}
			>
				<Icon size={24} color='white' />
				<p className='hidden lg:block text-xl text-white'>{label}</p>
				{notification ? (
					<BsDot className={'text-sky-500 absolute -top-4 left-0'} size={70} />
				) : null}
			</div>
		</div>
	)
}

export default SidebarItem
