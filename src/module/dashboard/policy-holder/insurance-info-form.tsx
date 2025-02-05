import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import InputField from "@/components/fields/InputField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const insuranceTypes = ["health", "life", "auto", "home", "disability"];
interface InsuranceInfoFormProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
}
const InsuranceInfoForm = <T extends FieldValues>({
  control,
  errors,
}: InsuranceInfoFormProps<T>) => {
  const [selectedType, setSelectedType] = useState("");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance Information</CardTitle>
      </CardHeader>
      <CardContent >
        <div className="space-y-4">
          <InputField
            control={control}
            errors={errors}
            label="Member ID"
            name={"memberId" as Path<T>}
            required={false}
          />
          <InputField
            control={control}
            errors={errors}
            label="Member ID"
            name={"insuranceTypes" as Path<T>}
            required={false}
          />
          <RadioGroup value={selectedType} onValueChange={setSelectedType}>
            {insuranceTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className="capitalize">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceInfoForm;
