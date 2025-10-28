import { useState } from 'react';

export const useStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    loading,
    error,
    setLoading,
    setError,
  };
};
