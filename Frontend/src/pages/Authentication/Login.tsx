import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "./services/loginService";
import { toast } from "sonner";

export function Login() {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const mutation = useMutation({ mutationFn: () => postLogin(formData),
    onSuccess: () => {
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Error al iniciar sesión");
    }
  })

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    mutation.mutate()
  }

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col bg-white rounded-lg shadow-md w-96 p-6 py-14">
        <h2 className="text-2xl font-bold text-center text-black">Login</h2>
        <form className="flex flex-col justify-center h-full gap-5">
          <section className="gap-3 flex flex-col">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                value={formData.email}
                onChange={handleFormDataChange}
                required
                name="email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                value={formData.password}
                onChange={handleFormDataChange}
                required
                name="password"
              />
            </div>
          </section>
          <Button type="submit" disabled={mutation.isPending} onClick={handleSubmit} >
            {mutation.isPending ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </main>
  );
}