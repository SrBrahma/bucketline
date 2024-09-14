import { z } from "zod"

export const envs = z
  .object({
    BUCKETLINE_DB_API_KEY: z.string().min(1),
    BUCKETLINE_DB_URL: z.string().min(1),

    CI: z.boolean().optional(),
    GITHUB_ACTIONS: z.boolean().optional(),
    GITLAB_CI: z.boolean().optional(),
  })
  .parse(process.env)
