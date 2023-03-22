import { IMember } from "./IMember";
import { IMessages } from "./IMessages";


export interface IChatState {
    member: IMember,
    messages: Array<IMessages>
};