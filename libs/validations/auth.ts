import * as z from "zod";

const isNullOrUndefined = function (value: string) {
  return value === null || value === undefined;
};

export const userAuthSchema = z.object({
  username: z.string().min(1, "Username is a required field"),
  password: z.string().min(1, "Password is a required field"),
});

export const userSignUpSchema = z.object({
  username: z.string().min(1, "Username is a required field"),
  password: z
    .string()
    .min(1, "Password is a required field")
    .min(8, "Password must be at least 8 characters")
    .max(250)
    .superRefine((val, ctx) => {
      if (isNullOrUndefined(val) || (val.match(/[a-z]/g) || []).length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Password must contain at least 1 lowercase letter",
        });
      }

      if (isNullOrUndefined(val) || (val.match(/[A-Z]/g) || []).length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Password must contain at least 1 uppercase letter",
        });
      }

      if (isNullOrUndefined(val) || (val.match(/[0-9]/g) || []).length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Password must contain at least 1 number",
        });
      }

      if (isNullOrUndefined(val) || (val.match(/[^a-zA-Z0-9\s]/g) || []).length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "string",
          inclusive: true,
          message: "Password must contain at least 1 symbol",
        });
      }
    }),
});
