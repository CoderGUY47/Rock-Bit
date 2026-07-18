import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY || '';

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Determine config based on key type (OpenRouter vs OpenAI)
    const isOpenRouter = apiKey.startsWith('sk-or');
    const url = isOpenRouter
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : 'https://api.openai.com/v1/chat/completions';
    
    const model = isOpenRouter ? 'openrouter/auto' : 'gpt-4o-mini';
    
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(isOpenRouter && {
        'HTTP-Referer': 'http://localhost:3000',
        'X-Title': 'Rock-Bit Crypto Exchange'
      })
    };

    const messages = [
      {
        role: 'system',
        content: `You are the Conversational AI Assistant for "Rock-Bit", a premium cryptocurrency exchange and portfolio tracker platform.
Navigation rules:
- If the user wants to trade, checkout, or buy/sell crypto, include the exact phrase "Navigating to Checkout" in your reply.
- If the user wants to check dashboard, portfolio, exchange, or wallet balances, include the exact phrase "Navigating to Dashboard" in your reply.
- If the user wants to see markets, coin listings, or prices, include the exact phrase "Navigating to Markets" in your reply.
- If the user wants to read about us, include the exact phrase "Navigating to About" in your reply.
- If the user wants to contact support or send message, include the exact phrase "Navigating to Contact" in your reply.
- If the user wants to add custom token, include the exact phrase "Navigating to Add Item" in your reply.
- If the user wants to manage asset holdings, include the exact phrase "Navigating to Manage Items" in your reply.

Explain crypto topics (DeFi, staking, blockchain) clearly and keep replies under 75 words.`
      },
      ...history,
      { role: 'user', content: message }
    ];

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';
    return NextResponse.json({ reply });

  } catch (err: any) {
    console.error('❌ Server AI Chat Error:', err.message);
    return NextResponse.json({ error: err.message || 'Error generating response' }, { status: 500 });
  }
}
