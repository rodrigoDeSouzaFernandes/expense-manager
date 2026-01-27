import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllPeople,
  getPersonById,
  createPerson,
  deletePerson,
} from "@/api/people.service";
import type { CreatePersonDTO } from "./types";

export const usePeopleList = () => {
  return useQuery({
    queryKey: ["people"],
    queryFn: getAllPeople,
  });
};

export const usePersonDetails = (personId: string) => {
  return useQuery({
    queryKey: ["people", personId],
    queryFn: () => getPersonById(personId),
  });
};

export const useCreatePerson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPerson: CreatePersonDTO) => createPerson(newPerson),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (personId: string) => deletePerson(personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
  });
};
