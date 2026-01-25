'use client';

import { useState } from 'react';

interface PDFViewerProps {
    url: string;
    title: string;
    onDownload: () => void;
}

export default function PDFViewer({ url, title, onDownload }: PDFViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className="card overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--secondary)]">
                <h3 className="font-medium truncate">{title}</h3>
                <div className="flex items-center space-x-2">
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary text-sm"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Open
                    </a>
                    <button
                        onClick={onDownload}
                        className="btn btn-primary text-sm"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                    </button>
                </div>
            </div>

            {/* PDF iframe */}
            <div className="relative" style={{ height: '70vh' }}>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--muted)]">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-[var(--muted-foreground)]">Loading PDF...</p>
                        </div>
                    </div>
                )}

                {error ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[var(--muted)]">
                        <div className="text-center">
                            <svg className="w-16 h-16 mx-auto text-[var(--muted-foreground)] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-[var(--muted-foreground)] mb-4">Failed to load PDF preview</p>
                            <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                Open PDF Directly
                            </a>
                        </div>
                    </div>
                ) : (
                    <iframe
                        src={`${url}#toolbar=0&navpanes=0`}
                        className="w-full h-full"
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsLoading(false);
                            setError(true);
                        }}
                        title={title}
                    />
                )}
            </div>
        </div>
    );
}
