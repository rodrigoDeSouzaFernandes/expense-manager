import { Controller } from "react-hook-form";
import {
  Divider,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Select,
  MenuItem,
  Alert,
  AlertTitle,
  Typography,
} from "@mui/material";
import type {
  Transaction,
  TransactionFormProps,
  TransactionType,
} from "./types";
import { useTransactionForm } from "./hooks/useTransactionForm";
import TableSkeleton from "@/components/TableSkeleton";
import { formatCurrencyFromInput } from "@/utils/currency";
import { useEffect } from "react";
import { validateTransactionType } from "./helpers/validateTransactionType";

const TransactionForm = ({
  onSubmit,
  onCancel,
  isCreationLoading,
}: TransactionFormProps) => {
  const { form, people, categories, isLoading, peopleMap, categoryMap } =
    useTransactionForm();

  if (!isLoading && (!people || !categories)) {
    return (
      <Alert severity="error">
        <AlertTitle>Erro</AlertTitle>
        Houve um problema ao carregar dados para o formulário.
      </Alert>
    );
  }

  if (isLoading) {
    return <TableSkeleton rows={5} columns={1} />;
  }

  const categoryId = form.watch("categoryId");
  const transactionType = form.watch("type");

  const validateTransactionTypeCompatibility = () => {
    const isValid = validateTransactionType(
      categories,
      categoryId,
      Number(transactionType) as TransactionType,
    );

    if (!isValid) {
      form.setError("type", {
        message:
          "O tipo de transação não é compatível com a categoria selecionada.",
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        validateTransactionTypeCompatibility();
        form.handleSubmit(onSubmit);
      }}
    >
      <Stack spacing={2}>
        <Divider />

        <Controller
          name="personId"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Select
                {...field}
                fullWidth
                error={!!fieldState.error}
                displayEmpty
                renderValue={(value) =>
                  value === "" ? "Selecione uma pessoa" : peopleMap.get(value)
                }
              >
                {people?.map((person) => (
                  <MenuItem key={person.id} value={person.id}>
                    {person.name}
                  </MenuItem>
                ))}
              </Select>
              <Typography
                variant="caption"
                color="error"
                style={{ marginTop: 3, marginInline: 14 }}
              >
                {fieldState.error?.message}
              </Typography>
            </>
          )}
        />

        <Controller
          name="categoryId"
          control={form.control}
          render={({ field, fieldState }) => (
            <>
              <Select
                {...field}
                fullWidth
                error={!!fieldState.error}
                displayEmpty
                renderValue={(value) =>
                  value === ""
                    ? "Selecione uma categoria"
                    : categoryMap.get(value)
                }
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              <Typography
                variant="caption"
                color="error"
                style={{ marginTop: 3, marginInline: 14 }}
              >
                {fieldState.error?.message}
              </Typography>
            </>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Descrição"
              placeholder="Digite a descrição da transação"
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="type"
          control={form.control}
          render={({ field, fieldState }) => (
            <Select {...field} fullWidth error={!!fieldState.error}>
              <MenuItem value="1">Receita</MenuItem>
              <MenuItem value="2">Despesa</MenuItem>
            </Select>
          )}
        />

        <Controller
          name="amount"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Valor"
              placeholder="R$ 00,00"
              inputProps={{ maxLength: 15 }}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              onBeforeInput={(e) => {
                const char = e.data;
                const pattern = /[0-9]/;
                if (char && !pattern.test(char)) {
                  e.preventDefault();
                }
                return;
              }}
              onChange={(e) => {
                field.onChange(formatCurrencyFromInput(e.target.value));
              }}
            />
          )}
        />

        <Stack direction={"row"} spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isCreationLoading}
            sx={{ width: 180 }}
          >
            {isCreationLoading ? (
              <CircularProgress
                size={20}
                sx={{ color: "primary.contrastText" }}
              />
            ) : (
              "Cadastrar Pessoa"
            )}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default TransactionForm;
