// Netlify serverless function to proxy OpenAI API calls
// This avoids CORS issues and keeps API keys secure

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Allow GET for health check / diagnostics
  if (event.httpMethod === 'GET') {
    const hasKey = !!(process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        status: 'ok',
        hasApiKey: hasKey,
        functionName: 'openai-chat',
        message: hasKey 
          ? 'Function is ready. API key is configured.' 
          : 'Function is ready but API key is not configured. Please set OPENAI_API_KEY in Netlify environment variables and redeploy.'
      })
    };
  }

  // Only allow POST requests for actual API calls
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get API key from Netlify environment variable
    // Check both OPENAI_API_KEY and VITE_OPENAI_API_KEY for compatibility
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
    
    // Log for debugging (will appear in Netlify function logs)
    console.log('Environment check:', {
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasViteKey: !!process.env.VITE_OPENAI_API_KEY,
      allEnvKeys: Object.keys(process.env).filter(k => k.includes('OPENAI'))
    });
    
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not found in environment variables');
      console.error('Available env keys:', Object.keys(process.env).filter(k => k.includes('OPENAI') || k.includes('API')));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'OpenAI API key not configured. The OPENAI_API_KEY environment variable is not available to this function. Please ensure: 1) The variable is set in Netlify (Site settings → Environment variables), 2) The scope includes "Functions", and 3) You have redeployed the site after adding the variable.' 
        })
      };
    }

    // Parse request body
    const { query, contextPrompt } = JSON.parse(event.body);

    if (!query) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Query is required' })
      };
    }

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: contextPrompt || 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error?.message || response.statusText;
      
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: `OpenAI API error: ${errorMsg}` 
        })
      };
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ response: aiResponse })
    };

  } catch (error) {
    console.error('Error in OpenAI function:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: `Server error: ${error.message}` 
      })
    };
  }
};

