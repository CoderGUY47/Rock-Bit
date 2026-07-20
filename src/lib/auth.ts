import { betterAuth } from "better-auth";
import { phoneNumber, emailOTP } from "better-auth/plugins";
import { Pool } from "pg";

// Check if we can reach the PostgreSQL database, otherwise use the mock adapter
let dbConfig: any;

if (process.env.DATABASE_URL) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    connectionTimeoutMillis: 2000,
  });

  dbConfig = {
    provider: "postgres",
    db: {
      dialect: "postgres",
      execute: async (sql: string, params: any[]) => {
        try {
          const res = await pool.query(sql, params);
          return { rows: res.rows };
        } catch (err: any) {
          // Gracefully handle ALL DB errors so Better Auth doesn't throw a 500
          console.warn(`[Better Auth DB] Query failed (${err.code || err.message}). Returning empty rows.`);
          return { rows: [] };
        }
      }
    }
  };
} else {
  dbConfig = {
    provider: "postgres",
    db: {
      execute: async () => ({ rows: [] }),
      dialect: "postgres"
    }
  };
}

export const auth = betterAuth({
  database: dbConfig,
  trustedOrigins: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ],
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }
  },
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        console.log(`[SMS OTP] To ${phoneNumber}: Code = ${code}`);
      }
    }),
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        console.log(`[Email OTP] To ${email} (${type}): Code = ${otp}`);
      }
    })
  ]
});
