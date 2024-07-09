import {
  ValueErrorType,
  ErrorFunctionParameter,
} from "@sinclair/typebox/errors";

export function ChineseErrorFunction(error: ErrorFunctionParameter) {
  switch (error.errorType) {
    case ValueErrorType.ArrayContains:
      return "数组应至少包含一个匹配的值";
    case ValueErrorType.ArrayMaxContains:
      return `数组中匹配的值不应超过 ${error.schema.maxContains} 个`;
    case ValueErrorType.ArrayMinContains:
      return `数组中匹配的值应至少有 ${error.schema.minContains} 个`;
    case ValueErrorType.ArrayMaxItems:
      return `数组长度应小于或等于 ${error.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `数组长度应大于或等于 ${error.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "数组元素应该是唯一的";
    case ValueErrorType.Array:
      return "应该是数组类型";
    case ValueErrorType.AsyncIterator:
      return "应该是异步迭代器类型";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `大整数应小于 ${error.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `大整数应大于 ${error.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `大整数应小于或等于 ${error.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `大整数应大于或等于 ${error.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `大整数应该是 ${error.schema.multipleOf} 的倍数`;
    case ValueErrorType.BigInt:
      return "应该是大整数类型";
    case ValueErrorType.Boolean:
      return "应该是布尔类型";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `日期时间戳应大于 ${error.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `日期时间戳应小于 ${error.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `日期时间戳应大于或等于 ${error.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `日期时间戳应小于或等于 ${error.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `日期时间戳应该是 ${error.schema.multipleOfTimestamp} 的倍数`;
    case ValueErrorType.Date:
      return "应该是日期类型";
    case ValueErrorType.Function:
      return "应该是函数类型";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `整数应小于 ${error.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `整数应大于 ${error.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `整数应小于或等于 ${error.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `整数应大于或等于 ${error.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `整数应该是 ${error.schema.multipleOf} 的倍数`;
    case ValueErrorType.Integer:
      return "应该是整数类型";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "存在意外的属性";
    case ValueErrorType.Intersect:
      return "应该匹配所有的值";
    case ValueErrorType.Iterator:
      return "应该是迭代器类型";
    case ValueErrorType.Literal:
      return `应该是 ${
        typeof error.schema.const === "string"
          ? `'${error.schema.const}'`
          : error.schema.const
      }`;
    case ValueErrorType.Never:
      return "永远不应该出现此类型";
    case ValueErrorType.Not:
      return "不应匹配此值";
    case ValueErrorType.Null:
      return "应该是 null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `数字应小于 ${error.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `数字应大于 ${error.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `数字应小于或等于 ${error.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `数字应大于或等于 ${error.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `数字应该是 ${error.schema.multipleOf} 的倍数`;
    case ValueErrorType.Number:
      return "应该是数字类型";
    case ValueErrorType.Object:
      return "应该是对象类型";
    case ValueErrorType.ObjectAdditionalProperties:
      return "存在意外的属性";
    case ValueErrorType.ObjectMaxProperties:
      return `对象的属性数量不应超过 ${error.schema.maxProperties} 个`;
    case ValueErrorType.ObjectMinProperties:
      return `对象的属性数量应至少有 ${error.schema.minProperties} 个`;
    case ValueErrorType.ObjectRequiredProperty:
      return "缺少必需的属性";
    case ValueErrorType.Promise:
      return "应该是 Promise 类型";
    case ValueErrorType.RegExp:
      return "字符串应匹配指定的正则表达式";
    case ValueErrorType.StringFormatUnknown:
      return `未知的格式 '${error.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `字符串应匹配 '${error.schema.format}' 格式`;
    case ValueErrorType.StringMaxLength:
      return `字符串长度应小于或等于 ${error.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `字符串长度应大于或等于 ${error.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `字符串应匹配模式 '${error.schema.pattern}'`;
    case ValueErrorType.String:
      return "应该是字符串类型";
    case ValueErrorType.Symbol:
      return "应该是 Symbol 类型";
    case ValueErrorType.TupleLength:
      return `元组应该有 ${error.schema.maxItems || 0} 个元素`;
    case ValueErrorType.Tuple:
      return "应该是元组类型";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `字节长度应小于或等于 ${error.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `字节长度应大于或等于 ${error.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "应该是 Uint8Array 类型";
    case ValueErrorType.Undefined:
      return "应该是 undefined";
    case ValueErrorType.Union:
      return "应该匹配联合类型中的一个";
    case ValueErrorType.Void:
      return "应该是 void 类型";
    case ValueErrorType.Kind:
      return `应该是 '${error.schema.Kind}' 类型`;
    default:
      return "未知的错误类型";
  }
}
