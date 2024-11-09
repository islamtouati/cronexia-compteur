// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Plus, Minus, ArrowLeft } from "lucide-react";

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
import { Counter } from "@/utils/types";

// const formSchema = z.object({
//   label: z.string().min(2, {
//     message: "label must be at least 2 characters.",
//   }),
// });

export default function NewCounterPage() {
  const navigate = useNavigate();
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       label: "",
  //     },
  //   });
  //   function onSubmit(values: z.infer<typeof formSchema>) {
  //     // Do something with the form values.
  //     // ✅ This will be type-safe and validated.
  //     console.log(values);
  //   }
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

  const updateCounter = (field: string, value: any) => {
    const newCounter = { ...counter };
    newCounter[field] = value;
    setCounter(newCounter);
  };

  const updateFormula = (formulaIndex: number, field: string, value: any) => {
    const newCounter = { ...counter };
    newCounter.formulas[formulaIndex][field] = value;
    setCounter(newCounter);
  };

  const addCalcul = (formulaIndex: number) => {
    const newCounter = { ...counter };
    newCounter.formulas[formulaIndex].calculs.push({
      param: "",
      operatorArithmetic: "Addition",
    });
    setCounter(newCounter);
  };

  const removeCalcul = (formulaIndex: number, calculIndex: number) => {
    const newCounter = { ...counter };
    newCounter.formulas[formulaIndex].calculs = newCounter.formulas[
      formulaIndex
    ].calculs.filter((_, i) => i !== calculIndex);
    setCounter(newCounter);
  };

  const updateCalcul = (
    formulaIndex: number,
    calculIndex: number,
    field: string,
    value: any
  ) => {
    const newCounter = { ...counter };
    newCounter.formulas[formulaIndex].calculs[calculIndex][field] = value;
    setCounter(newCounter);
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
                onValueChange={(value) => updateCounter("periodicity", value)}
              >
                <SelectTrigger id={`counter-periodicity`}>
                  <SelectValue placeholder="Select periodicity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`counter-dateStartLimit`}>Start Date</Label>
              <Input
                id={`counter-dateStartLimit`}
                type="date"
                value={counter.dateStartLimit}
                onChange={(e) =>
                  updateCounter("dateStartLimit", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`counter-dateEndLimit`}>End Date</Label>
              <Input
                id={`counter-dateEndLimit`}
                type="date"
                value={counter.dateEndLimit}
                onChange={(e) => updateCounter("dateEndLimit", e.target.value)}
              />
            </div>
          </div>
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
                  checked={counter[`on${day}`]}
                  onCheckedChange={(checked) =>
                    updateCounter(`on${day}`, checked)
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
                            updateFormula(formulaIndex, "type", value)
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
                      <Label htmlFor={`formula-variableName-${formulaIndex}`}>
                        Variable Name
                      </Label>
                      <Input
                        id={`formula-variableName-${formulaIndex}`}
                        value={formula.variableName}
                        onChange={(e) =>
                          updateFormula(
                            formulaIndex,
                            "variableName",
                            e.target.value
                          )
                        }
                      />
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
                      <>
                        <div className="space-y-2">
                          <Label htmlFor={`formula-entityType-${formulaIndex}`}>
                            Entity Type
                          </Label>
                          <Select
                            value={formula.entityType}
                            onValueChange={(value) =>
                              updateFormula(formulaIndex, "entityType", value)
                            }
                          >
                            <SelectTrigger
                              id={`formula-entityType-${formulaIndex}`}
                            >
                              <SelectValue placeholder="Select entity type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Constant">Constant</SelectItem>
                              <SelectItem value="Variable">Variable</SelectItem>
                              <SelectItem value="Function">Function</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`formula-valueType-${formulaIndex}`}>
                            Value Type
                          </Label>
                          <Select
                            value={formula.valueType}
                            onValueChange={(value) =>
                              updateFormula(formulaIndex, "valueType", value)
                            }
                          >
                            <SelectTrigger
                              id={`formula-valueType-${formulaIndex}`}
                            >
                              <SelectValue placeholder="Select value type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Boolean">Boolean</SelectItem>
                              <SelectItem value="Date">Date</SelectItem>
                              <SelectItem value="Float">Float</SelectItem>
                              <SelectItem value="Number">Number</SelectItem>
                              <SelectItem value="String">String</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`formula-value-${formulaIndex}`}>
                            Value
                          </Label>
                          <Input
                            id={`formula-value-${formulaIndex}`}
                            value={formula.value}
                            onChange={(e) =>
                              updateFormula(
                                formulaIndex,
                                "value",
                                e.target.value
                              )
                            }
                            type={
                              formula.valueType === "Date" ? "date" : "text"
                            }
                          />
                        </div>
                      </>
                    )}

                    {formula.type === "Function" && (
                      <>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-function-code-${formulaIndex}`}
                          >
                            Function Code
                          </Label>
                          <Select
                            value={formula.function.code}
                            onValueChange={(value) =>
                              updateFormula(formulaIndex, "function", {
                                ...formula.function,
                                code: value,
                              })
                            }
                          >
                            <SelectTrigger
                              id={`formula-function-code-${formulaIndex}`}
                            >
                              <SelectValue placeholder="Select function" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="MODULO">MODULO</SelectItem>
                              <SelectItem value="MAX">MAX</SelectItem>
                              <SelectItem value="MIN">MIN</SelectItem>
                              <SelectItem value="PARTIE_ENTIERE">
                                PARTIE_ENTIERE
                              </SelectItem>
                              <SelectItem value="PARTIE_DECIMALE">
                                PARTIE_DECIMALE
                              </SelectItem>
                              <SelectItem value="ARRONDI">ARRONDI</SelectItem>
                              <SelectItem value="ABS">ABS</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-function-paramFirst-${formulaIndex}`}
                          >
                            First Parameter
                          </Label>
                          <Input
                            id={`formula-function-paramFirst-${formulaIndex}`}
                            value={formula.function.paramFirst}
                            onChange={(e) =>
                              updateFormula(formulaIndex, "function", {
                                ...formula.function,
                                paramFirst: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-function-paramSecond-${formulaIndex}`}
                          >
                            Second Parameter
                          </Label>
                          <Input
                            id={`formula-function-paramSecond-${formulaIndex}`}
                            value={formula.function.paramSecond}
                            onChange={(e) =>
                              updateFormula(formulaIndex, "function", {
                                ...formula.function,
                                paramSecond: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    )}

                    {formula.type === "Calculation" && (
                      <>
                        <div className="space-y-4">
                          {formula.calculs.map((calcul, calculIndex) => (
                            <div
                              key={calculIndex}
                              className="flex items-center space-x-2"
                            >
                              {calculIndex > 0 && (
                                <Select
                                  value={calcul.operatorArithmetic}
                                  onValueChange={(value) =>
                                    updateCalcul(
                                      formulaIndex,
                                      calculIndex,
                                      "operatorArithmetic",
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Operator" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Addition">+</SelectItem>
                                    <SelectItem value="Substraction">
                                      -
                                    </SelectItem>
                                    <SelectItem value="Multiplication">
                                      ×
                                    </SelectItem>
                                    <SelectItem value="Division">÷</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                              <Input
                                value={calcul.param}
                                onChange={(e) =>
                                  updateCalcul(
                                    formulaIndex,
                                    calculIndex,
                                    "param",
                                    e.target.value
                                  )
                                }
                                placeholder="Parameter"
                              />
                              <Button
                                onClick={() =>
                                  removeCalcul(formulaIndex, calculIndex)
                                }
                                variant="destructive"
                                size="icon"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            onClick={() => addCalcul(formulaIndex)}
                            variant="outline"
                            size="sm"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Calculation Step
                          </Button>
                        </div>
                      </>
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
                            value={formula.condition.left}
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
                            value={formula.condition.right}
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
                        <div className="space-y-2">
                          <Label
                            htmlFor={`formula-return-value-${formulaIndex}`}
                          >
                            Return Value
                          </Label>
                          <Input
                            id={`formula-return-value-${formulaIndex}`}
                            value={formula.return.value}
                            onChange={(e) =>
                              updateFormula(formulaIndex, "return", {
                                ...formula.return,
                                value: e.target.value,
                              })
                            }
                          />
                        </div>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
