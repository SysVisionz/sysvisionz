declare type SVGObject<T> = { [K in keyof T]: { 
	blurHeight: number
	blurWidth: number
	height: number
	src: string
	width: number
} }