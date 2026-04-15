# mcp-corporate-apology

corporate-apology MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `corporate_apology_generate` | Generate a corporate apology for any offense, at any sincerity level. Default sincerity: performative. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "corporate-apology": {
      "url": "https://gateway.pipeworx.io/corporate-apology/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use corporate-apology
```

## License

MIT
