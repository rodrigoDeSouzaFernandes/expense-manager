import { client } from "./client";

import {
  type CreatePersonDTO,
  type Person,
  type PersonWithBalance,
  type PersonWithTransactions,
} from "@/features/people/types";

export const getAllPeople = async (): Promise<PersonWithBalance[]> => {
  const response = await client.get<PersonWithBalance[]>("/api/people");
  return response.data;
};

export const createPerson = async (
  person: CreatePersonDTO,
): Promise<Person> => {
  const response = await client.post<Person>("/api/people", person);
  return response.data;
};

export const deletePerson = async (id: string): Promise<void> => {
  await client.delete(`/api/people/${id}`);
};

export const getPersonById = async (
  id: string,
): Promise<PersonWithTransactions> => {
  const response = await client.get<PersonWithTransactions>(
    `/api/people/${id}`,
  );
  return response.data;
};
