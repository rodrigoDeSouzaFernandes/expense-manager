import { client } from "./client";

import {
  type CreatePersonDTO,
  type Person,
  type PersonWithBalance,
  type PersonWithTransactions,
} from "@/features/people/types";

export const getAllPeople = async (): Promise<PersonWithBalance[]> => {
  const response = await client.get<PersonWithBalance[]>("/person");
  return response.data;
};

export const createPerson = async (
  person: CreatePersonDTO,
): Promise<Person> => {
  const response = await client.post<Person>("/person", person);
  return response.data;
};

export const deletePerson = async (id: string): Promise<void> => {
  await client.delete(`/person/${id}`);
};

export const getPersonById = async (
  id: string,
): Promise<PersonWithTransactions> => {
  const response = await client.get<PersonWithTransactions>(`/person/${id}`);
  return response.data;
};
