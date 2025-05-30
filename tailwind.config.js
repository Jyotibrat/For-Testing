/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			padding: {
				DEFAULT: '15px'
			}
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '960px',
			xl: '1200px'
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: '#131424',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: '#393A47',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					DEFAULT: '#F13024',
					foreground: 'hsl(var(--accent-foreground))'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			backgroundImage: {
				explosion: 'url("/bg-explosion.png")',
				circles: 'url("/bg-circles.png")',
				circleStar: 'url("/circle-star.svg")',
				site: 'url("/site-bg.svg")'
			},
			animation: {
				'spin-slow': 'spin 6s linear infinite'
			},
			fontFamily: {
				poppins: [
					'`var(--font-poppins)`',
					'sans-serif'
				],
				sora: [
					'`var(--font-sora)`',
					'sans-serif'
				]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	container: {
		padding: {
		DEFAULT: '15px',
		},
	},
	plugins: [require('tailwind-scrollbar'), require("tailwindcss-animate")],
};
