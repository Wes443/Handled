import GoogleSvg from "./assets/google-logo.svg?react";
import CalendarSvg from "./assets/calendar.svg?react";
import HomeSvg from "./assets/home.svg?react";
import MessageSvg from "./assets/message.svg?react";
import DownSvg from "./assets/down.svg?react";
import PlusSvg from "./assets/plus.svg?react";
import DangerSvg from "./assets/danger.svg?react";

export function GoogleLogo(props){
    return <GoogleSvg {...props} />
}

export function Calendar(props){
    return <CalendarSvg {...props} />
}

export function Home(props){
    return <HomeSvg {...props} />
}

export function Message(props){
    return <MessageSvg {...props} />
}

export function Down(props){
    return <DownSvg {...props} />
}

export function Plus(props){
    return <PlusSvg {...props} />
}

export function Danger(props){
    return <DangerSvg {...props} />
}
