
import * as z from "zod";

export const formSchema = z.object({
  name: z.string(),
  about: z.string(),
  price: z.preprocess(
    (val) => (val !== "" ? Number(val) : undefined),
    z.number().min(1).max(10000)
  ),
  gender: z.string(),
  state: z.string(),
  city: z.string(),
  hostelType: z.string(),
  ...Object.keys(facilityLabels).reduce((acc, key) => {
    acc[key] = z.boolean();
    return acc;
  }, {} as Record<string, z.ZodBoolean>),
  ...Object.keys(houseRulesLabels).reduce((acc, key) => {
    acc[key] = z.boolean();
    return acc;
  }, {} as Record<string, z.ZodBoolean>)
});
