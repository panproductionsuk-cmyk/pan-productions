import React from 'react';
import { useMarketingProductions } from '@/hooks/useSupabaseProductions';

const Marketing = () => {
  const { productions, loading, error } = useMarketingProductions();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'hsl(220, 18%, 18%)' }}>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-white mb-6">Marketing Page - Hook Test</h1>
        <p className="text-xl text-white">Loading: {loading ? 'yes' : 'no'}</p>
        <p className="text-xl text-white">Error: {error ? error.message : 'none'}</p>
        <p className="text-xl text-white">Count: {productions?.length ?? 0}</p>
      </div>
    </div>
  );
};

export default Marketing;
