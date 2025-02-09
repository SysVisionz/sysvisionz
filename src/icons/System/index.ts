import windowTerminal from './Window_Terminal.svg';
import window from './Window.svg';
import windowSidebar from './Window_Sidebar.svg';
import windowCodeBlock from './Window_Code_Block.svg';
import windowClose from './Window_Close.svg';
import windowCheck from './Window_Check.svg';
import wifiProblem from './Wifi_Problem.svg';
import wifiOff from './Wifi_Off.svg';
import wifiNone from './Wifi_None.svg';
import wifiMedium from './Wifi_Medium.svg';
import wifiLow from './Wifi_Low.svg';
import wifiHigh from './Wifi_High.svg';
import terminal from './Terminal.svg';
import tablet from './Tablet.svg';
import tabletButton from './Tablet_Button.svg';
import save from './Save.svg';
import qrCode from './Qr_Code.svg';
import printer from './Printer.svg';
import movingDesk from './Moving_Desk.svg';
import mouse from './Mouse.svg';
import monitor from './Monitor.svg';
import monitorPlay from './Monitor_Play.svg';
import mobile from './Mobile.svg';
import mobileButton from './Mobile_Button.svg';
import laptop from './Laptop.svg';
import keyboard from './Keyboard.svg';
import devices from './Devices.svg';
import desktopTower from './Desktop_Tower.svg';
import desktop from './Desktop.svg';
import data from './Data.svg';
import cylinder from './Cylinder.svg';
import code from './Code.svg';
import camera from './Camera.svg';
import barTop from './Bar_Top.svg';
import barRight from './Bar_Right.svg';
import barLeft from './Bar_Left.svg';
import barBottom from './Bar_Bottom.svg';
const vals= {
barBottom,
barLeft,
barRight,
barTop,
camera,
code,
cylinder,
data,
desktop,
desktopTower,
devices,
keyboard,
laptop,
mobileButton,
mobile,
monitorPlay,
monitor,
mouse,
movingDesk,
printer,
qrCode,
save,
tabletButton,
tablet,
terminal,
wifiHigh,
wifiLow,
wifiMedium,
wifiNone,
wifiOff,
wifiProblem,
windowCheck,
windowClose,
windowCodeBlock,
windowSidebar,
window,
windowTerminal,
} as const

export default vals as SVGObject<typeof vals>
