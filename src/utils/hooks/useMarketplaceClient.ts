// utils/hooks/useMarketplaceClient.ts
'use client';

import { useState, useEffect } from 'react';
import * as MarketplaceSDK from '@sitecore-marketplace-sdk/client';

export function useMarketplaceClient() {
  const [client, setClient] = useState<any>(null);
  const [pageContext, setPageContext] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const sdk = MarketplaceSDK as any;
    const ClientClass = sdk.default || sdk.Client || sdk.createClient;
    
    if (!ClientClass) return;

    const marketplaceClient = typeof ClientClass === 'function' 
      ? ClientClass() 
      : new ClientClass();
      
    setClient(marketplaceClient);

    marketplaceClient.subscribe('pages.context', (res: any) => {
      setPageContext(res.data);
    });
  }, []);

  return { client, pageContext, isInitialized, error };
}

