<script lang="ts">
	import { enhance } from '$app/forms';

	const models = [
		{
			name: 'gpt-3.5-turbo',
			tokens: 4_096
		},
		{
			name: 'gpt-3.5-turbo-16k',
			tokens: 16_384
		},
		{
			name: 'gpt-4',
			tokens: 8_192
		},
		{
			name: 'gpt-4-32k',
			tokens: 32_768
		},
		{
			name: 'gpt-4-turbo',
			tokens: 128_000
		},
		{
			name: 'gpt-4o',
			tokens: 128_000
		},
		{
			name: 'Claude 2',
			tokens: 100_000
		},
		{
			name: 'Claude Instant 2',
			tokens: 100_000
		}
	];

	export let form;

	function copyToClipboard(id: number) {
		if (!form) {
			return;
		}

		const split = form.split[id];
		navigator.clipboard.writeText(split.text);
		split.copied = true;
		form = form;
	}

	async function scrollToBottom() {
		while (!form) {
			await new Promise((resolve) => setTimeout(resolve, 100));
		}

		window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
	}
</script>

<h1>Split Content</h1>
<form action="?/split" method="post" use:enhance on:submit={scrollToBottom}>
	<label for="model"> Select AI model </label>

	<select name="model" id="model" value={form?.maxTokens ?? 0} required>
		<option value="" disabled selected>Select model</option>
		{#each models as model}
			<option value={model.tokens}>{model.name}</option>
		{/each}
	</select>

	<textarea name="content" value={form?.content ?? ''} required placeholder="Content to split"
	></textarea>

	<button type="submit">Split</button>
</form>

{#if form}
	<h2>Results</h2>
	<section>
		{#each form.split as value, key}
			{@const copied = value.copied}
			<div>
				<button class="copy" on:click={() => copyToClipboard(key)} class:copied>Copy</button>
				<p class:short={copied}>{value.text}</p>
			</div>
		{/each}
	</section>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	label {
		margin-bottom: 0.5rem;
	}

	select {
		margin-bottom: 1rem;
		padding: 0.5rem;
		font-weight: bold;
		font-family: monospace;
		font-size: 1rem;
	}

	select,
	textarea {
		margin-bottom: 1rem;
	}

	textarea {
		height: 50svh;
		padding: 0.5rem;
	}

	button {
		border: 1px solid #000;
		background-color: #fff;
		padding: 0.5rem 1rem;
		cursor: pointer;
		align-self: flex-end;
		box-shadow: 5px 5px 0px rgb(0, 0, 0);
		transition: all 0.3s allow-distinct;
	}

	button:hover:not(.copied) {
		background-color: #f0f0f0;
		box-shadow: 1px 1px 0px rgb(0, 0, 0);
	}

	button.copy {
		box-shadow:
			1px 1px 0px rgb(0, 0, 0),
			0px 0px 5px 2px rgba(0, 0, 0, 0.151);
		position: sticky;
		top: 0px;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: min(90%, 800px);
		overflow: auto;
		max-height: calc(100dvh - 12rem);
		margin-bottom: 5rem;
		position: relative;
		padding: 1rem;
		border: 1px solid #000;
	}

	.copied {
		background-color: #00e60b;
	}

	p {
		max-width: 100%;
		transition: all 0.3s allow-distinct;
	}

	p.short {
		word-wrap: break-word;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
</style>
