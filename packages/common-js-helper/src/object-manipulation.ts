import { isNil, isPlainObject, omitBy } from 'lodash-es';
import type { UnknownRecord } from 'type-fest';

// Go through an object recursively and remove all key that has "null" or "undefined" value
export const removeEmptyKeys = (obj: UnknownRecord): UnknownRecord => {
  obj = omitBy(obj, isNil) as UnknownRecord;
  for (const [key, val] of Object.entries(obj)) {
    if (isPlainObject(val)) {
      obj[key] = removeEmptyKeys(val as UnknownRecord);
    }
  }
  return obj;
};
