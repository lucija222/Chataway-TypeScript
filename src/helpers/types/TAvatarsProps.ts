import { MouseEventHandler } from "react";

export type TAvatarsProps = {
    random: boolean,
    getAvatar: MouseEventHandler<HTMLImageElement>, 
    avatarAnimation: boolean,
    selectedAvatar: string 
};