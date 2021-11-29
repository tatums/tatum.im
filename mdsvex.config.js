//import { join } from 'path';
//const path_to_layout = join(__dirname, './src/routes/__post.svelte');

const config = {
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [],
	rehypePlugins: [],
	layout: {
		post: 'src/__post_layout.svelte'
		//_: 'src/fallback_layout.svelte'
	}
};

export default config;
