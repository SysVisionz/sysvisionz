import moreVertical from './More_Vertical.svg';
import moreHorizontal from './More_Horizontal.svg';
import moreGridSmall from './More_Grid_Small.svg';
import moreGridBig from './More_Grid_Big.svg';
import duoMD from './Menu_Duo_MD.svg';
import duoLG from './Menu_Duo_LG.svg';
import alt05 from './Menu_Alt_05.svg';
import alt04 from './Menu_Alt_04.svg';
import alt03 from './Menu_Alt_03.svg';
import alt02 from './Menu_Alt_02.svg';
import alt01 from './Menu_Alt_01.svg';
import hamburgerMD from './Hamburger_MD.svg';
import hamburgerLG from './Hamburger_LG.svg';
import closeSM from './Close_SM.svg';
import closeMD from './Close_MD.svg';
import closeLG from './Close_LG.svg';
const vals= {
closeLG,
closeMD,
closeSM,
hamburgerLG,
hamburgerMD,
alt01,
alt02,
alt03,
alt04,
alt05,
duoLG,
duoMD,
moreGridBig,
moreGridSmall,
moreHorizontal,
moreVertical,
} as const

export default vals as SVGObject<typeof vals>
