import { useEffect, useState, useRef } from "react";
import Emojis from "../Emojis";
import "./messageInput.scss";

const MessageInput = ({ publishMessage }) => {
    const placeholder = [
        "Enter your message...",
        "Please type something first!",
    ];
    const initInput = { text: "", placeholder: placeholder[0] };
    const [input, setInput] = useState(initInput);
    const [isEmojiPickerShowing, setIsEmojiPickerShowing] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => inputRef.current.focus(), [input]);

    const handleInputChange = (e) => {
        setInput({ ...input, text: e.target.value });
    };

    const publishInput = (e) => {
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

    const toggleEmojiPicker = (e) => {
        e.stopPropagation();
        setIsEmojiPickerShowing(!isEmojiPickerShowing);
    };

    const handleEmojiClick = (e) => {
        e.stopPropagation();
        if (e.target.classList.contains("emoji")) {
            setInput((prevInput) => ({
                ...prevInput,
                text: prevInput.text + e.target.innerText,
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