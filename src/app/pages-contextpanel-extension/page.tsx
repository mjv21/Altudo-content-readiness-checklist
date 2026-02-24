"use client";
import { useMarketplaceClient } from "@/src/utils/hooks/useMarketplaceClient";

function PagesContextPanel() {
  const { client, pageContext } = useMarketplaceClient();

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", maxWidth: "600px", margin: "2rem auto" }}>
      {client && pageContext ? (
        <div className="pages-context">
          <h3>Pages Context:</h3>
          <ul>
            <li><strong>Page ID:</strong> {pageContext.pageInfo?.id}</li>
            <li><strong>Title:</strong> {pageContext.pageInfo?.name}</li>
            <li><strong>Language:</strong> {pageContext.pageInfo?.language}</li>
            <li><strong>Path:</strong> {pageContext.pageInfo?.path}</li>
          </ul>
        </div>
      ) : (
        <p>No page context available yet.</p>
      )}
    </div>
  );
}

export default PagesContextPanel;
