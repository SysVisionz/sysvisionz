export const minPixDelta = (...values: ([number | undefined, number] | number)[]) => {
	const range = values.find(v => typeof v === 'number') || 10
	values.every((v) => typeof v !== 'object' || typeof v[0] === 'undefined' ||  Math.abs(v[0] - v[1]) > range)
}