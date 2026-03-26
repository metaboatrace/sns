import labelsJson from './labels.json';

type NestedRecord = { [key: string]: string | NestedRecord };

/**
 * Retrieve a label value by dot-separated key path (e.g. "admin.usersTable.email").
 * Returns the key itself when the path is not found.
 */
export function getLabel(path: string): string {
  const keys = path.split('.');
  let current: NestedRecord | string = labelsJson as NestedRecord;

  for (const key of keys) {
    if (typeof current !== 'object' || current === null) {
      return path;
    }
    current = current[key];
  }

  if (typeof current === 'string') {
    return current;
  }

  return path;
}
