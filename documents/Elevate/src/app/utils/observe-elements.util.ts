export type TOvserveElementOptions = {
	threshold?: number[];
	value?: string; // debug
};

// Observe element
export function observeElements(
	el: HTMLElement | HTMLElement[],
	onUpdate: (entry: IntersectionObserverEntry) => void,
	options?: TOvserveElementOptions,
): IntersectionObserver {
	const { threshold = buildThreshold(10), value } = options || {};
	const elms = Array.isArray(el) ? el : [el];

	let observer: IntersectionObserver | null = null;

	const callback: IntersectionObserverCallback = entries => {
		entries.forEach(entry => {
			onUpdate(entry);
			// DEBUG
			if (value && process.env.GATSBY_APP_DEBUG_MODE === 'true') {
				const element = entry.target as HTMLElement;
				const version = elms.length === 1 ? '' : element.dataset.oeIndex;
				console.log(`[OE: ratio] ${value}${version}:`, entry.intersectionRatio);
			}
		});
	};

	observer = new IntersectionObserver(callback, { threshold });
	elms.forEach((element, index) => {
		element.dataset.oeIndex = index.toString();
		observer?.observe(element);
	});

	return observer;
}

/**
 * Returns about of ratio
 * @example buildThreshold(10);
 * -> [0, 0.1, ... 0.9, 1]
 */
export function buildThreshold(num: number): number[] {
	return [...Array(num + 1).keys()].map(x => x / num);
}
