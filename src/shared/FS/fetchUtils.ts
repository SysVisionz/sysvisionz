export const makeHeaders = (headers: {[key: string]: string|number|boolean}) => new Headers(Object.keys(headers).map(v => [v, String(headers[v])] as [string, string]))

export const queryString = {
	make: (values: {[key: string]: (string | string[])}) => Object.entries(values).reduce((str: string, [key, val]) => {
		key = encodeURIComponent(key)
		if (Array.isArray(val)){
			val = val.filter(v => v.length)
		}
		if (!val.length){
			return str;
		}
		str += `&${key}=`
		if (Array.isArray(val)){
			val = val.filter(v => v.length)
			val = val.map(v => encodeURIComponent(v))
			str += val.join(`&${key}=`)
			return str;
		}
		return str + val
	}, ''),
	process: (str: string) => {
		const vals = str.split('&')
		return vals.reduce((object: {[key: string]: string | string[]}, value: string) => {
			const [key, val] = value.split('=').map(v => decodeURIComponent(v))
			if (object[key]){
				if (Array.isArray(object[key])){
					object[key].push(val)
				}
				else {
					object[key] = [object[key], val]
				}
				return object
			}
			object[key] = val;
			return object;
		}, {})
	}
}