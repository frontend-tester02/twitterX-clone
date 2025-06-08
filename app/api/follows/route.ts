/* eslint-disable @typescript-eslint/no-explicit-any */
import Notification from '@/database/notification.model'
import User from '@/database/user.model'
import { authOptions } from '@/lib/auth-options'
import { connectToDatabase } from '@/lib/mongoose'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
	try {
		await connectToDatabase()
		const { currentUser }: any = await getServerSession(authOptions)
		const { userId } = await req.json()

		await User.findByIdAndUpdate(userId, {
			$push: { followers: currentUser._id },
		})

		await User.findByIdAndUpdate(currentUser._id, {
			$push: { following: userId },
		})

		const user = await User.findById(userId)

		await Notification.create({
			user: userId,
			body: `${user.name || user.userName} followed you!`,
		})

		await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { hasNewNotifications: true } }
		)

		return NextResponse.json({ message: 'Followed' })
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function DELETE(req: Request) {
	try {
		await connectToDatabase()
		const { currentUser }: any = await getServerSession(authOptions)
		const { userId } = await req.json()

		await User.findByIdAndUpdate(userId, {
			$pull: { followers: currentUser._id },
		})

		await User.findByIdAndUpdate(currentUser._id, {
			$pull: { following: userId },
		})

		return NextResponse.json({ message: 'Followed' })
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function GET(req: Request) {
	try {
		await connectToDatabase()
		const { searchParams } = new URL(req.url)
		const userId = searchParams.get('userId')
		const state = searchParams.get('state')

		const user = await User.findById(userId)

		if (state === 'following') {
			const following = await User.find({ _id: { $in: user.following } })
			return NextResponse.json(following)
		} else if (state === 'followers') {
			const followers = await User.find({ _id: { $in: user.followers } })
			return NextResponse.json(followers)
		}
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
