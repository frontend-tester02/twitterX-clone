/* eslint-disable @typescript-eslint/no-explicit-any */
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
