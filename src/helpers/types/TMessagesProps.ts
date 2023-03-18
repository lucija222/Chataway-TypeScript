import { IMember } from "../interfaces/IMember";
import { IMessages } from "../interfaces/IMessages";

export type TMessagesProps = {
    messages: Array<IMessages>,
    thisMember: IMember
};