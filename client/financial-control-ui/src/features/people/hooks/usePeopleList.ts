import { useState } from "react";
import { usePeopleListQuery } from "../queries";

export const usePeopleList = () => {
  const [createPersonDialogOpen, setCreatePersonDialogOpen] =
    useState<boolean>(false);

  const { data: people, isLoading: isPeopleListLoading } = usePeopleListQuery();

  return { people, isPeopleListLoading, createPersonDialogOpen, setCreatePersonDialogOpen };
};
