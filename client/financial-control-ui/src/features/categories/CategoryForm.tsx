import { Controller } from "react-hook-form";
import {
  Divider,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useCategoryForm } from "./hooks/useCategoryForm";
import type { CategoryFormData } from "./types";

const CategoryForm = ({
  onSubmit,
  onCancel,
  isLoading,
}: {
  onSubmit: (data: CategoryFormData) => void;
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
            <FormControl fullWidth error={!!fieldState.error}>
              <InputLabel id="type-select-label">Tipo de Cateegoria</InputLabel>

              <Select
                {...field}
                label="Tipo de Categoria"
                labelId="type-select-label"
                inputMode="numeric"
              >
                <MenuItem value={1}>Receita</MenuItem>
                <MenuItem value={2}>Despesa</MenuItem>
                <MenuItem value={3}>Ambos</MenuItem>
              </Select>
              <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
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
            sx={{ width: 200 }}
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
