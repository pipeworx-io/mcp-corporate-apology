interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * corporate-apology MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Generate a corporate apology for any offense, at any sincerity level. Default si
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'corporate_apology_generate',
    description: 'Generate a corporate apology for any offense, at any sincerity level. Default sincerity: performative.',
    inputSchema: {
      type: 'object' as const,
      properties: {"offense": {"type": "string", "description": "What happened"}, "company": {"type": "string", "description": "Company name"}, "audience": {"type": "string", "enum": ["public", "employee", "investor", "regulator"]}, "sincerity": {"type": "string", "enum": ["genuine", "performative", "legal", "pr", "none"]}, "medium": {"type": "string", "enum": ["statement", "email", "tweet", "press_release"]}},
      required: ["offense"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('corporate-apology API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'corporate_apology_generate':
      return callApi('https://api.stupidapis.com/corporate-apology/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
