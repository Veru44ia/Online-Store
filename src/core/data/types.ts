export interface IProduct {
  [key: string]: string | number | string[];
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProd extends IProduct {
  orderNumber: number;
  count: number;
}

export interface IRangeComponents {
  [key: string]: string | number;
  type: string;
  id: string;
  title: string;
  min: number;
  max: number;
  minValue: number;
  maxValue: number;
  symbol: string;
}

export const rangeContent: IRangeComponents[] = [
  {
    type: "price",
    id: "price-slider",
    title: "Price",
    min: 10.0,
    max: 1749.0,
    minValue: 10.0,
    maxValue: 1749.0,
    symbol: " USD",
  },
  {
    type: "stock",
    id: "stock-slider",
    title: "Stock",
    min: 1,
    max: 150,
    minValue: 1,
    maxValue: 150,
    symbol: "",
  },
];

export const enum ElementsId {
  cardsContainer = "cards-container",
  switchTwoElemBTN = "product-grid__2x2",
  switchThreeElemBTN = "product-grid__3x3",
  selectotElem = "select",
  categoryCheckbox = "category-filter",
  brandCheckbox = "brand-filter",
}

export const enum URLSearchKeys {
  switch = "big",
  selector = "sort",
  brand = "brand",
  category = "category",
  search = "search",
  price = "Price",
  stock = "Stock",
  remove = "remove",
}

export const enum SelectorParams {
  priceMin = "price-min",
  priceMax = "price-max",
  alphabetAZ = "alphabetA",
  alphabetZA = "alphabetZ",
}
