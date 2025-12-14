import type { Meta } from './common';

export type Item = {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type ItemListResponse = {
  data: Item[];
  meta: Meta;
};
