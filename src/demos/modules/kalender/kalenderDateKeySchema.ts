import * as v from "valibot"

/** Local calendar date as `YYYY-MM-DD`, used for the `termin` search param. */
export const kalenderDateKeySchema = v.pipe(v.string(), v.regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/))
