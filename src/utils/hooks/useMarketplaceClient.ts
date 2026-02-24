// utils/hooks/useMarketplaceClient.ts
import { createClient } from '@sitecore-marketplace-sdk/client';
import { useState, useEffect } from 'react';

export function useMarketplaceClient() {
  const [client, setClient] = useState(null);
  const [pageContext, setPageContext] = useState(null);

  useEffect(() => {
    const marketplaceClient = createClient();
    setClient(marketplaceClient);

    // Subscribe to page context - fires whenever the author switches pages
    marketplaceClient.subscribe('pages.context', (res) => {
      setPageContext(res.data);
    });
  }, []);

  return { client, pageContext };

}

