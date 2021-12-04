// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import preprocess from 'svelte-preprocess';

// const imports = import.meta.glob('./src/lib/content/*.md');

//console.log('imports', imports);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess(), mdsvex(mdsvexConfig)],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
		// prerender: {
		// 	crawl: true,
		// 	enabled: true,
		// 	onError: 'continue',

		// 	entries: ['*', '/blog/2017/01/08/run-remote-commands-over-ssh']
		// }
	}
};

export default config;
