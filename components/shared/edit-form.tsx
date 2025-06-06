'use client'

import { userSchema } from '@/lib/validation'
import { IUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useState } from 'react'
import Button from '../ui/button'
import { Textarea } from '../ui/textarea'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useEditModal from '@/hooks/useEditModal'

interface Props {
	user: IUser
}
const EditForm = ({ user }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()
	const editModal = useEditModal()

	const form = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: user.username || '',
			name: user.name || '',
			bio: user.bio || '',
			location: user.location || '',
		},
	})

	const onSubmit = async (values: z.infer<typeof userSchema>) => {
		try {
			setIsLoading(true)
			await axios.put(`/api/users/${user._id}?type=updateFields`, values)
			router.refresh()
			editModal.onClose()
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 relative -top-8 mx-4'
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Name' disabled={isLoading} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Username' disabled={isLoading} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder='Location' disabled={isLoading} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea placeholder='Bio' disabled={isLoading} {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type='submit'
					label={'Save'}
					secondary
					large
					fullWidth
					disabled={isLoading}
					isLoading={isLoading}
				/>
			</form>
		</Form>
	)
}

export default EditForm
