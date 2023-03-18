import { Dispatch, SetStateAction } from "react";
import { IChatState } from "../interfaces/IChatState";

export type TLoginProps = {
    setChat: Dispatch<SetStateAction<IChatState>>
};