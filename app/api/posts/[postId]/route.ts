import Post from '@/database/post.model'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { NextResponse } from 'next/server'

export async function GET(
	req: Request,
	{ params }: { params: { postId: string } }
) {
	try {
		await connectToDatabase()
		const { postId } = await params

		const post = await Post.findById(postId).populate({
			path: 'user',
			model: User,
			select: 'name email profileImage _id username',
		})

		return NextResponse.json(post)
	} catch (error) {
		const result = error as Error
		return NextResponse.json({ error: result.message }, { status: 400 })
	}
}
