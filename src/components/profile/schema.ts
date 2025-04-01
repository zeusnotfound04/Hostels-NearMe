import { z } from "zod";

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 50 characters.",
    }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  city: z.string().min(1, { message: "Please select a city" }),
  state: z.string().min(1, { message: "Please select a state" })})