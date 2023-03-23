import { TFetchedEmojiData } from "../Emojis";

type setStateFunc = (data: TFetchedEmojiData) => void;

export const fetchData = async (url: string, setStateFunc: setStateFunc) => {
    try {
        const response = await fetch(url);
    
        if(!response.ok) {
            throw new Error(`Fetch response not OK: ${response.status}`);
        }

        const data: TFetchedEmojiData = await response.json();
        setStateFunc(data);
    } catch(exception) {
        console.error(`Fetch exception: ${exception}`)
    }
};