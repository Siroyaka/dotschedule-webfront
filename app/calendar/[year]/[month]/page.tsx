import { redirect } from 'next/navigation'

interface Slug {
    year: string
    month: string
}

interface PageProps {
  params: Slug
}

async function Page({params}: PageProps) {
    const url = `/streaming/calendar/${params.year}/${params.month}`;
    redirect(url)
}

export default Page;