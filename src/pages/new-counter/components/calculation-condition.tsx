/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalculationStep } from "@/utils/types";
import { Minus, Plus } from "lucide-react";

type CalculationConditionProps = {
  formulaIndex: number;
  formulaCalculs?: CalculationStep[];
  addCalcul: (formulaIndex: number) => void;
  removeCalcul: (formulaIndex: number, calculIndex: number) => void;
  updateCalcul: (
    formulaIndex: number,
    calculIndex: number,
    field: keyof CalculationStep,
    value: any
  ) => void;
};

export default function CalculationCondition({
  formulaIndex,
  formulaCalculs,
  addCalcul,
  updateCalcul,
  removeCalcul,
}: CalculationConditionProps) {
  return (
    <>
      <div className="space-y-4">
        {formulaCalculs?.map((calcul, calculIndex) => (
          <div key={calculIndex} className="flex items-center space-x-2">
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
                  <SelectItem value="Substraction">-</SelectItem>
                  <SelectItem value="Multiplication">×</SelectItem>
                  <SelectItem value="Division">÷</SelectItem>
                </SelectContent>
              </Select>
            )}
            <Input
              value={calcul.param as string | number}
              onChange={(e) =>
                updateCalcul(formulaIndex, calculIndex, "param", e.target.value)
              }
              placeholder="Parameter"
            />
            <Button
              onClick={() => removeCalcul(formulaIndex, calculIndex)}
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
  );
}
