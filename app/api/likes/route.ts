import Notification from '@/database/notification.model'
import Post from '@/database/post.model'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
	try {
		await connectToDatabase()
		const { postId, userId } = await req.json()

		const post = await Post.findByIdAndUpdate(
			postId,
			{ $push: { likes: userId } },
			{ new: true }
		)

		const user = await User.findById(userId)

		await Notification.create({
			user: String(post.user),
			body: `${user.name || user.userName} liked your post!`,
		})

		await User.findOneAndUpdate(
			{ _id: String(post.user) },
			{ $set: { hasNewNotifications: true } }
		)

		return NextResponse.json(post)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function DELETE(req: Request) {
	try {
		await connectToDatabase()
		const { postId, userId } = await req.json()

		const post = await Post.findByIdAndUpdate(
			postId,
			{ $pull: { likes: userId } },
			{ new: true }
		)

		return NextResponse.json(post)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
