import waterDrop from './Water_Drop.svg';
import sun from './Sun.svg';
import rainbow from './Rainbow.svg';
import puzzle from './Puzzle.svg';
import planet from './Planet.svg';
import moon from './Moon.svg';
import leaf from './Leaf.svg';
import firstAid from './First_Aid.svg';
import cupcake from './Cupcake.svg';
import cookie from './Cookie.svg';
import coffeToGo from './Coffe_To_Go.svg';
import coffee from './Coffee.svg';
import bulb from './Bulb.svg';
const vals = {
bulb,
coffee,
coffeToGo,
cookie,
cupcake,
firstAid,
leaf,
moon,
planet,
puzzle,
rainbow,
sun,
waterDrop,
} as const

export default vals as SVGObject<typeof vals>