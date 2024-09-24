import { encoding_for_model } from '@dqbd/tiktoken';

export function splitText(text: string, maxTokens: number): string[] {
	const encoder = encoding_for_model('gpt-3.5-turbo');
	let tokens = encoder.encode(text);

	if (tokens.length <= maxTokens) {
		return [text];
	}

	const result: Uint8Array[] = [];
	while (tokens.length > 0) {
		const allowed = Math.min(maxTokens, tokens.length);
		const slice = tokens.slice(0, allowed);
		result.push(encoder.decode(slice));
		tokens = tokens.slice(maxTokens);
	}

	encoder.free();
	const decoder = new TextDecoder();
	return result.map((words) => decoder.decode(words));
}
