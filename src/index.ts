import { load_json_config, StarknetAgent } from "@hijox/agents";
import dotenv from "dotenv";
import { RpcProvider } from "starknet";

// Initialize environment variables
dotenv.config();

/**
 * Type definitions for the database configuration
 */
interface DatabaseConfig {
  database: string;
  host: string;
  user: string;
  password: string;
  port: number;
}

/**
 * Validates that all required environment variables are present
 * @returns {string[]} Array of missing environment variables
 */
function validateEnvironment(): string[] {
  const requiredEnvVars = [
    "AI_PROVIDER",
    "AI_MODEL",
    "AI_PROVIDER_API_KEY",
    "STARKNET_PRIVATE_KEY",
    "STARKNET_PUBLIC_ADDRESS",
    "STARKNET_RPC_URL",
  ];

  return requiredEnvVars.filter((varName) => !process.env[varName]);
}

/**
 * Initializes database connection credentials
 * @returns {DatabaseConfig} Database configuration object
 */
function initializeDatabaseConfig(): DatabaseConfig {
  return {
    database: process.env.POSTGRES_DB || "",
    host: process.env.POSTGRES_HOST || "",
    user: process.env.POSTGRES_USER || "",
    password: process.env.POSTGRES_PASSWORD || "",
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
  };
}

/**
 * Creates and initializes a Starknet agent
 * @param {any} config Agent configuration from JSON
 * @param {DatabaseConfig} dbConfig Database configuration
 * @returns {StarknetAgent} Initialized Starknet agent
 */
function createStarknetAgent(
  config: any,
  dbConfig: DatabaseConfig,
): StarknetAgent {
  const {
    AI_PROVIDER,
    AI_MODEL,
    AI_PROVIDER_API_KEY,
    STARKNET_PRIVATE_KEY,
    STARKNET_PUBLIC_ADDRESS,
    STARKNET_RPC_URL,
  } = process.env;

  // After validation, we can assert these are defined
  if (
    !AI_PROVIDER ||
    !AI_MODEL ||
    !AI_PROVIDER_API_KEY ||
    !STARKNET_PRIVATE_KEY ||
    !STARKNET_PUBLIC_ADDRESS ||
    !STARKNET_RPC_URL
  ) {
    throw new Error("Required environment variables are undefined");
  }

  return new StarknetAgent({
    provider: new RpcProvider({ nodeUrl: STARKNET_RPC_URL }),
    accountPrivateKey: STARKNET_PRIVATE_KEY,
    accountPublicKey: STARKNET_PUBLIC_ADDRESS,
    aiModel: AI_MODEL,
    aiProvider: AI_PROVIDER,
    aiProviderApiKey: AI_PROVIDER_API_KEY,
    agentconfig: config,
    db_credentials: dbConfig,
    agentMode: "agent",
    signature: "key",
  });
}

/**
 * Main function to run the Starknet agent
 */
async function main(): Promise<void> {
  try {
    // Validate environment variables
    const missingVars = validateEnvironment();
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(", ")}. Please check your .env file.`,
      );
    }

    // Load agent configuration
    const agentConfig = await load_json_config("default.agent.json");
    if (!agentConfig) {
      throw new Error(
        "Failed to load agent configuration. Invalid or empty JSON file.",
      );
    }

    // Initialize database configuration
    const dbConfig = initializeDatabaseConfig();

    // Create and initialize the agent
    console.log("Initializing StarknetAgent...");
    const agent = createStarknetAgent(agentConfig, dbConfig);
    console.log("✅ StarknetAgent initialized successfully");

    try {
      // Set up the agent executor
      console.log("Creating agent executor...");
      await agent.createAgentReactExecutor();
      console.log("✅ Agent executor created successfully!");

      // Test the agent with a simple query
      console.log("Executing test query...");
      const agentResponse = await agent.execute(
        "What is Starknet latest block number?",
      );
      console.log("Agent response:", agentResponse);
    } catch (execError: unknown) {
      console.error("❌ Agent execution failed:");
      console.error(
        "Error details:",
        execError instanceof Error ? execError.message : String(execError),
      );
      console.error("Full error:", execError);
      process.exit(1);
    }
  } catch (error: unknown) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error),
    );

    if (error instanceof Error && error.stack) {
      console.debug("Stack trace:", error.stack);
    }

    // Handle specific known errors
    if (String(error).includes("Unknown logger level")) {
      console.warn(
        "Warning: Logger configuration issue detected. This is non-fatal but should be addressed.",
      );
    }

    process.exit(1);
  }
}

// Run the application
main();
