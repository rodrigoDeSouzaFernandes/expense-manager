export const formatDate = (date: string) => {
  try {
    return new Date(date).toLocaleDateString("pt-BR");
  } catch {
    return date;
  }
};
