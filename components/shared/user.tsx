/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { IUser } from '@/types'
import { sliceText } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '../ui/button'
import axios from 'axios'

interface Props {
	user: IUser
	onChangeFollowing?: (user: IUser[]) => void
	isFollow?: boolean
	following?: IUser[]
}

const User = ({ user, onChangeFollowing, isFollow, following }: Props) => {
	const [isLoading, setIsLoading] = useState(false)

	const { data: session }: any = useSession()
	const router = useRouter()

	const onUnFollow = async () => {}

	const onFollow = async () => {
		try {
			setIsLoading(true)
			await axios.put('/api/follows', {
				userId: user._id,
				currentUserId: session.currentUser._id,
			})
			const updateFollowing = [...(following as IUser[]), user]
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			onChangeFollowing && onChangeFollowing(updateFollowing)
			router.refresh()
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}
	return (
		<div className='flex gap-3 items-center justify-between cursor-pointer hover:bg-slate-300 hover:bg-opacity-10 transition py-2 px-3 rounded-md'>
			<div className='flex items-center gap-2 cursor-pointer'>
				<Avatar>
					<AvatarImage src={user.profileImage} />
					<AvatarFallback>{user.name[0]}</AvatarFallback>
				</Avatar>

				<div className='flex flex-col'>
					<p className='text-white font-semibold text-sm line-clamp-1'>
						{user.name}
					</p>
					<p className='text-white font-semibold text-sm line-clamp-1'>
						{user.username
							? `@${sliceText(user.username, 16)}`
							: sliceText(user.email, 16)}
					</p>
				</div>
			</div>

			{isFollow && user._id !== session?.currentUser?._id ? (
				user?.followers?.includes(session?.currentUser?._id) ? (
					<Button
						label={'Unfollow'}
						outline
						classNames='h-[30px] p-0 w-fit px-3 text-sm'
						disabled={isLoading}
						onClick={onUnFollow}
					/>
				) : (
					<Button
						label={'Follow'}
						outline
						classNames='h-[30px] p-0 w-fit px-3 text-sm'
						disabled={isLoading}
						onClick={onFollow}
					/>
				)
			) : null}
		</div>
	)
}

export default User
