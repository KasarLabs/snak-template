<h1 align="center">
  <img src="https://pbs.twimg.com/profile_images/1834202903189618688/N4J8emeY_400x400.png" width="50"><br>
  Snak Template
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/snak">
    <img src="https://img.shields.io/npm/v/snak.svg" alt="NPM Version" />
  </a>
  <a href="https://github.com/kasarlabs/snak/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/snak.svg" alt="License" />
  </a>
  <a href="https://github.com/kasarlabs/snak/stargazers">
    <img src="https://img.shields.io/github/stars/kasarlabs/snak.svg" alt="GitHub Stars" />
  </a>
  <a href="https://nodejs.org">
    <img src="https://img.shields.io/node/v/snak.svg" alt="Node Version" />
  </a>
</p>

<p align="center">
  A TypeScript template for building powerful and secure AI agents powered by Starknet using the <a href="https://github.com/kasarlabs/snak/">Snak</a> framework
</p>

> ⚠️ **Warning**: This kit is currently under development. Use it at your own risk! Please be aware that sharing sensitive information such as private keys, personal data, or confidential details with AI models or tools carries inherent security risks. The contributors of this repository are **not responsible** for any loss, damage, or issues arising from its use.

## Overview

This template provides a TypeScript-based starting point for building AI agents using the Snak framework. The default implementation demonstrates a simple query to check the latest Starknet block number, which you can extend to build more complex applications with multiple plugins.

## Project Structure

```
snak-template
├── config
│   └── agents
│       └── default.agent.json  # Agent configuration
├── src
│   ├── types                   # TypeScript type definitions
│   └── index.ts                # Main application entry point
├── compose.yml                 # Docker Compose for PostgreSQL
├── package.json
├── tsconfig.json
└── pnpm-workspace.yaml
```

## Prerequisites

- [Node.js](https://nodejs.org/) (see package.json for version requirements)
- [pnpm](https://pnpm.io/installation) package manager
- [Git](https://git-scm.com/downloads)
- [Docker](https://www.docker.com/products/docker-desktop/) (for PostgreSQL via Docker Compose)
- An AI model provider API key (Anthropic, OpenAI, Gemini, or Ollama)
- A Starknet wallet (private key and address)
- A Starknet RPC URL

## Installation

1. Clone the repository:

```bash
git clone https://github.com/kasarlabs/snak-template.git
cd snak-template
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:

```
# Starknet configuration (mandatory)
STARKNET_PUBLIC_ADDRESS="YOUR_STARKNET_PUBLIC_ADDRESS"
STARKNET_PRIVATE_KEY="YOUR_STARKNET_PRIVATE_KEY"
STARKNET_RPC_URL="YOUR_STARKNET_RPC_URL"

# AI configuration (mandatory)
AI_PROVIDER_API_KEY="YOUR_AI_PROVIDER_API_KEY"
AI_MODEL="YOUR_AI_MODEL"
AI_PROVIDER="YOUR_AI_PROVIDER"

# Database configuration (used with Docker Compose)
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="password"
POSTGRES_DB="snak"
POSTGRES_HOST="localhost" 
POSTGRES_PORT="5454"
```

> 💡 **Available Providers and Models**: For a complete list of supported AI providers and their corresponding model names, check the [environment validation configuration](https://github.com/KasarLabs/snak/blob/main/src/config/env.validation.ts) in the main SNAK repository.

## Usage

### Build and Run

To build and run the application:

```bash
# Build the TypeScript code
pnpm run build

# Start the agent with Docker PostgreSQL
pnpm run start
```

For development with automatic reloading:

```bash
pnpm run dev
```

### Docker Setup

The template uses Docker Compose to set up a PostgreSQL database with pgvector. The database will run on port 5454 by default.

```bash
# Start the PostgreSQL database only
pnpm run docker-setup

# Stop and remove the PostgreSQL container
pnpm run docker-teardown
```

## Agent Configuration

The agent's behavior is defined in `config/agents/default.agent.json`. This file specifies:

- The agent's name, bio, and background information
- Agent objectives and knowledge areas
- Available plugins and their capabilities
- Memory settings and operational modes
- Model context protocol (MCP) server configurations

You can customize this configuration to create an agent tailored to your specific use case.

## Support and Community

Need help or have questions? Join our community:

- [Telegram](https://t.me/kasarlabs)
- [GitHub Issues](https://github.com/kasarlabs/snak/issues)

## License

This project is licensed under the ISC License - see the LICENSE file for details.