import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const GH_API_URL = 'https://api.github.com';

// Create server instance
const server = new McpServer({
  name: 'mcp-example',
  version: '1.0.0',
});

server.registerTool(
  'add-numbers',
  {
    title: 'Add two numbers',
    description: 'Take in two numbers, add them together and print the result',
    inputSchema: {
      num1: z.number().describe('First number'),
      num2: z.number().describe('Second number'),
    },
    outputSchema: { result: z.string() },
  },
  (input) => {
    const { num1, num2 } = input;
    const output = { result: `Result is ${num1 + num2}` };
    return {
      content: [{ type: 'text', text: JSON.stringify(output) }],
      structuredContent: output,
    };
  }
);

server.registerTool(
  'get_github_repos',
  {
    title: 'Get GitHub repos',
    description: 'Take in a GitHub username and return a list of all repos belonged to that user',
    inputSchema: {
      username: z.string().describe('GitHub username'),
    },
    outputSchema: { result: z.string() },
  },
  async (input) => {
    const { username } = input;

    const userReposResponse = await fetch(`${GH_API_URL}/users/${username}/repos`, {
      headers: {
        'User-Agent': 'MCP-Server',
      },
    });

    const reposInfo: { name: string }[] = await userReposResponse.json();
    const reposList = reposInfo.map((repo, i) => `${i}. ${repo.name}`).join('\n\n');

    const output = {
      result: `User ${username} has ${reposInfo.length} repos. Here is the list:\n\n${reposList}`,
    };
    return {
      content: [{ type: 'text', text: JSON.stringify(output) }],
      structuredContent: output,
    };
  }
);

server.registerResource(
  'angular-info',
  'info://angular',
  {
    description: 'Resource for info about Angular',
    mimeType: 'application/pdf',
  },
  async (uri) => {
    const uriString = uri.toString();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const angularInfo = await readFile(join(__dirname, 'data/angular-info.pdf'), {
      encoding: 'base64',
    });

    return {
      contents: [
        {
          uri: uriString,
          mimeType: 'application/pdf',
          blob: angularInfo,
        },
      ],
    };
  }
);

server.registerPrompt(
  'explain-angular-concept',
  {
    title: 'Explain Angular concept',
    description: 'Explain an Angular concept in details',
    argsSchema: {
      concept: z.string(),
    },
  },
  (args) => {
    const { concept } = args;
    return {
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: `Give me a detail explaination of the ${concept} concept in Angular. Only use latest version of Angular with strict TypeScript. Compares the concept to something similar from other popular framework such as React or even native JS. Also gives some example use cases for the concept`,
          },
        },
      ],
    };
  }
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  server.connect(transport);
}

main().catch((err) => {
  console.error('Error in main: ', err);
  process.exit(1);
});
