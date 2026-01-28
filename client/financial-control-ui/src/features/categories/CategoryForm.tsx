import { Controller } from "react-hook-form";
import {
  Divider,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { useCategoryForm } from "./hooks/useCategoryForm";

const CategoryForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: {
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}) => {
  const { form } = useCategoryForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Divider />

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Nome"
              placeholder="Digite o nome"
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
            <Select
              {...field}
              label="Tipo"
              inputMode="numeric"
              fullWidth
              error={!!fieldState.error}
            >
              <MenuItem value={0}>Despesa</MenuItem>
              <MenuItem value={1}>Receita</MenuItem>
              <MenuItem value={2}>Ambos</MenuItem>
            </Select>
          )}
        />

        <Stack direction={"row"} spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            sx={{ width: 180 }}
          >
            {isLoading ? (
              <CircularProgress
                size={20}
                sx={{ color: "primary.contrastText" }}
              />
            ) : (
              "Cadastrar Categoria"
            )}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default CategoryForm;
