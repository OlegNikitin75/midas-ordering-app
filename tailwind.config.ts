import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				'app-blue': '#09234e',
				'app-gray': '#9ea2aa',
				'app-red': '#b70000',
				'app-yellow': ' #fbd13e'
			}
		}
	},
	plugins: []
}
export default config
