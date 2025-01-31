import style from './scss/Section.module.scss'

const Section: FCWC<{color: `#${string}`}> = ({ children, color }) => {
	return (
	<section className={style.container} style={{backgroundColor: color}}>
	  {children}
	</section>
  );
}