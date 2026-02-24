// utils/hooks/useMarketplaceClient.ts
'use client';

import { useState, useEffect } from 'react';
import * as MarketplaceSDK from '@sitecore-marketplace-sdk/client';

export function useMarketplaceClient() {
  const [client, setClient] = useState<any>(null);
  const [pageContext, setPageContext] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const sdk = MarketplaceSDK as any;
      const ClientClass = sdk.default || sdk.Client || sdk.createClient;

      if (!ClientClass) {
        throw new Error('Marketplace SDK client class not found');
      }

      const marketplaceClient =
        typeof ClientClass === 'function'
          ? ClientClass()
          : new ClientClass();

      setClient(marketplaceClient);

      marketplaceClient.subscribe('pages.context', (res: any) => {
        setPageContext(res.data);
      });

      setIsInitialized(true);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setIsInitialized(false);
    }
  }, []);

  return { client, pageContext, isInitialized, error };
}
