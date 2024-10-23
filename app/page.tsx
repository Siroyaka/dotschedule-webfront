import ContentMain from 'components/container/ContentMain';

export const dynamic = 'force-dynamic';

async function Page() {
    return (
        <ContentMain>
            <main className='px-2'>
                <h1 className='text-3xl'>お知らせ</h1>
                <p className='mt-2'>
                    どっとスケジュールは2024年10月23日15:00にサービスを終了しました。
                </p>
                <p>
                    過去の配信情報は確認することができますが、以後の配信データの更新は行われません。
                </p>
            </main>
        </ContentMain>
    )

}

export default Page;