import './App.css';
import { useEffect, useState } from "react";
import Login from "./Login";
import { CHANNEL_ID } from "./util/channel";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { IChatState } from './util/globalInterfaces/IChatState';
import { IMessage } from './util/globalInterfaces/IMessage';
import { IClientData } from './util/globalInterfaces/IClientData';
import { IMessages } from './util/globalInterfaces/IMessages';
import { IMember } from './util/globalInterfaces/IMember';

interface IMembers {
    online: Array<IClientData>
};

interface IMemberLeave {
    id: string
}

interface IScaledroneOptions {
    data?: IMember,
    url?: string,
    autoRecconect?: boolean,
    reconnectInterval?: number
};

interface Room {
    on<Event extends keyof RoomEvents>(event: Event, callback: (data: RoomEvents[Event]) => void): void;
};

interface RoomEvents {
    open: any,
    message: any;
    members: Array<IClientData>;
    member_join: IClientData;
    member_leave: IMemberLeave;
}

declare class Scaledrone {
    constructor(channelId: string, options?: IScaledroneOptions);
    subscribe(roomName: string): Room;
    publish(options: IMessage): void;
    on(event: "open", callback: (error: any) => void): void;
    clientId: string
};

declare global {
    interface Window {
        Scaledrone: typeof Scaledrone;
    }
};

const App = (): JSX.Element => {
    const initChatState: IChatState = {
        member: {
            username: "",
            color: "",
            avatar: "",
            id: ""
        },
        messages: [],
    };

    const [chat, setChat] = useState<IChatState>(initChatState);
    const [members, setMembers] = useState<IMembers>({ online: [] });
    const [drone, setDrone] = useState<Scaledrone | {}>({});

    useEffect(() => {
        if (chat.member.username !== "") {
            const drone = new window.Scaledrone(CHANNEL_ID, {
                data: chat.member
            });
            setDrone(drone);
        }
    }, [chat.member]);

    useEffect(() => {
        const droneScaledrone = drone as Scaledrone;

        const droneEvent = (): void => {
            droneScaledrone.on("open", (error: any) => {
                if (error) {
                    return console.error(error);
                }
                chat.member.id = droneScaledrone.clientId;
                roomEvents();
            });
        };

        const roomEvents = (): void => {
            const room = droneScaledrone.subscribe("observable-room");
            room.on("open", (error: any) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Connected to the room");
                }
            });
            room.on("members", (m: Array<IClientData>) => {
                setMembers({ online: m });
            });

            room.on("member_join", (newMember: IClientData) => {
                setMembers((prevMembers) => ({
                    ...prevMembers,
                    online: [...prevMembers.online, newMember],
                }));
            });

            room.on("member_leave", ({ id }: IMemberLeave ) => { 
                setMembers((prevMembers) => { 
                    const index: number = prevMembers.online.findIndex(
                      (member) => member.id === id
                    );
                    return {
                      ...prevMembers,
                      online: [
                        ...prevMembers.online.slice(0, index),
                        ...prevMembers.online.slice(index + 1)
                      ]
                    }; 
                  });
            });

            room.on("message", (message: IMessages) => {
                setChat((prevChat) => ({
                    ...prevChat,
                    messages: [...prevChat.messages, message],
                }));
            });
        };

        if (drone && !chat.member.id) {
            droneEvent();
        }
    }, [chat, drone, members]);

    const publishMessage = (messageObj: IMessage): void => {
        const droneScaledrone = drone as Scaledrone;
        droneScaledrone.publish(messageObj);
    };

    return (
        <>
            {!chat.member.username ? (
                <div>
                    <Login setChat={setChat} /> 
                </div>
            ) : (
                <div className="chat">
                    <ChatHeader members={members.online} />
                    <Messages
                        messages={chat.messages}
                        thisMember={chat.member}
                    />
                    <MessageInput publishMessage={publishMessage} />
                </div>
            )}
        </>
    );
};

export default App;
