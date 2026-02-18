import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: 'index.html' // enables client-side routing fallback
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/REPO_NAME' : ''
		}
	}
};

export default config;
