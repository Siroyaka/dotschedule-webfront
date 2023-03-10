import { redirect } from 'next/navigation'
import { getJTCNow } from 'library/DateFunctions';

async function Page() {
    const d = getJTCNow();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const url = `/streaming/day/${year}/${month}/${day}`;
    redirect(url)
}

export default Page;