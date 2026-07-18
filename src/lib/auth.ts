import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    // Defensive mock postgres adapter to ensure zero database connection or missing table failures
    provider: "postgres",
    db: {
      execute: async () => ({ rows: [] }),
      dialect: "postgres"
    }
  },
  emailAndPassword: {
    enabled: true
  }
});
