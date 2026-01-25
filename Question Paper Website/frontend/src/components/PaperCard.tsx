import Link from 'next/link';

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

interface PaperCardProps {
    paper: Paper;
}

const examTypeLabels: Record<string, string> = {
    'mid-term': 'Mid Term',
    'end-term': 'End Term',
    'supplementary': 'Supplementary',
    'internal': 'Internal',
};

const branchColors: Record<string, string> = {
    CSE: 'from-blue-500/20 to-blue-600/20 text-blue-500 border-blue-500/20',
    ECE: 'from-green-500/20 to-green-600/20 text-green-500 border-green-500/20',
    MECH: 'from-orange-500/20 to-orange-600/20 text-orange-500 border-orange-500/20',
    CIVIL: 'from-yellow-500/20 to-yellow-600/20 text-yellow-500 border-yellow-500/20',
    EEE: 'from-purple-500/20 to-purple-600/20 text-purple-500 border-purple-500/20',
    IT: 'from-pink-500/20 to-pink-600/20 text-pink-500 border-pink-500/20',
    OTHER: 'from-gray-500/20 to-gray-600/20 text-gray-500 border-gray-500/20',
};

export default function PaperCard({ paper }: PaperCardProps) {
    const branchStyle = branchColors[paper.branch] || branchColors.OTHER;

    return (
        <Link href={`/papers/${paper._id}`}>
            <div className="group h-full bg-card border border-border rounded-xl p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_-10px_var(--primary)] hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`px-3 py-1 rounded-md bg-gradient-to-r border text-xs font-bold ${branchStyle}`}>
                        {paper.branch}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground px-2 py-1 bg-secondary rounded-md border border-border/50">
                        {paper.year}
                    </span>
                </div>

                {/* Content */}
                <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors tracking-tight">
                        {paper.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                        {paper.subject}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-full bg-secondary border border-border/50">
                            Sem {paper.semester}
                        </span>
                        <span>•</span>
                        <span>{examTypeLabels[paper.examType] || paper.examType}</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1" title="Views">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{paper.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1" title="Downloads">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>{paper.downloads || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
