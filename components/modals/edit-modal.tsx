/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import useEditModal from '@/hooks/useEditModal'
import { IUser } from '@/types'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CoverImageUpload from '../shared/cover-image-upload'
import ProfileImageUpload from '../shared/profile-image-upload'
import Modal from '../ui/modal'
import axios from 'axios'
import EditForm from '../shared/edit-form'
import { toast } from 'sonner'

interface Props {
	user: IUser
}
const EditModal = ({ user }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [coverImage, setCoverImage] = useState('')
	const [profileImage, setProfileImage] = useState('')

	const editModal = useEditModal()
	const router = useRouter()

	useEffect(() => {
		setCoverImage(user.coverImage)
		setProfileImage(user.profileImage)
	}, [user])

	const handleImageUpload = async (image: string, isProfileImage: boolean) => {
		try {
			setIsLoading(true)
			await axios.put(`/api/users/${user._id}?type=updateImage`, {
				[isProfileImage ? 'profileImage' : 'coverImage']: image,
			})

			router.refresh()
			setIsLoading(false)
		} catch (error: any) {
			if (error.response.data.error) {
				return toast(error.response.data.error)
			} else {
				return toast('Something went wrong. Please try again later')
			}
			setIsLoading(false)
		}
	}

	const bodyContent = (
		<>
			{isLoading && (
				<div className='absolute z-10 h-[300px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center items-center'>
					<Loader2 className='animate-spin text-sky-500' />
				</div>
			)}
			<CoverImageUpload
				coverImage={coverImage}
				onChange={image => handleImageUpload(image, false)}
			/>
			<ProfileImageUpload
				profileImage={profileImage}
				onChange={image => handleImageUpload(image, true)}
			/>

			<EditForm user={user} />
		</>
	)
	return (
		<Modal
			body={bodyContent}
			isOpen={editModal.isOpen}
			onClose={editModal.onClose}
			isEditing
		/>
	)
}

export default EditModal
