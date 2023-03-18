import { IFilteredEmojiObject } from "./IFilteredEmojiObject";

export interface IDataByCategory {
    slug: string,
    emojis: Array<IFilteredEmojiObject>
};