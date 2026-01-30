import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllPeople,
  getPersonById,
  createPerson,
  deletePerson,
} from "@/api/people.service";
import type { CreatePersonDTO, Person, PersonWithBalance, PersonWithTransactions } from "./types";
import type { AxiosError } from "axios";

export const usePeopleListQuery = () => {
  return useQuery<PersonWithBalance[]>({
    queryKey: ["people"],
    queryFn: getAllPeople,
  });
};

export const usePersonDetailsQuery = (personId?: string) => {
  return useQuery<PersonWithTransactions>({
    queryKey: ["people", personId],
    queryFn: () => getPersonById(personId as string),
    enabled: !!personId
  });
};

export const useCreatePersonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Person, AxiosError, CreatePersonDTO>({
    mutationFn: createPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};

export const useDeletePersonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};
