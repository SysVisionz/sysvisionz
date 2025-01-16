import shareiOSExport from './Share_iOS_Export.svg';
import shareAndroid from './Share_Android.svg';
import phone from './Phone.svg';
import paperPlane from './Paper_Plane.svg';
import mail from './Mail.svg';
import mailOpen from './Mail_Open.svg';
import chat from './Chat.svg';
import chatRemove from './Chat_Remove.svg';
import chatDots from './Chat_Dots.svg';
import chatConversation from './Chat_Conversation.svg';
import chatConversationCircle from './Chat_Conversation_Circle.svg';
import chatClose from './Chat_Close.svg';
import chatCircle from './Chat_Circle.svg';
import chatCircleRemove from './Chat_Circle_Remove.svg';
import chatCircleDots from './Chat_Circle_Dots.svg';
import chatCircleClose from './Chat_Circle_Close.svg';
import chatCircleCheck from './Chat_Circle_Check.svg';
import chatCircleAdd from './Chat_Circle_Add.svg';
import chatCheck from './Chat_Check.svg';
import chatAdd from './Chat_Add.svg';
import bell from './Bell.svg';
import bellRing from './Bell_Ring.svg';
import bellRemove from './Bell_Remove.svg';
import bellOff from './Bell_Off.svg';
import bellNotification from './Bell_Notification.svg';
import bellClose from './Bell_Close.svg';
import bellAdd from './Bell_Add.svg';
const vals = {
bellAdd,
bellClose,
bellNotification,
bellOff,
bellRemove,
bellRing,
bell,
chatAdd,
chatCheck,
chatCircleAdd,
chatCircleCheck,
chatCircleClose,
chatCircleDots,
chatCircleRemove,
chatCircle,
chatClose,
chatConversationCircle,
chatConversation,
chatDots,
chatRemove,
chat,
mailOpen,
mail,
paperPlane,
phone,
shareAndroid,
shareiOSExport,
} as const

export default vals as SVGObject<typeof vals>

