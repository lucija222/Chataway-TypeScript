import { TPropsFromLogin } from '../helpers/types/TPropsFromLogin';
import './avatars.scss';

const Avatars = ({ random, getAvatar, avatarAnimation, selectedAvatar }: TPropsFromLogin) => {
    const avatars: Array<string> = [];
    for (let i = 1; i <= 6; i++) {
        const path = `/avatars/avatar${i}.png`;
        avatars.push(path);
    }

    const renderAvatars = (avatar: string, index: number) => {
        const image_alt = `avatar${index + 1}`;
        return (
            <li
                className={
                    random
                        ? "avatar avatar__disabled"
                        : selectedAvatar === image_alt
                        ? "avatar avatar__selected"
                        : avatarAnimation
                        ? "avatar avatar__animation"
                        : "avatar"
                }
                key={index}
            >
                <img src={avatar} alt={image_alt} onClick={getAvatar} />
            </li>
        );
    };

    return (
        <ul className="login-form__avatar-list">
            {avatars.map((avatar, index) => renderAvatars(avatar, index))}
        </ul>
    );
}

export default Avatars;
