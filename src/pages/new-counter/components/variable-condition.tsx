import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VariableConditionProps = {
  keyLabel: string;
  formulaIndex: number;
  variableName?: unknown;
  value?: unknown;
  onValueChange: React.ChangeEventHandler<HTMLInputElement>;
  onVariableNameChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function VariableCondition({
  keyLabel,
  formulaIndex,
  value,
  variableName,
  onValueChange,
  onVariableNameChange,
}: VariableConditionProps) {
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
        <Label htmlFor={`${keyLabel}-value-${formulaIndex}`}>Value</Label>
        <Input
          id={`formula-value-${formulaIndex}`}
          value={value as string | number}
          onChange={onValueChange}
        />
      </div>
    </>
  );
}
