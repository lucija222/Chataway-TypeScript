import { TAvatarsProps } from '../helpers/types/TAvatarsProps';
import './avatars.scss';

const Avatars = ({ random, getAvatar, avatarAnimation, selectedAvatar }: TAvatarsProps): JSX.Element => {
    const avatars: Array<string> = [];
    for (let i = 1; i <= 6; i++) {
        const path: string = `/avatars/avatar${i}.png`;
        avatars.push(path);
    }

    const renderAvatars = (avatar: string, index: number): JSX.Element => {
        const image_alt: string = `avatar${index + 1}`;
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
