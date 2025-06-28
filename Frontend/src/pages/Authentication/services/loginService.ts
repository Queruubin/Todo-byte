import axios from "axios";

export async function postLogin(data: { email: string; password: string }) {
  const response = await axios.post('/createUser', data)
  return response.data
}

export async function postRegister(data: { email: string; password: string; nombre: string; confirmarPassword: string }) {
  console.log(data);
  
  const response = await axios.put('auth/register', data)
  return response.data
}