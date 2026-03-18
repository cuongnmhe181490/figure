export type BodyBaseId = "hero" | "elegant";
export type SizeId = "6cm" | "8cm" | "10cm" | "12cm";
export type OutfitThemeId =
  | "birthday"
  | "football"
  | "streetwear"
  | "vest"
  | "wedding"
  | "graduation";
export type AccessoryId =
  | "balloons"
  | "trophy"
  | "soccer-ball"
  | "coffee"
  | "camera"
  | "flowers"
  | "gift-box"
  | "laptop";
export type BaseStyleId = "classic" | "premium" | "story";

export type PreviewShape = "rounded" | "sharp";

export type BodyBase = {
  id: BodyBaseId;
  name: string;
  description: string;
  silhouette: PreviewShape;
  accent: string;
};

export type SizeOption = {
  id: SizeId;
  label: string;
  heightCm: number;
  priceFrom: number;
  productionTime: string;
};

export type OutfitTheme = {
  id: OutfitThemeId;
  name: string;
  description: string;
  palette: string[];
  accent: string;
};

export type Accessory = {
  id: AccessoryId;
  name: string;
  description: string;
  color: string;
  category: string;
};

export type BaseStyle = {
  id: BaseStyleId;
  name: string;
  description: string;
  color: string;
};

export type FigureConfig = {
  bodyBase: BodyBaseId;
  size: SizeId;
  outfitTheme: OutfitThemeId;
  outfitColor: string;
  accessories: AccessoryId[];
  baseStyle: BaseStyleId;
};
