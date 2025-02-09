declare type SVGItem = { 
	blurHeight: number
	blurWidth: number
	height: number
	src: string
	width: number
}
declare type SVGObject<T> = { [K in keyof T]:  SVGItem}