/* eslint-disable @typescript-eslint/no-explicit-any */
import ProfileBio from '@/components/profile/profile-bio'
import ProfileHero from '@/components/profile/profile-hero'
import Header from '@/components/shared/header'
import PostFeed from '@/components/shared/post-feed'
import { getUserById } from '@/lib/actions/user.action'
import { authOptions } from '@/lib/auth-options'
import { IUser } from '@/types'
import { getServerSession } from 'next-auth'
import React from 'react'

const Page = async ({ params }: { params: { userId: string } }) => {
	const { userId } = await params
	const session: any = await getServerSession(authOptions)
	const user = await getUserById(userId)

	return (
		<>
			<Header label={user.name!} isBack />
			<ProfileHero user={user as IUser} />
			<ProfileBio
				user={JSON.parse(JSON.stringify(user))}
				userId={JSON.parse(JSON.stringify(session.currentUser._id))}
			/>

			<PostFeed
				userId={params.userId}
				user={JSON.parse(JSON.stringify(session.currentUser))}
			/>
		</>
	)
}

export default Page
