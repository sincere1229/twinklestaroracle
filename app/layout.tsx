import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://twinklestaroracle.com'),
  title: 'Twinkle Star Oracle｜星詠みの案内人ルミナ',
  description:
    '星の図書館に宿る案内人ルミナが、あなたの魂の使命と運命の転機を紐解く。2秒で始まる無料占い体験。',
  openGraph: {
    title: 'Twinkle Star Oracle｜星詠みの案内人ルミナ',
    description:
      '星の図書館に宿る案内人ルミナが、あなたの魂の使命と運命の転機を紐解く、没入型AI占い神殿。',
    url: 'https://twinklestaroracle.com',
    siteName: 'Twinkle Star Oracle',
    locale: 'ja_JP',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#30134B',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Noto+Serif+JP:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
