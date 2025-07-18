'use client'

import { IUser } from '@/types'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Loader2, MoreHorizontal } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
	user: IUser
}

const SidebarAccount = ({ user }: Props) => {
	const { data, status } = useSession()

	if (status == 'loading')
		return (
			<div className='flex items-center justify-center'>
				<Loader2 className='animate-spin text-sky-500' />
			</div>
		)

	return (
		<>
			{/* MOBIE SIDEBAR ACCOUNT */}
			<div className='lg:hidden block'>
				<div
					className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-red-500 hover:bg-opacity-80 transition cursor-pointer'
					onClick={() => signOut()}
				>
					<RiLogoutCircleLine size={24} color='white' />
				</div>
			</div>

			{/* DESKTOP SIDEBAR ACCOUNT */}
			<Popover>
				<PopoverTrigger className='w-full rounded-full hover:bg-secondary hidden lg:block cursor-pointer hover:bg-opacity-10 px-4 py-2 transition'>
					<div className='flex justify-between items-center gap-2'>
						<div className='flex gap-2 items-center'>
							<Avatar>
								<AvatarImage src={user.profileImage} />
								<AvatarFallback>{user.name[0]}</AvatarFallback>
							</Avatar>
							<div className='flex flex-col items-start text-white'>
								<p>{user.name}</p>
								{user.username ? (
									<p className='opacity-40'>@{user.username}</p>
								) : (
									<p className='opacity-40'>Manage account</p>
								)}
							</div>
						</div>
						<MoreHorizontal size={24} color='white' />
					</div>
				</PopoverTrigger>
				<PopoverContent className='rounded-md hover:bg-secondary'>
					<div
						className='font-bold rounded-md text-white cursor-pointer transition'
						onClick={() => signOut()}
					>
						Log out {user.username ? `@${user.username}` : user.name}
					</div>
				</PopoverContent>
			</Popover>
		</>
	)
}

export default SidebarAccount
