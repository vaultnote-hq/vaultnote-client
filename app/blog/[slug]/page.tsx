import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ViralCTA } from '@/components/viral-cta';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { SocialShare } from '@/components/social-share';

export const dynamic = 'force-static';

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | VaultNote Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = getAllPosts();
  
  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/blog" />

      <article className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              {post.title}
            </h1>
            {post.author && (
              <p className="text-muted-foreground mb-4">By {post.author}</p>
            )}
          </header>

          {/* Content */}
          <div 
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-ul:my-4 prose-a:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold mb-4">Share this article</h3>
            <SocialShare title={post.title} />
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <ViralCTA />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-xl font-semibold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                  >
                    <span className="text-xs text-primary font-medium">{p.category}</span>
                    <h3 className="font-medium mt-1 line-clamp-2">{p.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </div>
  );
}
