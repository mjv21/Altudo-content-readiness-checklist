// utils/hooks/usePageFields.ts
import { useXmcClient } from '@sitecore-marketplace-sdk/xmc';
import { useState, useEffect } from 'react';

export function usePageFields(pageContext) {
  const xmcClient = useXmcClient();
  const [fields, setFields] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pageContext?.itemId) return;
    
    setLoading(true);
    xmcClient.query('item.fields', { itemId: pageContext.itemId })
      .then((res) => {
        setFields({
          pageTitle: res.data?.fields?.Title,
          metaDescription: res.data?.fields?.MetaDescription,
          heroImage: res.data?.fields?.HeroImage,
          heroImageAlt: res.data?.fields?.HeroImageAlt,
        });
      })
      .finally(() => setLoading(false));
  }, [pageContext?.itemId]);

  return { fields, loading };
}
