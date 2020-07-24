export const categoryNames = [
  'Laptops',
  'Phones',
  'Furniture',
  'Shoes',
  'Clothes',
  'Electronics',
  'Cars',
  'Appliances',
  'Boats',
  'Motocycles',
  'Toys',
  'Collectibles',
];

export const carouselCotent = [
  {
    heading: 'This is a customizable carousel',
    subHeading: 'it holds three seperate coponents ',
    callToAct: 'try it',
    callToActCat: categoryNames[Math.floor(Math.random() * 13)],
    category1: 'Phones',
    category2: 'Clothes',
    bigImage: null,
    color: 'green',
    color2: 'green2',
    color3: 'green3',
  },
  {
    heading: 'This is a the second layout of the carousel',
    subHeading: 'only two components in this layout ',
    callToAct: 'click me',
    callToActCat: categoryNames[Math.floor(Math.random() * 13)],
    category1: null,
    category2: null,
    bigImage: 'surf',
    color: 'yellow',
  },
  {
    heading: 'This desing was insiped by Ebay',
    subHeading: "I think it's beautifful",
    callToAct: 'random category ?',
    callToActCat: categoryNames[Math.floor(Math.random() * 13)],
    category1: 'Appliances',
    category2: 'Motocycles',
    bigImage: null,
    color: 'red',
    color2: 'red2',
    color3: 'red3',
  },
  {
    heading: 'Last slide',
    subHeading:
      'you can add more slides easily by adding more data to the prop the carousel receives. All components are reusable ',
    callToAct: 'click !!',
    callToActCat: categoryNames[Math.floor(Math.random() * 13)],
    category1: null,
    category2: null,
    bigImage: 'fur',
    color: 'blue',
  },
];

export default {
  categoryNames,
  carouselCotent,
};
