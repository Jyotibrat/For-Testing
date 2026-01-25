'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import PaperCard from '@/components/PaperCard';
import { papersAPI } from '@/lib/api';

interface Paper {
  _id: string;
  title: string;
  subject: string;
  branch: string;
  semester: number;
  year: number;
  examType: string;
  pdfUrl: string;
  views?: number;
  downloads?: number;
}

const branches = [
  { name: 'CSE', icon: '💻', color: 'from-blue-500/20 to-blue-600/20 text-blue-500 border-blue-500/20' },
  { name: 'ECE', icon: '📡', color: 'from-green-500/20 to-green-600/20 text-green-500 border-green-500/20' },
  { name: 'MECH', icon: '⚙️', color: 'from-orange-500/20 to-orange-600/20 text-orange-500 border-orange-500/20' },
  { name: 'CIVIL', icon: '🏗️', color: 'from-yellow-500/20 to-yellow-600/20 text-yellow-500 border-yellow-500/20' },
  { name: 'EEE', icon: '⚡', color: 'from-purple-500/20 to-purple-600/20 text-purple-500 border-purple-500/20' },
  { name: 'IT', icon: '🌐', color: 'from-pink-500/20 to-pink-600/20 text-pink-500 border-pink-500/20' },
];

export default function HomePage() {
  const [popularPapers, setPopularPapers] = useState<Paper[]>([]);
  const [recentPapers, setRecentPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const [popularRes, recentRes] = await Promise.all([
          papersAPI.getPopular(6),
          papersAPI.getRecent(6),
        ]);
        setPopularPapers(popularRes.data.papers);
        setRecentPapers(recentRes.data.papers);
      } catch (error) {
        console.error('Failed to fetch papers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPapers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-30 animate-pulse-soft"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] opacity-30 animate-pulse-soft delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] opacity-20"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-6 hover:border-primary/50 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>Now featuring End Term 2024 papers</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-foreground">
            Master your exams with <br />
            <span className="text-gradient">Past Question Papers</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The most comprehensive archive of previous year question papers.
            Search by branch, semester, or subject instantly.
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar large />
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>Popular:</span>
            {['Maths', 'Physics', 'Data Structures', 'Circuits'].map((tag) => (
              <Link
                key={tag}
                href={`/papers?q=${tag}`}
                className="hover:text-primary underline decoration-dotted underline-offset-4 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-secondary/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Papers Archived', value: '500+' },
              { label: 'Active Students', value: '1.2k+' },
              { label: 'Universities', value: '12' },
              { label: 'Downloads', value: '50k+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1 tracking-tight">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* Browse by Branch */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Browse by Branch</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {branches.map((branch) => (
              <Link
                key={branch.name}
                href={`/papers?branch=${branch.name}`}
                className={`group p-4 rounded-xl border bg-card/50 hover:bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${branch.color}`}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{branch.icon}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{branch.name}</h3>
                <p className="text-xs opacity-70 mt-1">Explore papers →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Papers */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">Trending Papers</h2>
              <p className="text-muted-foreground text-sm">Most viewed papers this week</p>
            </div>
            <Link href="/papers?popular=true" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 group">
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-xl bg-secondary/50 animate-pulse border border-border"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularPapers.map((paper) => (
                <PaperCard key={paper._id} paper={paper} />
              ))}
            </div>
          )}
        </section>

        {/* Recent Uploads */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-1">Just Added</h2>
              <p className="text-muted-foreground text-sm">Freshly archived exam papers</p>
            </div>
            <Link href="/papers" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 group">
              View Archive
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-xl bg-secondary/50 animate-pulse border border-border"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPapers.map((paper) => (
                <PaperCard key={paper._id} paper={paper} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to ace your semester?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the community of top scorers. Contribute your own papers or simply download what you need.
            It's all free, forever.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/auth/register" className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-[0_0_20px_-5px_var(--primary)] text-lg">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
