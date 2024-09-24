import { splitText } from '$lib';
import type { Actions } from './$types';

export const actions: Actions = {
	split: async ({ request }) => {
		const form = await request.formData();
		const content = isString(form.get('content'));
		const maxTokens = asNumber(form.get('model'));

		const split = splitText(content, maxTokens).map((text) => ({ text, copied: false }));
		return { split, content, maxTokens };
	}
};

function isString(value: unknown): string {
	if (typeof value !== 'string') {
		throw new Error('Expected a string');
	}

	return value;
}

function asNumber(value: unknown): number {
	const number = Number(value);

	if (isNaN(number)) {
		throw new Error('Expected a number');
	}

	return number;
}
