import { redirect } from 'next/navigation'

interface Slug {
    year: string
    month: string
    day: string
}

interface PageProps {
  params: Slug
}

async function Page({params}: PageProps) {
    const url = `/streaming/day/${params.year}/${params.month}/${params.day}`;
    redirect(url)
}

export default Page;