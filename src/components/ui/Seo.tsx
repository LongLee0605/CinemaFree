import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const appName = import.meta.env.VITE_APP_NAME || 'CinemaFree';

export function Seo({
  title,
  description = 'CinemaFree - Xem phim miễn phí chất lượng cao, cập nhật phim mới nhất mỗi ngày.',
  keywords = 'xem phim, phim miễn phí, phim online, phim mới, phim hay, phim HD',
  image = '/logo512.png',
  url,
  type = 'website',
}: SeoProps) {
  const fullTitle = title ? `${title} - ${appName}` : appName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
