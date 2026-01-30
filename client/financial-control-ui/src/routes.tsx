import { Navigate, Route, Routes } from "react-router-dom";
import { HomeLayout } from "./layouts/Home";
import { PeopleList } from "./features/people/PeopleList";
import { CategoriesList } from "./features/categories/CategoriesList";
import { TransactionsList } from "./features/transactions/TransactionsList";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<Navigate to="/pessoas" replace />} />
        <Route path="pessoas" element={<PeopleList />} />
        <Route path="pessoas/:id" element={<PeopleList />} />
        <Route path="categorias" element={<CategoriesList />} />
        <Route path="transacoes" element={<TransactionsList />} />
      </Route>
    </Routes>
  );
};
