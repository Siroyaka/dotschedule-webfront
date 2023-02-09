import InitialMetaData from 'src/lib/InitialMetaData';
import IosMeta from 'src/components/standalone/IosMeta';

export default function Head() {
  return (
    <>
      <title></title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <meta name="description" content={InitialMetaData.ogDescription}/>
      <meta name="twitter:card" content={InitialMetaData.twCardType} />
      <meta name="twitter:site" content={InitialMetaData.twSite}/>
      <meta property="og:url" content={InitialMetaData.ogUrl}/>
      <meta property="og:title" content={InitialMetaData.ogTitle}/>
      <meta property="og:description" content={InitialMetaData.ogDescription}/>
      <meta property="og:image" content={InitialMetaData.ogImage} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#FAC141" />
      <IosMeta />
    </>
  )
}
