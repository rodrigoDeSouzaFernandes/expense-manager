import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllPeople,
  getPersonById,
  createPerson,
  deletePerson,
} from "@/api/people.service";
import type { CreatePersonDTO } from "./types";

export const usePeopleListQuery = () => {
  return useQuery({
    queryKey: ["people"],
    queryFn: getAllPeople,
  });
};

export const usePersonDetailsQuery = (personId: string) => {
  return useQuery({
    queryKey: ["people", personId],
    queryFn: () => getPersonById(personId),
  });
};

export const useCreatePersonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPerson: CreatePersonDTO) => createPerson(newPerson),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};

export const useDeletePersonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (personId: string) => deletePerson(personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};
