import Auth from '@/components/auth'

const Page = () => {
	const user = false

	if (!user) return <Auth></Auth>
	return <div>Page</div>
}

export default Page
