type ParamNames = "pointer" | "any-pointer"

type ParamValues = "none" | "fine" | "coarse"

type CompileParamResult<TName extends ParamNames, TValue extends ParamValues>
  = `(${TName}: ${TValue})`

/**
 * @api private
 */
const compileParam = <TName extends ParamNames, TValue extends ParamValues>(
  name: TName,
  value: TValue
): CompileParamResult<TName, TValue> => `(${name}: ${value})`

type CombineParamsOperators = "and" | "or"

type CombineParamsResult<
  TLeft extends string,
  TRight extends string,
  TOp extends CombineParamsOperators
> = `${TLeft} ${TOp} ${TRight}`

/**
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

type AddParenthesesResult<T extends string> = `(${T})`

const addParentheses = <T extends string>(
  value: T
): AddParenthesesResult<T> => `(${value})`

const touch = compileParam("pointer", "coarse")

const desktop = compileParam("pointer", "fine")

const desktopTouch = combineParams(
  desktop,

  compileParam("any-pointer", "coarse"),

  "and"
)

const desktopAny = combineParams(
  desktop,

  addParentheses(desktopTouch),

  "or"
)

export const variants = {
  touch,
  desktop,
  "desktop-touch": desktopTouch,
  "desktop-any": desktopAny
} as const
