/* eslint-disable @typescript-eslint/no-explicit-any */
import Comment from '@/database/comment.model'
import Notification from '@/database/notification.model'
import Post from '@/database/post.model'
import User from '@/database/user.model'
import { authOptions } from '@/lib/auth-options'
import { connectToDatabase } from '@/lib/mongoose'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		await connectToDatabase()
		const { body, userId, postId } = await req.json()

		const comment = await Comment.create({
			body,
			post: postId,
			user: userId,
		})
		const post = await Post.findByIdAndUpdate(postId, {
			$push: { comments: comment._id },
		})

		const user = await User.findById(userId)

		await Notification.create({
			user: String(post.user),
			body: `${user.name || user.userName} replied on your post!`,
		})

		await User.findOneAndUpdate(
			{ _id: String(post.user) },
			{ $set: { hasNewNotifications: true } }
		)

		return NextResponse.json(comment)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function PUT(req: Request) {
	try {
		await connectToDatabase()
		const { currentUser }: any = await getServerSession(authOptions)
		const { commentId } = await req.json()

		const comment = await Comment.findByIdAndUpdate(commentId, {
			$push: { likes: currentUser._id },
		})

		await Notification.create({
			user: String(comment.user),
			body: `${
				currentUser.name || currentUser.userName
			} liked on your replied post!`,
		})

		await User.findOneAndUpdate(
			{ _id: String(comment.user) },
			{ $set: { hasNewNotifications: true } }
		)

		return NextResponse.json(comment)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}

export async function DELETE(req: Request) {
	try {
		await connectToDatabase()
		const { currentUser }: any = await getServerSession(authOptions)
		const { commentId } = await req.json()

		const comment = await Comment.findByIdAndUpdate(commentId, {
			$pull: { likes: currentUser._id },
		})

		return NextResponse.json(comment)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
