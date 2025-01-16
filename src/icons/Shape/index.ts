import wavy from './Wavy.svg';
import triangle from './Triangle.svg';
import square from './Square.svg';
import shield from './Shield.svg';
import octagon from './Octagon.svg';
import circle from './Circle.svg';
const vals= {
circle,
octagon,
shield,
square,
triangle,
wavy,
}  as const

export default vals as SVGObject<typeof vals>
