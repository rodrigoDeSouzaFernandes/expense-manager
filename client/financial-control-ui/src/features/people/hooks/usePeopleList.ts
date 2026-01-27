import { usePeopleListQuery } from "../queries";

export const usePeopleList = () => {
  const { data: people, isLoading: isPeopleListLoading } = usePeopleListQuery();

  return { people, isPeopleListLoading };
};
