/**
 * @api private
 */
type ParamNames = "pointer" | "any-pointer"

/**
 * @api private
 */
type ParamValues = "none" | "fine" | "coarse"

/**
 * @api private
 */
type CompileParamResult<TName extends ParamNames, TValue extends ParamValues>
  = `${TName}: ${TValue}`

/**
 * Creates a parameter for `@media` query at-rule.
 *
 * @api private
 */
const compileParam = <TName extends ParamNames, TValue extends ParamValues>(
  name: TName,
  value: TValue
): CompileParamResult<TName, TValue> => `${name}: ${value}`

/**
 * @api private
 */
type CombineParamsOperators = "and" | "or"

/**
 * @api private
 */
type CombineParamsResult<
  TLeft extends string,
  TRight extends string,
  TOp extends CombineParamsOperators
> = `${TLeft} ${TOp} ${TRight}`

/**
 * Combines two `@media` query parameters together, applies given operator.
 *
 * @api private
 */
const combineParams = <
  TLeft extends string,
  TRight extends string,
  TOp extends CombineParamsOperators
>(
  left: TLeft,
  right: TRight,
  op: TOp
): CombineParamsResult<TLeft, TRight, TOp> => `${left} ${op} ${right}`

/**
 * @api private
 */
type AddParenthesesResult<T extends string> = `(${T})`

/**
 * Adds parentheses to given parameter
 *
 * @api private
 */
const addParentheses = <T extends string>(
  value: T
): AddParenthesesResult<T> => `(${value})`

/**
 * Matches touchscreen input device
 *
 * @api private
 */
const touch = addParentheses(compileParam("pointer", "coarse"))

/**
 * Matches mouse input device
 *
 * @api private
 */
const desktop = combineParams(
  addParentheses(compileParam("pointer", "fine")),

  addParentheses(compileParam("pointer", "none")),

  "or"
)

/**
 * Matches device with mouse and touchscreen
 *
 * @api private
 */
const desktopTouch = combineParams(
  compileParam("pointer", "fine"),

  addParentheses(compileParam("any-pointer", "coarse")),

  "and"
)

/**
 * Matches device with mouse and/or touchscreen
 *
 * @api private
 */
const desktopAny = combineParams(
  desktop,

  addParentheses(desktopTouch),

  "or"
)

/**
 * Available device variants
 *
 * @api private
 */
export const variants = Object.freeze({
  touch,
  desktop,
  "desktop-touch": desktopTouch,
  "desktop-any": desktopAny
})
