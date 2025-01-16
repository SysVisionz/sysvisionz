import navigation from './Navigation.svg';
import map from './Map.svg';
import mapPin from './Map_Pin.svg';
import houseRemove from './House_Remove.svg';
import houseClose from './House_Close.svg';
import houseCheck from './House_Check.svg';
import houseAdd from './House_Add.svg';
import house03 from './House_03.svg';
import house02 from './House_02.svg';
import house01 from './House_01.svg';
import globe from './Globe.svg';
import flag from './Flag.svg';
import compass from './Compass.svg';
import carAuto from './Car_Auto.svg';
import building04 from './Building_04.svg';
import building03 from './Building_03.svg';
import building02 from './Building_02.svg';
import building01 from './Building_01.svg';
const vals= {
building01,
building02,
building03,
building04,
carAuto,
compass,
flag,
globe,
house01,
house02,
house03,
houseAdd,
houseCheck,
houseClose,
houseRemove,
mapPin,
map,
navigation,
} as const

export default vals as SVGObject<typeof vals>