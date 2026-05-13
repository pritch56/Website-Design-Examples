export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
  tag?: "new" | "vegan" | "gf" | "popular";
};

export type MenuCategory = {
  id: "breakfast" | "lunch" | "coffee" | "pastries";
  label: string;
  description: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "coffee",
    label: "Specialty Coffee",
    description: "Single-origin, hand-pulled. Roasted weekly by our friends at Crankhouse, Exeter.",
    items: [
      {
        id: "flat-white",
        name: "Flat White",
        description: "Double ristretto, velvet-textured milk. Our signature pour.",
        price: "£3.70",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80",
        tag: "popular",
      },
      {
        id: "filter",
        name: "Filter, single origin",
        description: "Hand-poured V60. Today: Ethiopia, Worka Sakaro.",
        price: "£3.90",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80",
      },
      {
        id: "cortado",
        name: "Cortado",
        description: "Tight ristretto + warm milk in equal parts. Tiny, mighty.",
        price: "£3.40",
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&q=80",
      },
      {
        id: "cold-brew",
        name: "Cold Brew",
        description: "18-hour steep, served black over ice. Smooth, low-acid.",
        price: "£4.20",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=80",
      },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast",
    description: "Served 8 – 11:30. Eggs your way, our sourdough, brown butter everything.",
    items: [
      {
        id: "eggs-soldiers",
        name: "Soft-scramble & soldiers",
        description: "Three eggs, brown butter, chives, on our seeded sourdough.",
        price: "£9.50",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=900&q=80",
        tag: "popular",
      },
      {
        id: "shakshuka",
        name: "Shakshuka",
        description: "Tomato, peppers, cumin, baked eggs, feta, herby oil, flatbread.",
        price: "£12",
        image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=900&q=80",
      },
      {
        id: "granola",
        name: "House granola",
        description: "Maple-toasted oats, almonds, yoghurt, seasonal compote.",
        price: "£8.50",
        image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=900&q=80",
        tag: "vegan",
      },
    ],
  },
  {
    id: "lunch",
    label: "Lunch",
    description: "From midday. Small, restless menu — changes when the weather changes.",
    items: [
      {
        id: "croque",
        name: "Croque monsieur",
        description: "Sourdough, gruyère, béchamel, ham hock, dijon. The classic.",
        price: "£13",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=900&q=80",
      },
      {
        id: "salad",
        name: "Lentil & goat cheese salad",
        description: "Puy lentils, soft goat, walnuts, sherry vinaigrette.",
        price: "£12",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80",
        tag: "gf",
      },
      {
        id: "soup",
        name: "Soup of the day",
        description: "Whatever Anouk is making. Always comes with bread.",
        price: "£8",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80",
      },
    ],
  },
  {
    id: "pastries",
    label: "Pastries",
    description: "Baked at 5am, gone by 2pm. Laminated by hand. Worth the early start.",
    items: [
      {
        id: "cardamom",
        name: "Cardamom bun",
        description: "Laminated, twisted, syrup-glossed. The Stockholm classic.",
        price: "£3.80",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80",
        tag: "popular",
      },
      {
        id: "croissant",
        name: "Butter croissant",
        description: "72-hour ferment, T55 flour, beurre d'Isigny. Shatters.",
        price: "£3.40",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=80",
      },
      {
        id: "tart",
        name: "Today's tart",
        description: "Whatever fruit is best at the market. Always good.",
        price: "£4.50",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&q=80",
      },
    ],
  },
];

/** Convenience: 4 items for the home page "featured" strip. */
export const featuredItems: MenuItem[] = [
  menu[0].items[0], // flat white
  menu[3].items[0], // cardamom bun
  menu[1].items[1], // shakshuka
  menu[2].items[0], // croque
];
