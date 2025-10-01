// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cleanObject = <T extends object >(object: T, test?: (val: any) => boolean) => Object.keys(object).reduce((newObj: Partial<T>, key: string) => {
		if (test ? test(object[key as keyof T]) : object[key as keyof T] !== undefined){
			newObj[key as keyof T] = object[key as keyof T]
		}
		return newObj
}, {})
