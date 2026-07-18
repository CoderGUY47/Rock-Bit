import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: process.env.DATABASE_URL 
    ? {
        provider: "postgres",
        url: process.env.DATABASE_URL
      }
    : {
        // Defensive mock postgres adapter during Next.js build-time static generation
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
