import type { Meta } from './common';

export type Student = {
  id: string;
  name: string;
  nim: string;
  phoneNumber: string;
  email: string;
  majorId: string;
  createdAt: string;
  updatedAt: string;
};

export type StudentListResponse = {
  data: Student[];
  meta: Meta;
};
