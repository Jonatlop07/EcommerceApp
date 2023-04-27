export default function filterObject(object: any, pass_fields: string[]): Record<string, unknown> {
  const filtered_object: Record<string, unknown> = {};
  for (const field of pass_fields) {
    filtered_object[field] = object[field]
  }
  return filtered_object;
}
