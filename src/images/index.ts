import rocketImg from './rocket.png';
import buildImg from './buildingImage.png';
import gold from './largeLogo.svg';
import blue from './largeLogo-blue.svg';
import smGold from './minilogo.svg'
import smBlue from './minilogoOrigin.svg'
import bgWiresImg from './bgWires-mask.png';
import devImg from './dev.jpg'
import siteImg from './online-statistics.jpg'
import nightsImg from './developer.jpg'
import hackImg from './hack.jpg'
import fsImg from './fs.jpg'
import feImg from './fe.jpg'
import beImg from './be.jpg'
import mentorImg from './mentor.jpg'
import consultImg from './consult.jpg'
import noWorriesImg from './no-worries.jpg'
import howWorkImg from './how-work.jpg'
import whatDoImg from './what-do.jpg'
import letsGoImg from './lets-go.jpg'

export const logo = {large: {gold, blue}, small: {gold: smGold, blue: smBlue}} as {[S in 'large' | 'small']: {[C in 'gold' | 'blue']: Image}};
export const rocket = rocketImg as Image;
export const build = buildImg as Image;
export const bgWires = bgWiresImg as Image;
export const dev = devImg as Image;
export const site = siteImg as Image;
export const nights = nightsImg as Image;
export const hack = hackImg as Image;
export const fs = fsImg as Image;
export const fe = feImg as Image;
export const be = beImg as Image;
export const mentor = mentorImg as Image;
export const consult = consultImg as Image;
export const noWorries = noWorriesImg as Image;
export const howWork = howWorkImg as Image;
export const whatDo = whatDoImg as Image;
export const letsGo = letsGoImg as Image;