'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PaperCard from '@/components/PaperCard';
import FilterPanel from '@/components/FilterPanel';
import SearchBar from '@/components/SearchBar';
import { papersAPI, searchAPI } from '@/lib/api';

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

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

function PapersContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [papers, setPapers] = useState<Paper[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const filters = {
        branch: searchParams.get('branch') || '',
        semester: searchParams.get('semester') || '',
        year: searchParams.get('year') || '',
        examType: searchParams.get('examType') || '',
    };
    const searchQuery = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');

    const fetchPapers = useCallback(async () => {
        setIsLoading(true);
        try {
            const params: Record<string, string | number> = { page };

            if (filters.branch) params.branch = filters.branch;
            if (filters.semester) params.semester = filters.semester;
            if (filters.year) params.year = filters.year;
            if (filters.examType) params.examType = filters.examType;

            let data;
            if (searchQuery) {
                data = await searchAPI.search(searchQuery, params);
                setPapers(data.data.papers);
                setPagination(null);
            } else {
                data = await papersAPI.getAll(params);
                setPapers(data.data.papers);
                setPagination(data.data.pagination);
            }
        } catch (error) {
            console.error('Failed to fetch papers:', error);
        } finally {
            setIsLoading(false);
        }
    }, [filters.branch, filters.semester, filters.year, filters.examType, searchQuery, page]);

    useEffect(() => {
        fetchPapers();
    }, [fetchPapers]);

    const handleFilterChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.delete('page');
        router.push(`/papers?${params.toString()}`);
    };

    const handleClearFilters = () => {
        router.push('/papers');
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        router.push(`/papers?${params.toString()}`);
    };

    return (
        <div className="min-h-screen animate-fade-in">
            {/* Header */}
            <div className="bg-secondary/30 backdrop-blur border-b border-border py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                        {searchQuery ? (
                            <span>Results for <span className="text-primary">"{searchQuery}"</span></span>
                        ) : (
                            'Browse Question Papers'
                        )}
                    </h1>
                    <SearchBar className="max-w-xl" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile filter toggle */}
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="lg:hidden flex items-center justify-center w-full py-3 bg-secondary/50 rounded-lg text-sm font-medium border border-border"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    {/* Sidebar */}
                    <aside className={`lg:w-72 lg:flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
                        <FilterPanel
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                        />
                    </aside>

                    {/* Main content */}
                    <main className="flex-grow">
                        {/* Results count */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-muted-foreground font-medium">
                                {pagination ? (
                                    `Showing ${papers.length} of ${pagination.total} papers`
                                ) : (
                                    `${papers.length} papers found`
                                )}
                            </p>
                        </div>

                        {/* Papers grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-64 rounded-xl bg-secondary/50 animate-pulse border border-border"></div>
                                ))}
                            </div>
                        ) : papers.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {papers.map((paper) => (
                                    <PaperCard key={paper._id} paper={paper} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 glass rounded-xl border-dashed">
                                <div className="w-16 h-16 mx-auto bg-secondary/50 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No papers found</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto">
                                    Try adjusting your search or filters to find what you&apos;re looking for.
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination && pagination.pages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-12 mb-12">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page <= 1}
                                    className="px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                                        .filter(p => p === 1 || p === pagination.pages || Math.abs(p - page) <= 1)
                                        .map((p, index, arr) => (
                                            <div key={p} className="flex items-center">
                                                {index > 0 && arr[index - 1] !== p - 1 && <span className="px-2 text-muted-foreground">...</span>}
                                                <button
                                                    onClick={() => handlePageChange(p)}
                                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${p === page
                                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                                            : 'hover:bg-secondary/80 text-muted-foreground hover:text-foreground'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            </div>
                                        ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page >= pagination.pages}
                                    className="px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default function PapersPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <PapersContent />
        </Suspense>
    );
}
