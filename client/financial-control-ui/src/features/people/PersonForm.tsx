import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

// ✅ Schema de validação Zod
const personSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  age: z.number().min(0, "Idade inválida"),
});

type PersonFormData = z.infer<typeof personSchema>;

// Props do componente
type PersonFormProps = {
  onSubmit: (data: PersonFormData) => void;
  isLoading?: boolean;
};

export const PersonForm = ({ onSubmit, isLoading }: PersonFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
  });

  return (
    <Paper
      elevation={4}
      sx={{
        p: { xs: 3, sm: 5 },
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: { xs: "100%", sm: 400 },
        borderRadius: 3,
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#fff" : theme.palette.background.paper,
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" fontWeight={600} textAlign="center">
        Criar Pessoa
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <TextField
        label="Nome"
        placeholder="Digite o nome"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        size="medium"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      <TextField
        label="Idade"
        placeholder="Digite a idade"
        type="number"
        {...register("age", { valueAsNumber: true })}
        error={!!errors.age}
        helperText={errors.age?.message}
        fullWidth
        size="medium"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      {/* Botão */}
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          mt: 1,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: "none",
          background:
            "linear-gradient(90deg, rgba(63,81,181,1) 0%, rgba(92,107,192,1) 100%)",
          "&:hover": {
            background:
              "linear-gradient(90deg, rgba(57,73,171,1) 0%, rgba(81,98,179,1) 100%)",
          },
        }}
      >
        {isLoading ? "Criando..." : "Criar"}
      </Button>
    </Paper>
  );
};
