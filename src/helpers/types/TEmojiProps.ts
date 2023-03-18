import { MouseEventHandler } from "react";

export type TEmojiProps = {
    handleEmojiClick: MouseEventHandler<HTMLUListElement>,
    isEmojiPickerShowing: boolean 
};