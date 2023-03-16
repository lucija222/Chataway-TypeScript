import { MouseEventHandler } from "react";

export type TPropsFromLogin = {
    random: boolean,
    getAvatar: MouseEventHandler<HTMLImageElement>, 
    avatarAnimation: boolean,
    selectedAvatar: string 
};