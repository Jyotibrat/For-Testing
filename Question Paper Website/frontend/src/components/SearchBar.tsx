'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { searchAPI } from '@/lib/api';

interface Suggestion {
    type: 'subject' | 'paper';
    value: string;
    id?: string;
}

interface SearchBarProps {
    className?: string;
    large?: boolean;
}

export default function SearchBar({ className = '', large = false }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                const data = await searchAPI.autocomplete(query);
                setSuggestions(data.data.suggestions);
                setIsOpen(true);
            } catch (error) {
                console.error('Autocomplete error:', error);
            }
        };

        const debounce = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounce);
    }, [query]);

    const handleSearch = (searchQuery?: string) => {
        const q = searchQuery || query;
        if (q.trim()) {
            router.push(`/papers?q=${encodeURIComponent(q.trim())}`);
            setIsOpen(false);
            setQuery('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                handleSearch(suggestions[selectedIndex].value);
            } else {
                handleSearch();
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className={`relative ${className}`}>
            <div className={`relative ${large ? 'max-w-2xl' : 'max-w-md'} mx-auto group`}>
                <div className={`absolute inset-0 bg-primary/20 rounded-xl blur-xl transition-opacity duration-300 ${isOpen || query ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>
                <div className="relative flex items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        placeholder="Search papers, subjects, or branches..."
                        className={`w-full ${large ? 'py-4 pl-12 pr-4 text-lg' : 'py-2.5 pl-10 pr-4'} bg-card/80 backdrop-blur-sm border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm`}
                    />
                    <svg
                        className={`absolute left-4 text-muted-foreground ${large ? 'w-6 h-6' : 'w-5 h-5'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>

                    {/* Command hint (visual only) */}
                    {!query && large && (
                        <div className="absolute right-4 hidden sm:flex items-center gap-1 pointer-events-none">
                            <span className="text-xs text-muted-foreground bg-secondary border border-border px-1.5 py-0.5 rounded">⌘ K</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Autocomplete dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className={`absolute ${large ? 'max-w-2xl' : 'max-w-md'} mx-auto left-0 right-0 mt-2 glass rounded-xl overflow-hidden border border-border shadow-2xl z-50 animate-fade-in`}>
                    <div className="p-1">
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={`${suggestion.type}-${suggestion.value}`}
                                onClick={() => handleSearch(suggestion.value)}
                                className={`w-full px-4 py-3 text-left flex items-center gap-3 rounded-lg transition-colors ${index === selectedIndex ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-foreground'
                                    }`}
                            >
                                {suggestion.type === 'subject' ? (
                                    <div className={`p-1.5 rounded-md ${index === selectedIndex ? 'bg-primary/20' : 'bg-secondary'}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                ) : (
                                    <div className={`p-1.5 rounded-md ${index === selectedIndex ? 'bg-primary/20' : 'bg-secondary'}`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                )}
                                <span className="font-medium">{suggestion.value}</span>
                                <span className="text-xs text-muted-foreground ml-auto capitalize">{suggestion.type}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
