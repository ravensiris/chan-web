import {defineConfig} from 'vite';
import preprocess from 'svelte-preprocess';
import routify from '@roxi/routify/vite-plugin';
import {svelte} from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		routify(),
		svelte({
			preprocess: preprocess()
		})
	]
});