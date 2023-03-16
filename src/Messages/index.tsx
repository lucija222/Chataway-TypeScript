import { useEffect, useRef } from "react";
import { classNames } from "../util/helperFunctions";
import "./messages.scss";

const Messages = ({ messages, thisMember }) => {
    const scrollIntoView = useRef();
    let sameMember: string = "";

    useEffect(() => {
        scrollIntoView.current.scrollIntoView();
    }, [messages.length]);

    const renderMessage = (message) => {
        const { member, data, id } = message;
        const classNamesArray = [message, thisMember];

        const memberData = (
            <div
                className={classNames(
                    ...classNamesArray,
                    "classNameMemberData"
                )}
            >
                {member.clientData.color ? (
                    <span
                        className="msg-list__avatar--random"
                        style={{ backgroundColor: member.clientData.color }}
                    />
                ) : (
                    <img
                        className="msg-list__avatar"
                        src={member.clientData.avatar}
                        alt="user-avatar"
                    />
                )}

                <span className="msg-list__username">
                    {member.clientData.username}
                </span>
            </div>
        );

        const textContainer = (
            <div
                className={classNames(
                    ...classNamesArray,
                    "classNameTextContainer"
                )}
            >
                <div className="msg-list__text">{data}</div>
            </div>
        );

        const listItem =
            sameMember !== member.id ? (
                <li
                    className={classNames(...classNamesArray, "classNameMsg")}
                    data-id={member.id}
                    key={id}
                >
                    <div>
                        {memberData}
                        {textContainer}
                    </div>
                </li>
            ) : (
                <li
                    className={classNames(...classNamesArray, "classNameMsg")}
                    data-id={member.id}
                    key={id}
                >
                    {textContainer}
                </li>
            );

        sameMember = member ? member.id : "";

        return listItem;
    };
    return (
        <ul className="msg-list">
            {messages.map((m) => renderMessage(m))}
            <span ref={scrollIntoView} />
        </ul>
    );
};

export default Messages;
