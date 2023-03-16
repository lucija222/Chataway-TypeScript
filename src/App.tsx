import './App.css';
import { useEffect, useState } from "react";
import Login from "./Login";
import { CHANNEL_ID } from "./util/channel";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { IChatState } from './helpers/interfaces/IChatState';
import { IMembers } from './helpers/interfaces/IMembers';
import { IMessage } from './helpers/interfaces/IMessage';
import { IClientData } from './helpers/interfaces/IClientData';
import { IMessages } from './helpers/interfaces/IMessages';

const App = (): JSX.Element => {
    const initChatState: IChatState = {
        member: {
            username: "",
            color: "",
            avatar: "",
        },
        messages: [],
    };

    const [chat, setChat] = useState<IChatState>(initChatState);
    const [members, setMembers] = useState<IMembers>({ online: [] });
    const [drone, setDrone] = useState(null);

    useEffect(() => {
        if (chat.member.username !== "") {
            const drone = new window.Scaledrone(CHANNEL_ID, {
                data: chat.member
            });
            setDrone(drone);
        }
    }, [chat.member]);

    useEffect(() => {
        const droneEvent = (): void => {
            drone.on("open", (error) => {
                if (error) {
                    return console.error(error);
                }
                chat.member.id = drone.clientId;
                roomEvents();
            });
        };

        const roomEvents = (): void => {
            const room = drone.subscribe("observable-room");
            room.on("open", (error) => {
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

            room.on("member_leave", ({ id }: string) => { //How is it not string?
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

    const publishMessage = (messageObj: IMessage) => {
        drone.publish(messageObj);
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
                    <MessageInput sendMessage={publishMessage} />
                </div>
            )}
        </>
    );
};

export default App;
