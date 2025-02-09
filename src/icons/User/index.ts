import voice from './User_Voice.svg';
import users from './Users.svg';
import square from './User_Square.svg';
import usersGroup from './Users_Group.svg';
import remove from './User_Remove.svg';
import close from './User_Close.svg';
import circle from './User_Circle.svg';
import check from './User_Check.svg';
import cardID from './User_Card_ID.svg';
import add from './User_Add.svg';
import user03 from './User_03.svg';
import user02 from './User_02.svg';
import user01 from './User_01.svg';
const vals= {
1: user01,
2: user02,
3: user03,
add,
cardID,
check,
circle,
close,
remove,
usersGroup,
square,
users,
voice,
} as const

export default vals as SVGObject<typeof vals>
