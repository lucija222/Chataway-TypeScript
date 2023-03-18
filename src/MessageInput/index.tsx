import { useEffect, useState, useRef, ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react";
import Emojis from "../Emojis";
import { IInitInput } from "../helpers/interfaces/IInitInput";
import { TMessageInputProps } from "../helpers/types/TMessageInputProps";
import "./messageInput.scss";

const MessageInput = ({ publishMessage }: TMessageInputProps): JSX.Element => {
    const placeholder: Array<string> = [
        "Enter your message...",
        "Please type something first!"
    ];
    const initInput: IInitInput = { text: "", placeholder: placeholder[0] };
    const [input, setInput] = useState<IInitInput>(initInput);
    const [isEmojiPickerShowing, setIsEmojiPickerShowing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null!);

    useEffect(() => inputRef.current.focus(), [input]);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
        setInput({ ...input, text: e.target.value });
    };

    const publishInput: FormEventHandler<HTMLFormElement> = (e): void => {
        e.preventDefault();
        e.stopPropagation();
        if (input.text === "") {
            setInput({
                ...input,
                placeholder: placeholder[1],
            });
        } else {
            const message = input.text;
            publishMessage({
                message: message,
                room: "observable-room"
            });
            setInput({ text: "", placeholder: placeholder[0] });
        }
    };

    const toggleEmojiPicker: MouseEventHandler<HTMLButtonElement> = (e): void => {
        e.stopPropagation();
        setIsEmojiPickerShowing(!isEmojiPickerShowing);
    };

    const handleEmojiClick: MouseEventHandler<HTMLUListElement> = (e): void => {
        e.stopPropagation();
        const target = e.target as HTMLUListElement;
        if (target.classList.contains("emoji")) {
            setInput((prevInput) => ({
                ...prevInput,
                text: prevInput.text + target.innerText,
            }));
        }
    };

    return (
        <div className="chat__input">
            <div
                className={
                    isEmojiPickerShowing
                        ? "show-emojiPicker"
                        : "hide-emojiPicker"
                }
            >
                <Emojis handleEmojiClick={handleEmojiClick} isEmojiPickerShowing={isEmojiPickerShowing} />
            </div>
            <span className="span__relative-position">
                <button
                    type="button"
                    className="emoji-picker__button"
                    onClick={toggleEmojiPicker}
                >
                    {isEmojiPickerShowing ? (
                        <img src="./emoji-bar-icons/x.svg" alt="Emoji picker" />
                    ) : (
                        <img
                            src="./emoji-bar-icons/smileys.svg"
                            alt="Emoji picker"
                        />
                    )}
                </button>
            </span>
            <form className="msg-form" onSubmit={publishInput}>
                <input
                    className="msg-form__input"
                    type="text"
                    value={input.text}
                    placeholder={input.placeholder}
                    ref={inputRef}
                    onChange={handleInputChange}
                />
                <button className="msg-form__btn" type="submit">
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessageInput;