import z from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(1000),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(1000)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "User's id is required.")
    .max(255)
    .optional()
    .nullable(),
  status: z
    .string()
    .optional()
    .nullable()
    .refine(
      (value) => {
        const isValidStatus = ["OPEN", "CLOSED", "IN_PROGRESS"].includes(
          value!
        );
        return (
          value === null ||
          value === undefined ||
          (isValidStatus && value.trim().length > 0)
        );
      },
      {
        message: "Must be a valid non-empty status value",
      }
    ),
});
