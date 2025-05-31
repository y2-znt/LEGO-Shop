import { Role } from "@prisma/client";
import { z } from "zod";

export const UpdateUserSchema = z.object({
  id: z.string().min(1),
  data: z.object({
    name: z.string().min(1).optional(),
    role: z.nativeEnum(Role).optional(),
  }),
});

export const DeleteUserSchema = z.object({
  id: z.string().min(1),
});

export type UpdateUserData = z.infer<typeof UpdateUserSchema>["data"];
export type DeleteUserParams = z.infer<typeof DeleteUserSchema>;
