export function parseTokens() {
  const tokensString = Deno.env.get('bump_tokens')

  if (!tokensString)
    return {}

  const tokens: Record<string, string> = {}

  for (const token of tokensString.split(',')) {
    const parts = token.split('@')

    tokens[parts[1]] = parts[0]
  }

  return tokens
}
