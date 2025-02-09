import wavyWarning from './Wavy_Warning.svg';
import wavyHelp from './Wavy_Help.svg';
import wavyCheck from './Wavy_Check.svg';
import warning from './Warning.svg';
import triangleWarning from './Triangle_Warning.svg';
import triangleCheck from './Triangle_Check.svg';
import stopSign from './Stop_Sign.svg';
import squareWarning from './Square_Warning.svg';
import squareHelp from './Square_Help.svg';
import squareCheck from './Square_Check.svg';
import shieldWarning from './Shield_Warning.svg';
import shieldCheck from './Shield_Check.svg';
import octagonWarning from './Octagon_Warning.svg';
import octagonHelp from './Octagon_Help.svg';
import octagonCheck from './Octagon_Check.svg';
import info from './Info.svg';
import help from './Help.svg';
import circleWarning from './Circle_Warning.svg';
import circleHelp from './Circle_Help.svg';
import circleCheck from './Circle_Check.svg';
const vals= {
circleCheck,
circleHelp,
circleWarning,
help,
info,
octagonCheck,
octagonHelp,
octagonWarning,
shieldCheck,
shieldWarning,
squareCheck,
squareHelp,
squareWarning,
stopSign,
triangleCheck,
triangleWarning,
warning,
wavyCheck,
wavyHelp,
wavyWarning,
} as const

export default vals as SVGObject<typeof vals>
