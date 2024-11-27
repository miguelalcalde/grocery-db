<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();
</script>

<div class="app">
	<Navigation />

	<main>
		{@render children()}
	</main>

	<footer class="bg-gray-100">
		<p class="text-center py-4 text-gray-600">
			© 2024 GroceryDB. All rights reserved.
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		width: 100%;
		box-sizing: border-box;
	}
</style>
