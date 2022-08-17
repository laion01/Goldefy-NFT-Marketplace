export class ProcessEnv {
    static API: string =  typeof process.env.NEXT_PUBLIC_API == "string" ? process.env.NEXT_PUBLIC_API : ""
}

export const MainMenu = [
    {
        text: "Goldy Generator", link: "#"
    },
    {
        text: "Marketplace", link: "#"   
    },
    {
        text: "Goldy Pass", link: "/pass"   
    },
    {
        text: "Goldy Pet", link: "/pets"   
    },
    {
        text: "Ticket", link: "#"
    },
    {
        text: "Convertion", link: "#"   
    }
];

export const ProfileMenu = [
    {
        text: "Wallet", link: ""
    },
    {
        text: "Inventory", link: "/inventory"   
    },
    {
        text: "Account Setting", link: ""
    },
    {
        text: "History", link: ""
    },
    {
        text: "Logout", link: ""
    }
];

export const PetTypes = [
    {
        id: 1,
        attr1: "attack", attr2: "feed", attr3: "havest", attr4: "develop",
        char: "pet1.png",
        name: "Bono",
        type: 0
    },
    {
        id: 2,
        attr1: "attack", attr2: "feed", attr3: "havest", attr4: "develop",
        char: "pet2.png",
        name: "Dink",
        type: 1   
    },
    {
        id: 3,
        attr1: "attack", attr2: "feed", attr3: "havest", attr4: "develop",
        char: "pet3.png",
        name: "Inu",
        type: 2
    },
    {
        id: 4,
        attr1: "attack", attr2: "feed", attr3: "havest", attr4: "develop",
        char: "pet4.png",
        name: "Alka",
        type: 3   
    },
    {
        id: 5,
        attr1: "attack", attr2: "feed", attr3: "havest", attr4: "develop",
        char: "pet5.png",
        name: "Dal",
        type: 4
    }
];


export const PassGoldy = [
  {
    id: 1,
    char: "gp2.png",
    name: "tori",
    stone: "oxil.png",
    stoneName:"OXIL",
    type: 0,
  },
  {
    id: 2,
    char: "gp4.png",
    name: "chika",
    stone: "Grani.png",
    stoneName:"GRANI",
    type: 1,
  },
  {
    id: 3,
    char: "gp3.png",
    name: "bell",
    stone: "Yak.png",
    stoneName:"YAK",
    type: 2,
  },
  {
    id: 4,
    char: "gp1.png",
    name: "baam",
    stone: "Lacto.png",
    stoneName:"LACTO",
    type: 3,
  },
  {
    id: 5,
    char: "gp11.png",
    name: "gaga",
    stone: "Deva.png",
    stoneName:"DEVA",
    type: 4,
  },
  {
    id: 6,
    char: "gp7.png",
    name: "pomi",
    stone: "oxil.png",
    stoneName:"OXIL",
    type: 0,
  },
  {
    id: 7,
    char: "gp5.png",
    name: "aku",
    stone: "Grani.png",
    stoneName:"GRANI",
    type: 1,
  },
  {
    id: 8,
    char: "gp8.png",
    name: "rocky",
    stone: "Yak.png",
    stoneName:"YAK",
    type: 2,
  },
  {
    id: 9,
    char: "gp6.png",
    name: "bori",
    stone: "Lacto.png",
    stoneName:"LACTO",
    type: 3,
  },
  {
    id: 10,
    char: "gp10.png",
    name: "goldy",
    stone: "Deva.png",
    stoneName:"DEVA",
    type: 4,
  },
   {
    id: 11,
    char: "gp9.png",
    name: "saya",
    stone: "oxil.png",
    stoneName:"OXIL",
    type: 3,
  },
  {
    id: 12,
    char: "gp12.png",
    name: "mato",
    stone: "Grani.png",
    stoneName:"GRANI",
    type: 4,
  }
];