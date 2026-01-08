import type { Meta } from './common';

export type Major = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type MajorListResponse = {
  data: Major[];
  meta: Meta;
};
