import { RefObject, useEffect, useRef, useState } from "react";
import style from './scss/ExpandaBox.module.scss'
import { minPixDelta, classNamer } from "~/shared/FE";
import { useDelay } from "~/shared/FE";

const ExpandaBox: FCWC<{open: boolean, className: string, ref?: RefObject<HTMLDivElement>, orientation?: 'right' | 'left', min?: {width?: number, height?: number}}> = ({children, open, className, orientation = 'right', min, ref}) => {
	ref = useRef<HTMLDivElement>(ref);
	const [dimensions, setTheDimensions] = useState<{height: number, width: number}>({height: min?.height || 0, width: min?.width || 0})
	const setDimensions = useDelay(() => {
		if (ref.current){
			setTheDimensions({
				height: open ? ref.current.clientHeight: min?.height || 0,
				width: open ? ref.current.clientWidth: min?.width || 0,
			});
		}
	})
	const observer = useRef<ResizeObserver | null>(null);
	useEffect(() => {
		if (!observer.current){
			observer.current = new ResizeObserver((entries) => {
				const {height, width} = dimensions;
				if (open && minPixDelta([ref.current?.clientWidth!, width], [ref.current?.clientHeight!, height], 15)){
					setDimensions();
				}
			})
		}
		setDimensions();
		
		observer.current.observe(ref.current!);
		return () => {
			if (observer.current && ref.current){
				observer.current.unobserve(ref.current);
			}
		}
	}, [open, ref.current]);
	return (
	<div className={classNamer(style.container, orientation, className)} style={{...dimensions}}>
		<div className={style.content} ref={ref}>
			{children}
		</div>
	</div>
  );
}

export default ExpandaBox;