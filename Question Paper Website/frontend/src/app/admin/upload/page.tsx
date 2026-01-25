'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { papersAPI } from '@/lib/api';

const branches = ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT', 'OTHER'];
const examTypes = [
    { value: 'end-term', label: 'End Term' },
    { value: 'mid-term', label: 'Mid Term' },
    { value: 'supplementary', label: 'Supplementary' },
    { value: 'internal', label: 'Internal' },
];

export default function UploadPaperPage() {
    const { user, token, isAdmin, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        subjectCode: '',
        branch: 'CSE',
        semester: '1',
        year: new Date().getFullYear().toString(),
        examType: 'end-term',
        tags: '',
        description: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!authLoading && (!user || !isAdmin)) {
            router.push('/auth/login');
        }
    }, [user, isAdmin, authLoading, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Please select a PDF file');
                return;
            }
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('File size must be less than 10MB');
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('pdf', file);
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            await papersAPI.create(formDataToSend, token!);
            setSuccess(true);

            setTimeout(() => {
                router.push('/admin');
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
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
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm mb-4">
                        <Link href="/admin" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                            Admin
                        </Link>
                        <span className="text-[var(--muted-foreground)]">/</span>
                        <span className="text-[var(--foreground)]">Upload Paper</span>
                    </nav>
                    <h1 className="text-3xl font-bold">Upload Question Paper</h1>
                    <p className="text-[var(--muted-foreground)] mt-2">Add a new question paper to the database</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {success ? (
                    <div className="card p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Upload Successful!</h2>
                        <p className="text-[var(--muted-foreground)]">Redirecting to dashboard...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="card p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* File Upload */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-2">PDF File *</label>
                            <div className={`border-2 border-dashed rounded-lg p-8 text-center ${file ? 'border-green-500 bg-green-500/5' : 'border-[var(--border)]'}`}>
                                {file ? (
                                    <div className="flex items-center justify-center space-x-4">
                                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <div className="text-left">
                                            <p className="font-medium">{file.name}</p>
                                            <p className="text-sm text-[var(--muted-foreground)]">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setFile(null)}
                                            className="p-2 hover:bg-[var(--secondary)] rounded-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <svg className="w-12 h-12 mx-auto text-[var(--muted-foreground)] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p className="font-medium mb-1">Click to upload or drag and drop</p>
                                        <p className="text-sm text-[var(--muted-foreground)]">PDF files only (max 10MB)</p>
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-sm font-medium mb-2">Title *</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="input"
                                placeholder="e.g., Data Structures End Term 2024"
                            />
                        </div>

                        {/* Subject */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject *</label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                    placeholder="e.g., Data Structures"
                                />
                            </div>
                            <div>
                                <label htmlFor="subjectCode" className="block text-sm font-medium mb-2">Subject Code</label>
                                <input
                                    id="subjectCode"
                                    name="subjectCode"
                                    type="text"
                                    value={formData.subjectCode}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="e.g., CS201"
                                />
                            </div>
                        </div>

                        {/* Branch, Semester, Year */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <label htmlFor="branch" className="block text-sm font-medium mb-2">Branch *</label>
                                <select
                                    id="branch"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    {branches.map((branch) => (
                                        <option key={branch} value={branch}>{branch}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="semester" className="block text-sm font-medium mb-2">Semester *</label>
                                <select
                                    id="semester"
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="year" className="block text-sm font-medium mb-2">Year *</label>
                                <input
                                    id="year"
                                    name="year"
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    value={formData.year}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                />
                            </div>
                        </div>

                        {/* Exam Type */}
                        <div className="mb-6">
                            <label htmlFor="examType" className="block text-sm font-medium mb-2">Exam Type *</label>
                            <select
                                id="examType"
                                name="examType"
                                value={formData.examType}
                                onChange={handleChange}
                                className="input"
                            >
                                {examTypes.map((type) => (
                                    <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Tags */}
                        <div className="mb-6">
                            <label htmlFor="tags" className="block text-sm font-medium mb-2">Tags</label>
                            <input
                                id="tags"
                                name="tags"
                                type="text"
                                value={formData.tags}
                                onChange={handleChange}
                                className="input"
                                placeholder="e.g., algorithms, trees, sorting (comma separated)"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="input resize-none"
                                placeholder="Optional description of the paper..."
                            />
                        </div>

                        {/* Submit */}
                        <div className="flex items-center justify-end space-x-4">
                            <Link href="/admin" className="btn btn-secondary">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Uploading...
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>
                                        Upload Paper
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
