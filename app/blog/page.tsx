import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { getAllPosts, getAllCategories, getFeaturedPosts } from '@/lib/blog';

// 1. SEO OPTIMIERUNG: Eigene Metadaten für den Blog-Hub
export const metadata: Metadata = {
  title: "Security & Privacy Blog | VaultNote Resources",
  description: "Expert guides on cybersecurity, GDPR compliance, and safe data sharing practices for teams and individuals. Stay secure with VaultNote.",
  alternates: {
    canonical: 'https://vaultnote.net/blog',
  },
  openGraph: {
    title: "VaultNote Security Blog",
    description: "Learn how to protect your data with expert guides on encryption and privacy.",
    type: 'website',
  }
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  // Fallback, falls keine Posts als 'featured' markiert sind, nimm den neuesten
  const displayFeatured = featuredPosts.length > 0 ? featuredPosts : [allPosts[0]];
  // Filtere die Featured Posts aus den Regular Posts, um Duplikate zu vermeiden
  const regularPosts = allPosts.filter(post => !displayFeatured.find(fp => fp.slug === post.slug));
  
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/blog" />

      {/* Hero */}
      <section className="py-16 sm:py-24 border-b border-border">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Security & Privacy Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Expert insights on encryption, privacy best practices, and secure communication. 
              Stay informed about protecting your sensitive information.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {displayFeatured.length > 0 && (
        <section className="py-12">
          <div className="max-w-screen-xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {displayFeatured.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-6xl opacity-50">🔐</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-primary font-medium">
                      Read more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">All Articles</h2>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border hover:bg-muted'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2 py-1 bg-muted text-muted-foreground rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated on Security
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Get the latest security tips, privacy news, and VaultNote updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <Button size="lg">Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}