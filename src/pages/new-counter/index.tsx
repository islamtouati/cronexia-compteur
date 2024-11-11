// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Plus, Minus, ArrowLeft, FlaskConical, SaveIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  CalculationStep,
  Counter,
  isCalculationGroupStep,
  Periodicity,
  Step,
  StepType,
} from "@/utils/types";
import FunctionCondition from "./components/function-condition";
import VariableCondition from "./components/variable-condition";
import CalculationCondition from "./components/calculation-condition";
import ResultModal from "./components/result-modal";
import { DatePicker } from "./components/date-picker";

export default function NewCounterPage() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState<Counter>({
    label: "",
    code: "",
    labelShort: "",
    periodicity: "Daily",
    dateStartLimit: "",
    dateEndLimit: "",
    family: "",
    onMonday: true,
    onTuesday: true,
    onWednesday: true,
    onThursday: true,
    onFriday: true,
    onSaturday: true,
    onSunday: true,
    formulas: [
      {
        label: "",
        type: "Variable",
        variableName: "",
        description: "",
        value: "",
        entityType: "Constant",
        valueType: "Number",
        function: {
          code: "",
          paramFirst: "",
          paramSecond: "",
        },
        calculs: [],
        condition: {
          left: "",
          operator: "Equal",
          right: "",
        },
        return: {
          entityType: "Constant",
          type: "Number",
          value: "",
        },
      },
    ],
  });
  const [isOpen, setIsOpen] = useState(false);

  const addFormula = () => {
    const newCounter = { ...counter };
    newCounter.formulas.push({
      label: "",
      type: "Variable",
      variableName: "",
      description: "",
      value: "",
      entityType: "Constant",
      valueType: "Number",
      function: {
        code: "",
        paramFirst: "",
        paramSecond: "",
      },
      calculs: [],
      condition: {
        left: "",
        operator: "Equal",
        right: "",
      },
      return: {
        entityType: "Constant",
        type: "Number",
        value: "",
      },
    });
    setCounter(newCounter);
  };

  const removeFormula = (formulaIndex: number) => {
    const newCounter = { ...counter };
    newCounter.formulas = newCounter.formulas.filter(
      (_, i) => i !== formulaIndex
    );
    setCounter(newCounter);
  };

  const updateCounter = <K extends keyof Counter>(
    field: K,
    value: Counter[K]
  ) => {
    setCounter((prevCounter) => ({
      ...prevCounter,
      [field]: value,
    }));
  };

  const updateFormula = <K extends keyof Step>(
    formulaIndex: number,
    field: K,
    value: Step[K]
  ) => {
    const newCounter = { ...counter };
    newCounter.formulas[formulaIndex] = {
      ...newCounter.formulas[formulaIndex],
      [field]: value,
    };
    setCounter(newCounter);
  };

  const addCalcul = (formulaIndex: number) => {
    const newCounter = { ...counter };
    const formula = newCounter.formulas[formulaIndex];

    if (isCalculationGroupStep(formula)) {
      formula.calculs = [
        ...formula.calculs,
        { param: "", operatorArithmetic: "Addition" },
      ];
    }

    setCounter(newCounter);
  };

  const removeCalcul = (formulaIndex: number, calculIndex: number) => {
    const newCounter = { ...counter };
    const formula = newCounter.formulas[formulaIndex];

    // Check if the formula is of type CalculationGroupStep
    if (isCalculationGroupStep(formula)) {
      formula.calculs = formula.calculs.filter((_, i) => i !== calculIndex);
    }

    setCounter(newCounter);
  };

  const updateCalcul = (
    formulaIndex: number,
    calculIndex: number,
    field: keyof CalculationStep, // Ensure field is a valid key of CalculationStep
    value: any
  ) => {
    const newCounter = { ...counter };
    const formula = newCounter.formulas[formulaIndex];

    // Check if the formula is of type CalculationGroupStep
    if (isCalculationGroupStep(formula)) {
      formula.calculs[calculIndex][field] = value;
    }

    setCounter(newCounter);
  };
  const addReturnCalcul = (formulaIndex: number) => {
    const newCounter = { ...counter };
    const formula = newCounter.formulas[formulaIndex];
    if (
      formula.type === "Return" &&
      formula.return.entityType === "Calculation"
    ) {
      formula.return.calculs = [
        ...(formula.return.calculs || []),
        { param: "", operatorArithmetic: "Addition" },
      ];

      setCounter(newCounter);
    }
  };

  const removeReturnCalcul = (formulaIndex: number, calculIndex: number) => {
    const newCounter = { ...counter };
    const formula = newCounter.formulas[formulaIndex];
    if (
      formula.type === "Return" &&
      formula.return.entityType === "Calculation"
    ) {
      formula.return.calculs = formula.return.calculs?.filter(
        (_, i) => i !== calculIndex
      );

      setCounter(newCounter);
    }
  };

  const updateReturnCalcul = (
    formulaIndex: number,
    calculIndex: number,
    field: keyof CalculationStep, // Ensure field is a valid key of CalculationStep
    value: any
  ) => {
    const newCounter = { ...counter };
    const formula = newCounter.formulas[formulaIndex];
    if (
      formula.type === "Return" &&
      formula.return.entityType === "Calculation"
    ) {
      if (formula.return.calculs)
        formula.return.calculs[calculIndex][field] = value;
      setCounter(newCounter);
    }
  };
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-start space-x-2 pb-7">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="space-y-1.5">
          <CardTitle className="text-2xl">Create new counter</CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure your counter calculation steps
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`counter-label`}>Label</Label>
              <Input
                id={`counter-label`}
                value={counter.label}
                onChange={(e) => updateCounter("label", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`counter-code`}>Code</Label>
              <Input
                id={`counter-code`}
                value={counter.code}
                onChange={(e) => updateCounter("code", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`counter-labelShort`}>Short Label</Label>
              <Input
                id={`counter-labelShort`}
                value={counter.labelShort}
                onChange={(e) => updateCounter("labelShort", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`counter-periodicity`}>Periodicity</Label>
              <Select
                value={counter.periodicity}
                onValueChange={(value) =>
                  updateCounter("periodicity", value as Periodicity)
                }
              >
                <SelectTrigger id={`counter-periodicity`}>
                  <SelectValue placeholder="Select periodicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                  <SelectItem value="Custom">
                    <div className="flex items-center gap-2">
                      <FlaskConical className="size-4" />
                      Custom
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {counter.periodicity === "Custom" && (
            <div className="grid grid-cols-2 gap-4">
              <DatePicker
                htmlFor="dateStartLimit"
                label="Start Date"
                value={counter.dateStartLimit ?? new Date()}
                onChange={(date) => updateCounter("dateStartLimit", date)}
              />
              <DatePicker
                htmlFor="dateEndLimit"
                label="End Date"
                value={counter.dateEndLimit}
                onChange={(date) => updateCounter("dateEndLimit", date)}
                fromDate={counter.dateStartLimit}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor={`counter-family`}>Family</Label>
            <Input
              id={`counter-family`}
              value={counter.family}
              onChange={(e) => updateCounter("family", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <div className="flex items-center space-x-2" key={day}>
                <Switch
                  id={`counter-on${day}`}
                  checked={counter[`on${day}` as keyof Counter] as boolean}
                  onCheckedChange={(checked) =>
                    updateCounter(`on${day}` as keyof Counter, checked)
                  }
                />
                <Label htmlFor={`counter-on${day}`}>On {day}</Label>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Formulas</h4>
              <Button onClick={() => addFormula()} variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Formula
              </Button>
            </div>
            {counter.formulas.map((formula, formulaIndex) => (
              <Card key={formulaIndex}>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`formula-label-${formulaIndex}`}>
                          Label
                        </Label>
                        <Input
                          id={`formula-label-${formulaIndex}`}
                          value={formula.label}
                          onChange={(e) =>
                            updateFormula(formulaIndex, "label", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`formula-type-${formulaIndex}`}>
                          Type
                        </Label>
                        <Select
                          value={formula.type}
                          onValueChange={(value) =>
                            updateFormula(
                              formulaIndex,
                              "type",
                              value as StepType
                            )
                          }
                        >
                          <SelectTrigger id={`formula-type-${formulaIndex}`}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Variable">Variable</SelectItem>
                            <SelectItem value="Condition">Condition</SelectItem>
                            <SelectItem value="Calculation">
                              Calculation
                            </SelectItem>
                            <SelectItem value="Function">Function</SelectItem>
                            <SelectItem value="Return">Return</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`formula-description-${formulaIndex}`}>
                        Description
                      </Label>
                      <Textarea
                        id={`formula-description-${formulaIndex}`}
                        value={formula.description}
                        onChange={(e) =>
                          updateFormula(
                            formulaIndex,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    {formula.type === "Variable" && (
                      <VariableCondition
                        keyLabel="formula"
                        value={formula.value}
                        formulaIndex={formulaIndex}
                        variableName={formula.variableName}
                        onValueChange={(e) =>
                          updateFormula(formulaIndex, "value", e.target.value)
                        }
                        onVariableNameChange={(e) =>
                          updateFormula(
                            formulaIndex,
                            "variableName",
                            e.target.value
                          )
                        }
                      />
                    )}

                    {formula.type === "Function" && (
                      <FunctionCondition
                        keyLabel="formula"
                        formulaFunction={formula.function}
                        formulaIndex={formulaIndex}
                        variableName={formula.variableName}
                        onCodeChange={(value) =>
                          updateFormula(formulaIndex, "function", {
                            ...formula.function,
                            code: value,
                          })
                        }
                        onParamFirstChange={(e) =>
                          updateFormula(formulaIndex, "function", {
                            ...formula.function,
                            paramFirst: e.target.value,
                          })
                        }
                        onparamSecondChange={(e) =>
                          updateFormula(formulaIndex, "function", {
                            ...formula.function,
                            paramSecond: e.target.value,
                          })
                        }
                        onVariableNameChange={(e) =>
                          updateFormula(
                            formulaIndex,
                            "variableName",
                            e.target.value
                          )
                        }
                      />
                    )}

                    {formula.type === "Calculation" && (
                      <CalculationCondition
                        formulaIndex={formulaIndex}
                        formulaCalculs={formula.calculs}
                        addCalcul={addCalcul}
                        updateCalcul={updateCalcul}
                        removeCalcul={removeCalcul}
                      />
                    )}

                    {formula.type === "Condition" && (
                      <>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-condition-left-${formulaIndex}`}
                          >
                            Left Operand
                          </Label>
                          <Input
                            id={`formula-condition-left-${formulaIndex}`}
                            value={formula.condition.left as string | number}
                            onChange={(e) =>
                              updateFormula(formulaIndex, "condition", {
                                ...formula.condition,
                                left: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-condition-operator-${formulaIndex}`}
                          >
                            Operator
                          </Label>
                          <Select
                            value={formula.condition.operator}
                            onValueChange={(value) =>
                              updateFormula(formulaIndex, "condition", {
                                ...formula.condition,
                                operator: value,
                              })
                            }
                          >
                            <SelectTrigger
                              id={`formula-condition-operator-${formulaIndex}`}
                            >
                              <SelectValue placeholder="Select operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Equal">Equal</SelectItem>
                              <SelectItem value="NotEqual">
                                Not Equal
                              </SelectItem>
                              <SelectItem value="GreaterThan">
                                Greater Than
                              </SelectItem>
                              <SelectItem value="LessThan">
                                Less Than
                              </SelectItem>
                              <SelectItem value="GreaterThanOrEqual">
                                Greater Than or Equal
                              </SelectItem>
                              <SelectItem value="LessThanOrEqual">
                                Less Than or Equal
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-condition-right-${formulaIndex}`}
                          >
                            Right Operand
                          </Label>
                          <Input
                            id={`formula-condition-right-${formulaIndex}`}
                            value={formula.condition.right as string | number}
                            onChange={(e) =>
                              updateFormula(formulaIndex, "condition", {
                                ...formula.condition,
                                right: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    )}

                    {formula.type === "Return" && (
                      <>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-return-entityType-${formulaIndex}`}
                          >
                            Entity Type
                          </Label>
                          <Select
                            value={formula.return.entityType}
                            onValueChange={(value) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                entityType: value,
                              })
                            }
                          >
                            <SelectTrigger
                              id={`formula-return-entityType-${formulaIndex}`}
                            >
                              <SelectValue placeholder="Select entity type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Constant">Constant</SelectItem>
                              <SelectItem value="Calculation">
                                Calculation
                              </SelectItem>
                              <SelectItem value="Function">Function</SelectItem>
                              <SelectItem value="Variable">Variable</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-return-type-${formulaIndex}`}
                          >
                            Return Type
                          </Label>
                          <Select
                            value={formula.return.type}
                            onValueChange={(value) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                type: value,
                              })
                            }
                          >
                            <SelectTrigger
                              id={`formula-return-type-${formulaIndex}`}
                            >
                              <SelectValue placeholder="Select return type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Boolean">Boolean</SelectItem>
                              <SelectItem value="Float">Float</SelectItem>
                              <SelectItem value="Number">Number</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {formula.return?.entityType === "Constant" && (
                          <Input
                            value={formula.return?.value as number | string}
                            onChange={(e) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                value: e.target.value,
                              })
                            }
                            placeholder="Constant value"
                          />
                        )}
                        {formula.return?.entityType === "Variable" && (
                          <VariableCondition
                            keyLabel="formula-return"
                            value={formula.return?.value}
                            formulaIndex={formulaIndex}
                            variableName={formula.return?.variableName}
                            onValueChange={(e) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                variableName: e.target.value,
                              })
                            }
                            onVariableNameChange={(e) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                variableName: e.target.value,
                              })
                            }
                          />
                        )}
                        {formula.return?.entityType === "Function" && (
                          <FunctionCondition
                            keyLabel="formula-return"
                            formulaFunction={formula.return.function}
                            formulaIndex={formulaIndex}
                            variableName={formula.return.variableName}
                            onCodeChange={(value) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                function: {
                                  ...formula.return.function,
                                  code: value,
                                },
                              })
                            }
                            onParamFirstChange={(e) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                function: {
                                  ...formula.return.function,
                                  paramFirst: e.target.value,
                                },
                              })
                            }
                            onparamSecondChange={(e) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                function: {
                                  ...formula.return.function,
                                  paramSecond: e.target.value,
                                },
                              })
                            }
                            onVariableNameChange={(e) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                variableName: e.target.value,
                              })
                            }
                          />
                        )}
                        {formula.return?.entityType === "Calculation" && (
                          <CalculationCondition
                            formulaIndex={formulaIndex}
                            formulaCalculs={formula.return.calculs}
                            addCalcul={addReturnCalcul}
                            updateCalcul={updateReturnCalcul}
                            removeCalcul={removeReturnCalcul}
                          />
                        )}
                      </>
                    )}
                  </div>
                  <Button
                    onClick={() => removeFormula(formulaIndex)}
                    variant="destructive"
                    size="sm"
                    className="mt-4"
                  >
                    <Minus className="mr-2 h-4 w-4" />
                    Remove Formula
                  </Button>
                </CardContent>
              </Card>
            ))}
            <div className="flex items-center justify-end">
              <Button
                onClick={() => setIsOpen(true)}
                variant="outline"
                size="sm"
              >
                <SaveIcon className="mr-2 h-4 w-4" />
                Submit the counter
              </Button>
              <ResultModal
                jsonData={counter}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Counter Data"
                description="This is the JSON representation of the counter data"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
