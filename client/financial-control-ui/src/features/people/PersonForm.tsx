import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Divider,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";

const personSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  age: z.number().min(1, "Idade inválida").max(150, "Idade inválida"),
});

export type PersonFormData = z.infer<typeof personSchema>;

type PersonFormProps = {
  onSubmit: (data: PersonFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
};

const PersonForm = ({ onSubmit, onCancel, isLoading }: PersonFormProps) => {
  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    defaultValues: { name: "", age: 0 },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

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
          name="age"
          control={form.control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Idade"
              placeholder="Digite a idade"
              inputMode="numeric"
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
              onChange={(event) => {
                field.onChange(Number(event.target.value));
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
            disabled={isLoading}
            sx={{ width: 180 }}
          >
            {isLoading ? (
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

export default PersonForm;
