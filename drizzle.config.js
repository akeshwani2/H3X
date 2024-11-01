export default {
    dialect: "postgresql",
    schema: "./utils/db/schema.ts",
    out: "./drizzle",
  
    dbCredentials: {
      url: "postgresql://neondb_owner:F2U4JHLchMwb@ep-jolly-mouse-a8cicwy1.eastus2.azure.neon.tech/neondb?sslmode=require",
      connectionString:
        "postgresql://neondb_owner:F2U4JHLchMwb@ep-jolly-mouse-a8cicwy1.eastus2.azure.neon.tech/neondb?sslmode=require",
    },
  };