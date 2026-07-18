import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { preference, customText, itemsContext } = await request.json();
    const apiKey = process.env.OPENAI_API_KEY || '';

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

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

    const prompt = `You are the AI Recommendation Engine for Rock-Bit Crypto Exchange.
Analyze the user's asset investment preference and recommend the top 2 matching tokens from the database.

User Preference:
${preference === 'custom' ? customText : preference}

Available Assets:
${itemsContext}

Output MUST be a valid JSON array of objects with exactly this format:
[
  {"id": "asset-id-here", "reason": "Short reason explaining why this fits their profile"}
]
Do not include any markdown format blocks or extra text outside the JSON.`;

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250,
        response_format: { type: "json_object" }
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
    console.error('❌ Server AI Recommend Error:', err.message);
    return NextResponse.json({ error: err.message || 'Error generating recommendations' }, { status: 500 });
  }
}
