/* eslint-disable @typescript-eslint/no-explicit-any */
import Auth from '@/components/auth'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import React from 'react'

interface Props {
	children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
	const session: any = await getServerSession(authOptions)

	if (!session) {
		return (
			<div className='container h-screen mx-auto max-w-7xl'>
				<Auth />
			</div>
		)
	}

	return (
		<div className='lg:container h-screen mx-auto lg:max-w-7xl'>
			<div className='flex'>
				<div className='flex flex-1 border-x-[1px] border-neutral-800 lg:mx-4 ml-1'>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout
