'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { adminAPI } from '@/lib/api';

interface Stats {
    overview: {
        totalPapers: number;
        totalUsers: number;
        totalDownloads: number;
        totalViews: number;
    };
    recentPapers: Array<{
        _id: string;
        title: string;
        subject: string;
        branch: string;
        createdAt: string;
    }>;
    topPapers: Array<{
        _id: string;
        title: string;
        subject: string;
        downloads: number;
        views: number;
    }>;
    branchStats: Array<{
        _id: string;
        count: number;
    }>;
    monthlyUploads: Array<{
        _id: { year: number; month: number };
        count: number;
    }>;
}

export default function AdminDashboard() {
    const { user, token, isAdmin, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!user || !isAdmin)) {
            router.push('/auth/login');
            return;
        }

        if (token && isAdmin) {
            fetchStats();
        }
    }, [user, token, isAdmin, authLoading, router]);

    const fetchStats = async () => {
        try {
            const data = await adminAPI.getStats(token!);
            setStats(data.data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[var(--muted-foreground)]">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen animate-fade-in">
            {/* Header */}
            <div className="bg-[var(--secondary)] py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                            <p className="text-[var(--muted-foreground)] mt-1">Welcome back, {user?.name}</p>
                        </div>
                        <Link href="/admin/upload" className="btn btn-primary">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Upload Paper
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--muted-foreground)] text-sm">Total Papers</p>
                                <p className="text-3xl font-bold mt-1">{stats?.overview.totalPapers || 0}</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--muted-foreground)] text-sm">Total Users</p>
                                <p className="text-3xl font-bold mt-1">{stats?.overview.totalUsers || 0}</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--muted-foreground)] text-sm">Total Downloads</p>
                                <p className="text-3xl font-bold mt-1">{stats?.overview.totalDownloads || 0}</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[var(--muted-foreground)] text-sm">Total Views</p>
                                <p className="text-3xl font-bold mt-1">{stats?.overview.totalViews || 0}</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Link href="/admin/upload" className="card p-6 hover:border-[var(--primary)] transition group">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold group-hover:text-[var(--primary)] transition">Upload Paper</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">Add a new question paper</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/admin/papers" className="card p-6 hover:border-[var(--primary)] transition group">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold group-hover:text-[var(--primary)] transition">Manage Papers</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">Edit or delete papers</p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/admin/users" className="card p-6 hover:border-[var(--primary)] transition group">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold group-hover:text-[var(--primary)] transition">Manage Users</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">View and manage users</p>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Papers */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Recent Uploads</h2>
                            <Link href="/admin/papers" className="text-sm text-[var(--primary)] hover:underline">
                                View All
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {stats?.recentPapers.length ? (
                                stats.recentPapers.map((paper) => (
                                    <div key={paper._id} className="flex items-center justify-between p-3 bg-[var(--secondary)] rounded-lg">
                                        <div>
                                            <p className="font-medium text-sm line-clamp-1">{paper.title}</p>
                                            <p className="text-xs text-[var(--muted-foreground)]">{paper.subject} • {paper.branch}</p>
                                        </div>
                                        <span className="badge text-xs">
                                            {new Date(paper.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[var(--muted-foreground)] text-center py-4">No papers uploaded yet</p>
                            )}
                        </div>
                    </div>

                    {/* Top Papers */}
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Top Performing Papers</h2>
                        </div>
                        <div className="space-y-3">
                            {stats?.topPapers.length ? (
                                stats.topPapers.map((paper, index) => (
                                    <div key={paper._id} className="flex items-center justify-between p-3 bg-[var(--secondary)] rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-yellow-500 text-white' :
                                                    index === 1 ? 'bg-gray-400 text-white' :
                                                        index === 2 ? 'bg-amber-600 text-white' :
                                                            'bg-[var(--muted)] text-[var(--muted-foreground)]'
                                                }`}>
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p className="font-medium text-sm line-clamp-1">{paper.title}</p>
                                                <p className="text-xs text-[var(--muted-foreground)]">{paper.subject}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{paper.downloads} downloads</p>
                                            <p className="text-xs text-[var(--muted-foreground)]">{paper.views} views</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[var(--muted-foreground)] text-center py-4">No paper data available</p>
                            )}
                        </div>
                    </div>

                    {/* Branch Distribution */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">Papers by Branch</h2>
                        <div className="space-y-3">
                            {stats?.branchStats.length ? (
                                stats.branchStats.map((branch) => {
                                    const percentage = stats.overview.totalPapers > 0
                                        ? (branch.count / stats.overview.totalPapers) * 100
                                        : 0;
                                    return (
                                        <div key={branch._id}>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">{branch._id}</span>
                                                <span className="text-sm text-[var(--muted-foreground)]">{branch.count} papers</span>
                                            </div>
                                            <div className="w-full h-2 bg-[var(--secondary)] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full gradient-primary rounded-full transition-all"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-[var(--muted-foreground)] text-center py-4">No branch data available</p>
                            )}
                        </div>
                    </div>

                    {/* Monthly Uploads Chart */}
                    <div className="card p-6">
                        <h2 className="text-lg font-semibold mb-4">Monthly Uploads</h2>
                        <div className="flex items-end justify-between h-40 space-x-2">
                            {stats?.monthlyUploads.length ? (
                                stats.monthlyUploads.slice(-6).map((month, index) => {
                                    const maxCount = Math.max(...stats.monthlyUploads.map(m => m.count));
                                    const height = maxCount > 0 ? (month.count / maxCount) * 100 : 0;
                                    const monthName = new Date(month._id.year, month._id.month - 1).toLocaleDateString('en', { month: 'short' });
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center">
                                            <div className="w-full flex items-end justify-center" style={{ height: '120px' }}>
                                                <div
                                                    className="w-full max-w-[40px] gradient-primary rounded-t-lg transition-all hover:opacity-80"
                                                    style={{ height: `${Math.max(height, 5)}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-[var(--muted-foreground)] mt-2">{monthName}</p>
                                            <p className="text-xs font-medium">{month.count}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-[var(--muted-foreground)] text-center py-4 w-full">No upload data available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
