<main>
	<slot></slot>
</main>

<style>
	:global(body) {
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 0;
	}

	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: min(90vw, 800px);
		margin: 0 auto;
	}
</style>
