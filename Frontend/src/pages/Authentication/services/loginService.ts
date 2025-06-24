import axios from "axios";

export async function postLogin(data: { email: string; password: string }) {
  const response = await axios.post('/createUser', data)
  return response.data
}