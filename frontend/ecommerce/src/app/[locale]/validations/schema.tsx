import { z } from "zod";

export const registrationSchema = z
  .object({
    username: z.string({
      required_error: "Username is required.",
    }),
    first_name: z.string({
      required_error: "Firstname is required.",
    }),
    last_name: z.string({
      required_error: "Lastname is required.",
    }),
    email: z
      .string({
        required_error: "Email is required.",
      })
      .email("Invalid email format."),
    password: z.string({
      required_error: "Password is required.",
    }),
    confirm_password: z.string({
      required_error: "Confirm password is required.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match.",
    path: ["confirm_password"],
  });

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required.",
  }),
  password: z.string({
    required_error: "Password is required.",
  }),
});

export const shippingSchema = z.object({
  city: z.string({
    required_error: "City is required",
  }),
  country: z.string({
    required_error: "Country is required",
  }),
  state: z.string({
    required_error: "City is required",
  }),
  postal_code: z.string({
    required_error: "postal code is required",
  }),
});
