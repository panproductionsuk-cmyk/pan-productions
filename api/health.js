const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const timestamp = new Date().toISOString();
  let supabaseStatus = 'unknown';
  let supabaseLatency = null;
  let error = null;

  try {
    const start = Date.now();
    
    // Simple query to keep Supabase active - just check we can connect
    const { data, error: queryError } = await supabase
      .from('_health_check')
      .select('*')
      .limit(1)
      .maybeSingle();

    // If table doesn't exist, try a simpler RPC or auth check
    if (queryError && queryError.code === '42P01') {
      // Table doesn't exist - use auth health check instead
      const { error: authError } = await supabase.auth.getSession();
      if (authError) {
        throw authError;
      }
      supabaseStatus = 'ok';
    } else if (queryError) {
      throw queryError;
    } else {
      supabaseStatus = 'ok';
    }

    supabaseLatency = Date.now() - start;

  } catch (err) {
    supabaseStatus = 'error';
    error = err.message || 'Unknown error';
    console.error('Health check failed:', err);
  }

  const response = {
    status: supabaseStatus === 'ok' ? 'healthy' : 'unhealthy',
    timestamp,
    checks: {
      supabase: {
        status: supabaseStatus,
        latency_ms: supabaseLatency,
        ...(error && { error })
      }
    },
    purpose: 'Keeps Supabase database active (prevents free-tier pause after 7 days inactivity)'
  };

  const statusCode = supabaseStatus === 'ok' ? 200 : 503;
  return res.status(statusCode).json(response);
};
