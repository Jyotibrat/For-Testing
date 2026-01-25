'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import PDFViewer from '@/components/PDFViewer';
import { papersAPI } from '@/lib/api';

interface Paper {
    _id: string;
    title: string;
    subject: string;
    subjectCode?: string;
    branch: string;
    semester: number;
    year: number;
    examType: string;
    pdfUrl: string;
    description?: string;
    tags?: string[];
    views: number;
    downloads: number;
    createdAt: string;
    uploadedBy?: {
        name: string;
    };
}

const examTypeLabels: Record<string, string> = {
    'mid-term': 'Mid Term',
    'end-term': 'End Term',
    'supplementary': 'Supplementary',
    'internal': 'Internal',
};

export default function PaperDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [paper, setPaper] = useState<Paper | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaper = async () => {
            try {
                const data = await papersAPI.getById(resolvedParams.id);
                setPaper(data.data.paper);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load paper');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPaper();
    }, [resolvedParams.id]);

    const handleDownload = async () => {
        if (!paper) return;

        try {
            await papersAPI.trackDownload(paper._id);
            window.open(paper.pdfUrl, '_blank');
        } catch (error) {
            console.error('Download tracking failed:', error);
            window.open(paper.pdfUrl, '_blank');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[var(--muted-foreground)]">Loading paper...</p>
                </div>
            </div>
        );
    }

    if (error || !paper) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-[var(--muted-foreground)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="text-xl font-bold mb-2">Paper Not Found</h2>
                    <p className="text-[var(--muted-foreground)] mb-4">{error || 'The requested paper could not be found.'}</p>
                    <Link href="/papers" className="btn btn-primary">
                        Browse Papers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen animate-fade-in">
            {/* Breadcrumb */}
            <div className="bg-[var(--secondary)] py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                            Home
                        </Link>
                        <span className="text-[var(--muted-foreground)]">/</span>
                        <Link href="/papers" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                            Papers
                        </Link>
                        <span className="text-[var(--muted-foreground)]">/</span>
                        <span className="text-[var(--foreground)]">{paper.subject}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* PDF Viewer */}
                    <div className="lg:col-span-2">
                        <PDFViewer
                            url={paper.pdfUrl}
                            title={paper.title}
                            onDownload={handleDownload}
                        />
                    </div>

                    {/* Paper Info Sidebar */}
                    <div className="space-y-6">
                        {/* Main Info Card */}
                        <div className="card p-6">
                            <h1 className="text-2xl font-bold mb-4">{paper.title}</h1>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[var(--muted-foreground)]">Subject</span>
                                    <span className="font-medium">{paper.subject}</span>
                                </div>
                                {paper.subjectCode && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-[var(--muted-foreground)]">Code</span>
                                        <span className="font-medium">{paper.subjectCode}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-[var(--muted-foreground)]">Branch</span>
                                    <span className="badge">{paper.branch}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[var(--muted-foreground)]">Semester</span>
                                    <span className="badge">Semester {paper.semester}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[var(--muted-foreground)]">Year</span>
                                    <span className="badge">{paper.year}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[var(--muted-foreground)]">Exam Type</span>
                                    <span className="badge-primary">{examTypeLabels[paper.examType] || paper.examType}</span>
                                </div>
                            </div>

                            {paper.description && (
                                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                                    <h3 className="font-medium mb-2">Description</h3>
                                    <p className="text-[var(--muted-foreground)] text-sm">{paper.description}</p>
                                </div>
                            )}

                            {paper.tags && paper.tags.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-[var(--border)]">
                                    <h3 className="font-medium mb-2">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {paper.tags.map((tag) => (
                                            <Link
                                                key={tag}
                                                href={`/papers?q=${encodeURIComponent(tag)}`}
                                                className="badge hover:bg-[var(--primary)] hover:text-white transition"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Stats Card */}
                        <div className="card p-6">
                            <h3 className="font-semibold mb-4">Statistics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-[var(--secondary)] rounded-lg">
                                    <div className="text-2xl font-bold text-[var(--primary)]">{paper.views}</div>
                                    <div className="text-sm text-[var(--muted-foreground)]">Views</div>
                                </div>
                                <div className="text-center p-4 bg-[var(--secondary)] rounded-lg">
                                    <div className="text-2xl font-bold text-[var(--primary)]">{paper.downloads}</div>
                                    <div className="text-sm text-[var(--muted-foreground)]">Downloads</div>
                                </div>
                            </div>
                        </div>

                        {/* Download Button */}
                        <button
                            onClick={handleDownload}
                            className="w-full btn btn-primary py-4 text-lg"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF
                        </button>

                        {/* Related Papers Link */}
                        <Link
                            href={`/papers?branch=${paper.branch}&semester=${paper.semester}`}
                            className="block text-center text-[var(--primary)] hover:underline"
                        >
                            View more {paper.branch} Semester {paper.semester} papers →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
