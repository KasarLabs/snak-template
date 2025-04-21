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
  A minimal template for building powerful and secure AI agents powered by Starknet using the <a href="https://github.com/kasarlabs/snak/">Snak</a>
</p>

> ⚠️ **Warning**: This kit is currently under development. Use it at your own risk! Please be aware that sharing sensitive information such as private keys, personal data, or confidential details with AI models or tools carries inherent security risks. The contributors of this repository are **not responsible** for any loss, damage, or issues arising from its use.

## Overview

This template provides a starting point for using Snak as a framework to create Agents. The default implementation demonstrates a simple query to check blockchain status, which you can extend to build more complex applications.

## Prerequisites

- [Node.js](https://nodejs.org/) (see package.json for version requirements)
- [pnpm](https://pnpm.io/installation) package manager
- [Git](https://git-scm.com/downloads)
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

# Database configuration (mandatory)
POSTGRES_USER="YOUR_POSTGRES_USER"
POSTGRES_PASSWORD="YOUR_POSTGRES_PASSWORD"
POSTGRES_DB="YOUR_POSTGRES_DB"
POSTGRES_HOST="YOUR_POSTGRES_HOST"
POSTGRES_PORT="YOUR_POSTGRES_PORT"
```

> 💡 **Available Providers and Models**: For a complete list of supported AI providers and their corresponding model names, check the [environment validation configuration](https://github.com/KasarLabs/snak/blob/main/src/config/env.validation.ts) in the main SNAK repository.

## Agent Configuration

The agent's behavior is defined in `default.agent.json`. This file specifies:

- The agent's name and description
- Available commands and their parameters
- Memory settings
- System prompt for the AI model

You can customize this configuration to create an agent tailored to your specific use case.

## Support and Community

Need help or have questions? Join our community:

- [Telegram](https://t.me/kasarlabs)
- [GitHub Issues](https://github.com/kasarlabs/snak/issues)

## License

This project is licensed under the ISC License - see the LICENSE file for details.
