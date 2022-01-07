import { resolve } from 'path';
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		target: '#sveldom',

		ssr: false,

		vite: {
			resolve: {
				alias: {
					sveldom: resolve('src/lib')
				}
			}
		}
	}
};

export default config;
