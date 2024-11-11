import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FunctionDefinition } from "@/utils/types";

type FunctionConditionProps = {
  keyLabel: string;
  formulaIndex: number;
  variableName?: unknown;
  formulaFunction?: FunctionDefinition;
  onCodeChange: (value: string) => void;
  onParamFirstChange: React.ChangeEventHandler<HTMLInputElement>;
  onparamSecondChange: React.ChangeEventHandler<HTMLInputElement>;
  onVariableNameChange: React.ChangeEventHandler<HTMLInputElement>;
};
export default function FunctionCondition({
  keyLabel,
  formulaIndex,
  variableName,
  formulaFunction,
  onVariableNameChange,
  onCodeChange,
  onParamFirstChange,
  onparamSecondChange,
}: FunctionConditionProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={`${keyLabel}-variableName-${formulaIndex}`}>
          Variable Name
        </Label>
        <Input
          id={`${keyLabel}-variableName-${formulaIndex}`}
          value={variableName as string | number}
          onChange={onVariableNameChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${keyLabel}-function-code-${formulaIndex}`}>
          Function Code
        </Label>
        <Select value={formulaFunction?.code} onValueChange={onCodeChange}>
          <SelectTrigger id={`${keyLabel}-code-${formulaIndex}`}>
            <SelectValue placeholder="Select function" />
          </SelectTrigger>
          <SelectContent>
            {[
              "MODULO",
              "MAX",
              "MIN",
              "PARTIE_ENTIERE",
              "PARTIE_DECIMALE",
              "ARRONDI",
              "ABS",
            ].map((value) => (
              <SelectItem key={value} value={value}>
                {value.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${keyLabel}-paramFirst-${formulaIndex}`}>
          First Parameter
        </Label>
        <Input
          id={`${keyLabel}-function-paramFirst-${formulaIndex}`}
          value={formulaFunction?.paramFirst as number | string}
          onChange={onParamFirstChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${keyLabel}-paramSecond-${formulaIndex}`}>
          Second Parameter
        </Label>
        <Input
          id={`${keyLabel}-function-paramSecond-${formulaIndex}`}
          value={formulaFunction?.paramSecond as number | string}
          onChange={onparamSecondChange}
        />
      </div>
    </>
  );
}
