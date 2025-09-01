import { env } from "@/lib/env";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: env.server.SANITY_PROJECT_ID,
  dataset: env.server.SANITY_DATASET,
  apiVersion: env.server.SANITY_API_VERSION,
  useCdn: process.env.NODE_ENV === "production",
});
