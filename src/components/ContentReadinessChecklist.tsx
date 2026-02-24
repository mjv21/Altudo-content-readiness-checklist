// components/ContentReadinessChecklist.tsx
import { useMarketplaceClient } from '../utils/hooks/useMarketplaceClient';
import { usePageFields } from '../utils/hooks/usePageFields';
import { checklistRules } from '../utils/checklistRules';

export default function ContentReadinessChecklist() {
  const { pageContext } = useMarketplaceClient();
  const { fields, loading } = usePageFields(pageContext, client);

  if (loading) return <div className="p-4">Checking page...</div>;
  if (!fields) return <div className="p-4">No page selected.</div>;

  const results = checklistRules.map((rule) => ({
    ...rule,
    passed: rule.check(fields),
  }));

  const score = results.filter((r) => r.passed).length;
  const total = results.length;
  const allPassed = score === total;

  return (
    <div className="p-4">
      <div className={`mb-4 p-3 rounded font-bold text-center 
        ${allPassed ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
        {allPassed ? '✓ Ready to Publish' : `${score} of ${total} checks passed`}
      </div>
      
      <ul className="space-y-2">
        {results.map((item) => (
          <li key={item.id} className="flex items-start gap-2">
            <span className={item.passed ? 'text-green-600' : 'text-red-500'}>
              {item.passed ? '✓' : '✗'}
            </span>
            <div>
              <div className="font-medium text-sm">{item.label}</div>
              <div className="text-xs text-gray-500">{item.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
