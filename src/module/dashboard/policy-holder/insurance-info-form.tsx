import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import InputField from "@/components/fields/InputField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const insuranceTypes = ["health", "life", "auto", "home", "disability"];
const paymentMethods = ["credit_card", "debit_card", "bank_transfer", "cash"]
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
            name={"insuranceTypes" as Path<T>}
            required={false}
          />
          <div className="space-y-2">
            <Label htmlFor={"insuranceTypes"} className="capitalize">
              Insurance Types
            </Label>

            <RadioGroup className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3" value={selectedType} onValueChange={setSelectedType}>
              {insuranceTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>  </div>
          <div className="space-y-2">
            <Label htmlFor="paymentMethods">Payment Methods</Label>
            <RadioGroup className="grid grid-cols-2 lg:grid-cols-3 gap-3"
            // value={selectedType} onValueChange={setSelectedType}
            >
              {paymentMethods.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsuranceInfoForm;
