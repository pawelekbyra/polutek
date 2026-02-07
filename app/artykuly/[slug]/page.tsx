import { ARTICLES } from '@/lib/data';
import ArticleGuard from '@/components/ArticleGuard';
import ElixirArticle from '@/components/articles/ElixirArticle';
import StypulkowskaArticle from '@/components/articles/StypulkowskaArticle';
import ChmurkaArticle from '@/components/articles/ChmurkaArticle';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const renderContent = () => {
    switch (article.id) {
      case 'eliksir':
        return <ElixirArticle />;
      case 'stypulkowska':
        return <StypulkowskaArticle />;
      case 'chmurka':
        return <ChmurkaArticle />;
      default:
        return null;
    }
  };

  return (
    <ArticleGuard articleId={article.id}>
      {renderContent()}
    </ArticleGuard>
  );
}
