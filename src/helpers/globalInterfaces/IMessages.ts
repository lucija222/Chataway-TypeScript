import { IClientData } from "./IClientData";

export interface IMessages {
    clientId: string,
    data: string,
    id: string,
    member: IClientData,
    timestamp: number
};