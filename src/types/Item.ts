import type { Meta } from './common';

export type Item = {
  id: string;
  name: string;
  imageUrl: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

export type ItemWithQuantity = Omit<Item, 'stock'> & {
  quantity: number;
};

export type ItemListResponse = {
  data: Item[];
  meta: Meta;
};
