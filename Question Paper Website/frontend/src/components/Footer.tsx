import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const branches = [
        { name: 'CSE', href: '/papers?branch=CSE' },
        { name: 'ECE', href: '/papers?branch=ECE' },
        { name: 'MECH', href: '/papers?branch=MECH' },
        { name: 'CIVIL', href: '/papers?branch=CIVIL' },
        { name: 'EEE', href: '/papers?branch=EEE' },
        { name: 'IT', href: '/papers?branch=IT' },
    ];

    const semesters = Array.from({ length: 8 }, (_, i) => ({
        name: `Semester ${i + 1}`,
        href: `/papers?semester=${i + 1}`,
    }));

    return (
        <footer className="bg-[var(--card)] border-t border-[var(--border)] mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold">College Question Paper Hub</span>
                        </Link>
                        <p className="text-[var(--muted-foreground)] mb-4 max-w-md">
                            Your one-stop destination for previous year question papers. Access, search, and download papers for all branches and semesters.
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            <strong>Disclaimer:</strong> This is an unofficial student resource website.
                        </p>
                    </div>

                    {/* Branches */}
                    <div>
                        <h3 className="font-semibold mb-4">Browse by Branch</h3>
                        <ul className="space-y-2">
                            {branches.map((branch) => (
                                <li key={branch.name}>
                                    <Link
                                        href={branch.href}
                                        className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
                                    >
                                        {branch.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/papers" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">
                                    All Papers
                                </Link>
                            </li>
                            <li>
                                <Link href="/papers?popular=true" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">
                                    Popular Papers
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/login" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">
                                    Student Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/register" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                    <p className="text-sm text-[var(--muted-foreground)]">
                        © {currentYear} College Question Paper Hub. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </a>
                        <a href="#" className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
