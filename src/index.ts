import { load_json_config, StarknetAgent } from "@hijox/agents";

import dotenv from "dotenv";
import { RpcProvider } from "starknet";

// Initialize environment variables
dotenv.config();

async function main() {
  try {
    // Ensure required environment variables are present
    const {
      AI_PROVIDER,
      AI_MODEL,
      AI_PROVIDER_API_KEY,
      STARKNET_PRIVATE_KEY,
      STARKNET_PUBLIC_ADDRESS,
      STARKNET_RPC_URL,
    } = process.env;

    const requiredEnvVars = [
      { name: "AI_PROVIDER", value: AI_PROVIDER },
      { name: "AI_MODEL", value: AI_MODEL },
      { name: "AI_PROVIDER_API_KEY", value: AI_PROVIDER_API_KEY },
      { name: "STARKNET_PRIVATE_KEY", value: STARKNET_PRIVATE_KEY },
      { name: "STARKNET_RPC_URL", value: STARKNET_RPC_URL },
      { name: "STARKNET_PUBLIC_ADDRESS", value: STARKNET_PUBLIC_ADDRESS },
    ];

    const missingVars = requiredEnvVars
      .filter((v) => !v.value)
      .map((v) => v.name);

    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(
          ", "
        )}. Please check your .env file.`
      );
    }

    const json = await load_json_config("default.agent.json");
    if (!json) {
      throw new Error(
        "Failed to load agent configuration. Invalid or empty JSON file."
      );
    }

    const database = {
      database: process.env.POSTGRES_DB as string,
      host: process.env.POSTGRES_HOST as string,
      user: process.env.POSTGRES_USER as string,
      password: process.env.POSTGRES_PASSWORD as string,
      port: parseInt(process.env.POSTGRES_PORT as string),
    };

    // Initialize the StarknetAgent with required credentials
    const agent = new StarknetAgent({
      provider: new RpcProvider({ nodeUrl: STARKNET_RPC_URL as string }),
      accountPrivateKey: STARKNET_PRIVATE_KEY as string,
      accountPublicKey: STARKNET_PUBLIC_ADDRESS as string,
      aiModel: AI_MODEL as string,
      aiProvider: AI_PROVIDER as string,
      aiProviderApiKey: AI_PROVIDER_API_KEY as string,
      agentconfig: json,
      db_credentials: database,
      agentMode: "agent",
      signature: "key",
    });

    console.log("StarknetAgent initialized successfully.");

    try {
      console.log("Creating agent executor...");
      await agent.createAgentReactExecutor();
      console.log("✅ Agent executor created successfully!");

      // Test the agent with a simple request
      console.log("Asking q to execute a query...");
      const agentResponse = await agent.execute(
        "What is Starknet latest block number?"
      );
      console.log("Agent response:", agentResponse);
    } catch (execError) {
      const errorMessage = String(execError);
      console.error("❌ Agent execution failed:");
      console.error("Error details:", errorMessage);
      console.error("Full error:", execError);
      process.exit(1);
    }
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : String(error)
    );
    if (error instanceof Error && error.stack) {
      console.debug("Stack trace:", error.stack);
    }

    // Handle winston logger errors
    if (String(error).includes("Unknown logger level")) {
      console.warn(
        "Warning: Logger configuration issue detected. This is non-fatal but should be addressed."
      );
    }

    process.exit(1);
  }
}

main();
