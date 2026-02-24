'use client';

import { useState, useEffect } from 'react';

export function usePageFields(pageContext: any, client: any) {
  const [fields, setFields] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pageContext?.itemId || !client) return;

    setLoading(true);
    client.query('item.fields', { itemId: pageContext.itemId })
      .then((res: any) => {
        setFields({
          pageTitle: res.data?.fields?.Title,
          metaDescription: res.data?.fields?.MetaDescription,
          heroImage: res.data?.fields?.HeroImage,
          heroImageAlt: res.data?.fields?.HeroImageAlt,
        });
      })
      .catch((error: any) => {
        console.error('Error retrieving item fields:', error);
      })
      .finally(() => setLoading(false));
  }, [pageContext?.itemId, client]);

  return { fields, loading };
}
