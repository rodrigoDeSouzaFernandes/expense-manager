import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllPeople,
  getPersonById,
  createPerson,
  deletePerson,
} from "@/api/people.service";

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
