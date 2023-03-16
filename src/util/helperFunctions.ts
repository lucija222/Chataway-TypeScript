export const classNames = (message, thisMember, whichClass) => {
    const { member } = message;

    const thisMemberMessage =
        member.id === thisMember.id ||
        message.from_me 

    let classNameMessage = thisMemberMessage
        ? "msg-list__msg msg-list__msg--thisMember"
        : "msg-list__msg";

    const classNameMemberData = thisMemberMessage 
    ? "msg-list__member-data msg-list__member-data--thisMember"
    : "msg-list__member-data";

    const classNameTextContainer = thisMemberMessage 
    ? "msg-list__text-container msg-list__text-container--thisMember"
    : "msg-list__text-container";

    switch (whichClass) {
        case "classNameMessage":
          return classNameMessage;
        case "classNameMemberData":
          return classNameMemberData;
        case "classNameTextContainer":
          return classNameTextContainer;
        default:
          return undefined;
      }
};

export const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
};

export const generateRandomName = () => {
    const adjectives = [
        "Autumn",
        "Hidden",
        "Bitter",
        "Misty",
        "Silent",
        "Empty",
        "Dry",
        "Dark",
        "Summer",
        "Icy",
        "Delicate",
        "Quiet",
        "White",
        "Cool",
        "Spring",
        "Winter",
        "Patient",
        "Twilight",
        "Dawn",
        "Crimson",
        "Wispy",
        "Weathered",
        "Blue",
        "Billowing",
        "Broken",
        "Cold",
        "Damp",
        "Falling",
        "Frosty",
        "Green",
        "Long",
        "Late",
        "Lingering",
        "Bold",
        "Little",
        "Morning",
        "Muddy",
        "Old",
        "Red",
        "Rough",
        "Still",
        "Small",
        "Sparkling",
        "Throbbing",
        "Shy",
        "Wandering",
        "Withered",
        "Wild",
        "Black",
        "Young",
        "Holy",
        "Solitary",
        "Fragrant",
        "Aged",
        "Snowy",
        "Proud",
        "Floral",
        "Restless",
        "Divine",
        "Polished",
        "Ancient",
        "Purple",
        "Lively",
        "Nameless",
    ];
    const nouns = [
        "waterfall",
        "river",
        "breeze",
        "moon",
        "rain",
        "wind",
        "sea",
        "morning",
        "snow",
        "lake",
        "sunset",
        "pine",
        "shadow",
        "leaf",
        "dawn",
        "glitter",
        "forest",
        "hill",
        "cloud",
        "meadow",
        "sun",
        "glade",
        "bird",
        "brook",
        "butterfly",
        "bush",
        "dew",
        "dust",
        "field",
        "fire",
        "flower",
        "firefly",
        "feather",
        "grass",
        "haze",
        "mountain",
        "night",
        "pond",
        "darkness",
        "snowflake",
        "silence",
        "sound",
        "sky",
        "shape",
        "surf",
        "thunder",
        "violet",
        "water",
        "wildflower",
        "wave",
        "water",
        "resonance",
        "sun",
        "wood",
        "dream",
        "cherry",
        "tree",
        "fog",
        "frost",
        "voice",
        "paper",
        "frog",
        "smoke",
        "star",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
};
