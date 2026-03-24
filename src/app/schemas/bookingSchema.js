import { z } from "zod";

export const createBookingSchema = (timeSlots) =>
  z.object({
    bookerName: z
      .string()
      .min(2, "Мінімум 2 символи"),

    bookerEmail: z
      .string()
      .email("Невірний email")
      .optional()
      .or(z.literal("")),

    eventName: z
      .string()
      .min(2, "Мінімум 2 символи"),

    eventDate: z.coerce.date().refine(
      (date) => date > new Date(),
      "Дата має бути в майбутньому"
    ),

    numberOfGuests: z.coerce
      .number()
      .int("Має бути ціле число")
      .min(1, "Мінімум 1")
      .max(10, "Максимум 10"),

    timeSlot: z.enum(timeSlots, {
      errorMap: () => ({ message: "Оберіть валідний слот" }),
    }),

    eventLink: z
      .string()
      .url("Невірний URL"),
  });
