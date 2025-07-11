import Post from '@/database/post.model'
import User from '@/database/user.model'
import { authOptions } from '@/lib/auth-options'
import { connectToDatabase } from '@/lib/mongoose'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request, route: { params: { userId: string } }) {
	try {
		await connectToDatabase()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { currentUser }: any = await getServerSession(authOptions)

		const { searchParams } = new URL(req.url)
		const limit = searchParams.get('limit')

		const posts = await Post.find({ user: route.params.userId })
			.populate({
				path: 'user',
				model: User,
				select: 'name email profileImage _id username',
			})
			.limit(Number(limit))
			.sort({ createdAt: -1 })

		const filteredPost = posts.map(post => ({
			body: post.body,
			createdAt: post.createdAt,
			user: {
				_id: post.user._id,
				name: post.user.name,
				username: post.user.username,
				profileImage: post.user.profileImage,
				email: post.user.email,
			},
			likes: post.likes.length,
			comments: post.comments.length,
			hasLiked: post.likes.includes(currentUser._id),
			_id: post._id,
		}))

		return NextResponse.json(filteredPost)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
