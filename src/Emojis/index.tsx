import { MouseEventHandler, useEffect, useState } from "react";
import { fetchData } from "../util/fetch";
import "./emojis.scss";

interface IEmojiProps {
    handleEmojiClick: MouseEventHandler<HTMLUListElement>,
    isEmojiPickerShowing: boolean 
};

interface IFilteredEmojiObject {
    name: string,
    emoji: string
};

interface IDataByCategory {
    slug: string,
    emojis: Array<IFilteredEmojiObject>
};

type TAllFilteredCategories = Array<IDataByCategory>;

interface IFetchedEmojiObject {
    emoji: string,
    skin_tone_support: boolean,
    name: string,
    slug: string,
    unicode_version: string,
    emoji_version: string
};
interface IEmojiCategory {
    name: string,
    slug: string,
    emojis: Array<IFetchedEmojiObject>
};

export type TFetchedEmojiData = Array<IEmojiCategory>;

const Emoji = ({ handleEmojiClick, isEmojiPickerShowing }: IEmojiProps): JSX.Element => {
    const [selectedCategory, setSelectedCategory] = useState<string>("smileys_emotion");
    const [emojiData, setEmojiData] = useState<TAllFilteredCategories>([]);

    if (!isEmojiPickerShowing && (selectedCategory !== "smileys_emotion")) {
        setSelectedCategory("smileys_emotion");
    };

    const filterAndSetEmojiData = (data: TFetchedEmojiData): void => {
        const allFilteredCategories: TAllFilteredCategories = [];

        for (const category of data) {
            const dataByCategory: IDataByCategory = { slug: category.slug, emojis: [] };

            for (const emojiObject of category.emojis) {
                const filteredEmojiObject: IFilteredEmojiObject = {
                    name: emojiObject.name,
                    emoji: emojiObject.emoji,
                };

                dataByCategory.emojis.push(filteredEmojiObject);
            }

            allFilteredCategories.push(dataByCategory);
        }

        setEmojiData([...allFilteredCategories]);
    };

    useEffect(() => {
        fetchData("./json/emojis.json", filterAndSetEmojiData);
    }, []);

    const displaySelectedEmojiCategory = (): JSX.Element[] => {
        const selectedCategoryData = [];
        for (const category of emojiData) {
            if (category.slug === selectedCategory) {
                selectedCategoryData.push(...category.emojis);
                break;
            }
        }

        return selectedCategoryData.map((emojiObject): JSX.Element => (
                <li key={emojiObject.name} className="emoji">
                    {emojiObject.emoji}
                </li>
        ));
    };

    const handleEmojiCategories: MouseEventHandler<HTMLUListElement> = (e): void => {
        e.stopPropagation();
        const target = e.target as HTMLUListElement;
        if (target.dataset.categorySlug) {
            const categorySlugDataset = target.dataset.categorySlug;
            setSelectedCategory(categorySlugDataset);
        }
    };

    return (
        <div className="emoji-container">
            <ul
                className="emoji-categories-list"
                onClick={handleEmojiCategories}
            >
                <li
                    className="emoji-category"
                    data-category-slug="smileys_emotion"
                >
                    <img
                        src="./emoji-bar-icons/smileys.svg"
                        alt="Smileys & Emotions"
                        data-category-slug="smileys_emotion"
                    />
                </li>
                <li 
                    className="emoji-category" 
                    data-category-slug="people_body"
                >
                    <img
                        src="./emoji-bar-icons/people.svg"
                        alt="People & Body"
                        data-category-slug="people_body"
                    />
                </li>
                <li
                    className="emoji-category"
                    data-category-slug="animals_nature"
                >
                    <img
                        src="./emoji-bar-icons/animals.svg"
                        alt="Animals & Nature"
                        data-category-slug="animals_nature"
                    />
                </li>
                <li 
                    className="emoji-category" 
                    data-category-slug="food_drink"
                >
                    <img
                        src="./emoji-bar-icons/food.svg"
                        alt="Food & Drink"
                        data-category-slug="food_drink"
                    />
                </li>
                <li
                    className="emoji-category"
                    data-category-slug="travel_places"
                >
                    <img
                        src="./emoji-bar-icons/travel.svg"
                        alt="Travel & Places"
                        data-category-slug="travel_places"
                    />
                </li>
                <li 
                    className="emoji-category" 
                    data-category-slug="activities"
                >
                    <img
                        src="./emoji-bar-icons/activities.svg"
                        alt="Activities"
                        data-category-slug="activities"
                    />
                </li>
                <li 
                    className="emoji-category" 
                    data-category-slug="objects"
                >
                    <img
                        src="./emoji-bar-icons/objects.svg"
                        alt="Objects"
                        data-category-slug="objects"
                    />
                </li>
                <li 
                    className="emoji-category" 
                    data-category-slug="symbols"
                >
                    <img
                        src="./emoji-bar-icons/symbols.svg"
                        alt="Symbols"
                        data-category-slug="symbols"
                    />
                </li>
            </ul>
            <ul
                className="emoji-list"
                id="emoji-list"
                onClick={handleEmojiClick}
            >
                {displaySelectedEmojiCategory()}
            </ul>
        </div>
    );
};

export default Emoji;