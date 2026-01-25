'use client';

interface FilterPanelProps {
    filters: {
        branch?: string;
        semester?: string;
        year?: string;
        examType?: string;
    };
    onFilterChange: (key: string, value: string) => void;
    onClearFilters: () => void;
}

const branches = ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT', 'OTHER'];
const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
const years = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() - i));
const examTypes = [
    { value: 'end-term', label: 'End Term' },
    { value: 'mid-term', label: 'Mid Term' },
    { value: 'supplementary', label: 'Supplementary' },
    { value: 'internal', label: 'Internal' },
];

export default function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
    const hasActiveFilters = Object.values(filters).some(v => v);

    return (
        <div className="glass rounded-xl p-5 border border-border sticky top-24">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center space-x-2 text-foreground">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <span>Filters</span>
                </h3>
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {/* Branch */}
                <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">Branch</label>
                    <div className="relative">
                        <select
                            value={filters.branch || ''}
                            onChange={(e) => onFilterChange('branch', e.target.value)}
                            className="w-full bg-secondary/50 border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition appearance-none"
                        >
                            <option value="">All Branches</option>
                            {branches.map((branch) => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-muted-foreground">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                {/* Semester */}
                <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">Semester</label>
                    <div className="relative">
                        <select
                            value={filters.semester || ''}
                            onChange={(e) => onFilterChange('semester', e.target.value)}
                            className="w-full bg-secondary/50 border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition appearance-none"
                        >
                            <option value="">All Semesters</option>
                            {semesters.map((sem) => (
                                <option key={sem} value={sem}>Semester {sem}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-muted-foreground">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                {/* Year */}
                <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">Year</label>
                    <div className="relative">
                        <select
                            value={filters.year || ''}
                            onChange={(e) => onFilterChange('year', e.target.value)}
                            className="w-full bg-secondary/50 border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition appearance-none"
                        >
                            <option value="">All Years</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-muted-foreground">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>

                {/* Exam Type */}
                <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1">Exam Type</label>
                    <div className="relative">
                        <select
                            value={filters.examType || ''}
                            onChange={(e) => onFilterChange('examType', e.target.value)}
                            className="w-full bg-secondary/50 border border-border rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition appearance-none"
                        >
                            <option value="">All Types</option>
                            {examTypes.map((type) => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-muted-foreground">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Active filters display */}
            {hasActiveFilters && (
                <div className="mt-6 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">Active filters:</p>
                    <div className="flex flex-wrap gap-2">
                        {filters.branch && (
                            <button onClick={() => onFilterChange('branch', '')} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                {filters.branch} <span className="ml-1">×</span>
                            </button>
                        )}
                        {filters.semester && (
                            <button onClick={() => onFilterChange('semester', '')} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                Sem {filters.semester} <span className="ml-1">×</span>
                            </button>
                        )}
                        {filters.year && (
                            <button onClick={() => onFilterChange('year', '')} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                {filters.year} <span className="ml-1">×</span>
                            </button>
                        )}
                        {filters.examType && (
                            <button onClick={() => onFilterChange('examType', '')} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                                {examTypes.find(t => t.value === filters.examType)?.label} <span className="ml-1">×</span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
