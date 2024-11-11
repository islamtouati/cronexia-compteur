// Basic types
type Periodicity = "Daily" | "Weekly" | "Monthly" | "Yearly" | "Custom";
type ValueType = "Boolean" | "Date" | "Float" | "Number" | "String";
type StepType =
  | "Condition"
  | "Calculation"
  | "Function"
  | "Return"
  | "Variable";
type EntityType = "Constant" | "Calculation" | "Function" | "Variable";
type ConditionValues =
  | "Equal"
  | "NotEqual"
  | "GreaterThan"
  | "LessThan"
  | "GreaterThanOrEqual"
  | "LessThanOrEqual";
type OperatorArithmetic =
  | "Addition"
  | "Division"
  | "Multiplication"
  | "Substraction";
type FunctionCode =
  | "MODULO"
  | "MAX"
  | "MIN"
  | "PARTIE_ENTIERE"
  | "PARTIE_DECIMALE"
  | "ARRONDI"
  | "ABS";

// Parameter types based on ValueType
type TypeToValue<T extends ValueType> = T extends "Boolean"
  ? boolean
  : T extends "Date"
  ? string
  : T extends "Float"
  ? number
  : T extends "Number"
  ? number
  : T extends "String"
  ? string
  : never;

// Function definition
interface FunctionDefinition {
  code: FunctionCode;
  paramFirst: unknown;
  paramSecond: unknown;
}

// Calculation step
interface CalculationStep {
  operatorArithmetic?: OperatorArithmetic;
  param: unknown;
}

// Parameter definitions
interface BaseParameter {
  entityType: EntityType;
  type: ValueType;
}

interface ConstantParameter<T extends ValueType> extends BaseParameter {
  entityType: "Constant";
  value: TypeToValue<T>;
}

interface VariableParameter extends BaseParameter {
  entityType: "Variable";
  variableName: string;
}

interface FunctionParameter extends BaseParameter {
  entityType: "Function";
  function: FunctionDefinition;
}

type Parameter =
  | ConstantParameter<ValueType>
  | VariableParameter
  | FunctionParameter;

// Step definitions
interface BaseStep {
  label: string;
  idStep?: string;
  type: StepType;
  description: string;
}

interface VariableStep extends BaseStep {
  type: "Variable";
  variableName: string;
  value: unknown; // Could be any value type
}

interface FunctionStep extends BaseStep {
  type: "Function";
  variableName: string;
  function: FunctionDefinition;
}

interface CalculationGroupStep extends BaseStep {
  type: "Calculation";
  calculs: CalculationStep[];
}
interface ConditionStep extends BaseStep {
  type: "Condition";
  condition: { left: unknown; operator: ConditionValues; right: unknown };
}

interface ReturnStep extends BaseStep {
  type: "Return";
  return: {
    entityType: EntityType;
    type: ValueType;
    value?: unknown;
    function?: FunctionDefinition;
    calculs?: CalculationStep[];
    variableName?: string;
  };
}

type Step =
  | VariableStep
  | FunctionStep
  | CalculationGroupStep
  | ReturnStep
  | ConditionStep;

// Counter definition
interface Counter {
  label: string;
  code: string;
  labelShort: string;
  periodicity: Periodicity;
  dateStartLimit?: Date;
  dateEndLimit?: Date;
  family?: string;
  onMonday?: boolean;
  onTuesday?: boolean;
  onWednesday?: boolean;
  onThursday?: boolean;
  onFriday?: boolean;
  onSaturday?: boolean;
  onSunday?: boolean;
  formulas: Step[];
}

// Root type
type CounterDefinition = Counter[];

// Type guard functions for runtime validation
const isValueType = (value: string): value is ValueType => {
  return ["Boolean", "Date", "Float", "Number", "String"].includes(value);
};

const isEntityType = (value: string): value is EntityType => {
  return ["Constant", "Calculation", "Function", "Variable"].includes(value);
};

const isStepType = (value: string): value is StepType => {
  return [
    "Condition",
    "Calculation",
    "Function",
    "Return",
    "Variable",
  ].includes(value);
};

const isPeriodicity = (value: string): value is Periodicity => {
  return ["Daily", "Weekly", "Monthly", "Yearly", "TODO_Calendar"].includes(
    value
  );
};
const isCalculationGroupStep = (step: Step): step is CalculationGroupStep => {
  return step.type === "Calculation";
};

export type {
  Counter,
  CounterDefinition,
  Step,
  Parameter,
  ValueType,
  EntityType,
  StepType,
  Periodicity,
  FunctionCode,
  FunctionDefinition,
  OperatorArithmetic,
  CalculationStep,
  CalculationGroupStep,
};

export {
  isValueType,
  isEntityType,
  isStepType,
  isPeriodicity,
  isCalculationGroupStep,
};
