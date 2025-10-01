export const classNamer = (...args: (string | undefined | false | null)[]) => args.filter(v => v).join(' ')
