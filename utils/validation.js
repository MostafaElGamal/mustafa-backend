import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

export function performValidation(schema, target) {
  const validate = ajv.compile(schema);
  const result = validate(target);
  return { valid: result, errors: validate.errors };
}

export const dateFormatPattern = '^\\d{4}-(0\\d|1[0-2])-([0-2]\\d|3[0-1])$';
export const positiveIntegerPattern = '^[1-9]\\d*$';
export const capacityPattern = '^(200|1\\d{2}|\\d{2}|[1-9])$';
