import { IClientData } from "../util/globalInterfaces/IClientData";
import "./chatHeader.scss";

interface IChatHeaderProps {
    members: Array<IClientData>
};

const ChatHeader = ({  members }: IChatHeaderProps): JSX.Element => {
    return (
        <div>
            <div className="chat__header">
                <h1 className="header__heading">
                    Chataway 
                </h1>
            </div>
            <div className="onlineMembers-container">
                <span>Online:</span>
                <ul className="onlineMembers">
                    {members.map((member) => (
                        <li className="onlineMembers__member" key={member.id}>
                            {member.clientData.color ? (
                                <span
                                    className="onlineMembers__color"
                                    style={{
                                        backgroundColor:
                                            member.clientData.color,
                                    }}
                                />
                            ) : (
                                <img
                                    className="onlineMembers__avatar"
                                    src={member.clientData.avatar}
                                    alt="User's avatar"
                                />
                            )}
                            <span className="onlineMembers__username">{member.clientData.username}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ChatHeader;
