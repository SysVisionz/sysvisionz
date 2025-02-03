import rocketImg from './rocket.png';
import buildImg from './buildingImage.png';
import gold from './largeLogo.svg';
import blue from './largeLogo-blue.svg';
import smGold from './minilogo.svg'
import smBlue from './minilogoOrigin.svg'
import bgWiresImg from './bgWires-mask.png';
import devImg from './dev.jpg'

export const logo = {large: {gold, blue}, small: {gold: smGold, blue: smBlue}} as {[S in 'large' | 'small']: {[C in 'gold' | 'blue']: Image}};
export const rocket = rocketImg as Image;
export const build = buildImg as Image;
export const bgWires = bgWiresImg as Image;
export const dev = devImg as Image;