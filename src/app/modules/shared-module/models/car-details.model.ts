import {BrandDetailsModel} from "./brand-details.model";

export class CarDetailsModel {
  constructor() {}
  public id!: string;
  name!: string;
  offers!: string;
  overview!: string;
  basePrice!: string;
  modelType!: string;
  manufacture!: BrandDetailsModel
  colorOptions!: ColorOption[];
}
export class ColorOption {
  colorGradient!: string;
  colorName!: string;
}
