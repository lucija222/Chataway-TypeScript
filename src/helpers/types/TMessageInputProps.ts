import { IMessage } from "../interfaces/IMessage";

export type TMessageInputProps = {
    publishMessage: (messageObj: IMessage) => void
};