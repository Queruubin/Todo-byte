import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "./services/loginService";
import { toast } from "sonner";
import useAuth, { appSaveUser } from "@/store/userStore";

interface LoginFormData {
  email: string;
  password: string;
}

export function Login() {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  useEffect(() => {
      if (user?.id && isAuth) {
        navigate("/tasks");
        return;
      }
  }, [user, isAuth])

  
  const mutation = useMutation({ mutationFn: (data: LoginFormData) => postLogin(data),
    onSuccess: (response) => {
      console.log(response);
      
      appSaveUser(response.usuario);
      navigate("/tasks");
    },
    onError: () => {
      toast.error("Error al iniciar sesión");
    }
  })


  const handleSubmit = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    mutation.mutate(formData)
  }

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col bg-white rounded-lg shadow-md w-96 p-6 py-14">
          <h2 className="text-2xl font-bold text-center text-black">Login</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex flex-col justify-center h-full gap-5">
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
            <Button type="submit" className="cursor-pointer" disabled={mutation.isPending} >
              {mutation.isPending ? "Cargando..." : "Iniciar sesión"}
            </Button>
            <Button variant="secondary" className="cursor-pointer" disabled={mutation.isPending}
              onClick={() => navigate('/register')} >
              Crear cuenta
            </Button>
          </form>
        </div>
      </main>
    </Suspense>
  );
}