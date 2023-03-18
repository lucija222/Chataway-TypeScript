import { IFetchedEmojiObject } from "./IFetchedEmojiObject";

export interface IEmojiCategory {
    name: string,
    slug: string,
    emojis: Array<IFetchedEmojiObject>
};