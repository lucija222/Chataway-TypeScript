import { useEffect, useRef } from "react";
import { IMember } from "../util/globalInterfaces/IMember";
import { IMessages } from "../util/globalInterfaces/IMessages";
import { classNames } from "../util/helperFunctions";
import "./messages.scss";

interface IMessagesProps {
    messages: Array<IMessages>,
    thisMember: IMember
};

const Messages = ({ messages, thisMember }: IMessagesProps): JSX.Element => {
    const scrollIntoView = useRef<HTMLSpanElement>(null!);
    let sameMember: string = "";

    useEffect(() => {
        scrollIntoView.current.scrollIntoView();
    }, [messages.length]);

    const renderMessage = (message: IMessages) => {
        const { member, data, id } = message;
        const classNamesArray: [IMessages, IMember] = [message, thisMember];

        const memberData: JSX.Element = (
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

        const textContainer: JSX.Element = (
            <div
                className={classNames(
                    ...classNamesArray,
                    "classNameTextContainer"
                )}
            >
                <div className="msg-list__text">{data}</div>
            </div>
        );

        const listItem: JSX.Element =
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
