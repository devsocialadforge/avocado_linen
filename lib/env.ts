import { z } from "zod";

const serverSchema = z.object({
  SANITY_PROJECT_ID: z.string().min(1),
  SANITY_DATASET: z.string().min(1),
  SANITY_API_VERSION: z.string().min(4),
  SANITY_API_READ_TOKEN: z.string().optional(), // only needed for private/drafts
});

// Split read so client bundle only sees NEXT_PUBLIC_ keys
export const env = {
  server: serverSchema.parse({
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION,
    // SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  }),
} as const;
