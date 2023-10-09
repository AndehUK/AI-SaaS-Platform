import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image prompt is required.",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = ["1", "2", "3", "4", "5"];

export const resolutionOptions = ["256", "512", "1024"];
