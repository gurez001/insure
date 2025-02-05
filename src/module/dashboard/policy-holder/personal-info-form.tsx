import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import InputField from "@/components/fields/InputField"
import SelectFields from "@/components/fields/select-field"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
const bloodGroup = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const gender = ["Male", "Female", "Other"];
const maritalStatuses = ["single", "married", "divorced", "widowed"]
const insuranceTypes = ["health", "life", "home", "auto"]
const paymentMethods = ["credit_card", "debit_card", "bank_transfer", "cash"]
// const socialMediaPlatforms = ["facebook", "twitter", "linkedin", "instagram"]
interface PersonalInfoProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>;
}
const PersonalInfoForm = <T extends FieldValues>({
  control,
  errors,
}: PersonalInfoProps<T>) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent >
        <div className="space-y-4">
          <InputField
            control={control}
            errors={errors}
            label="Nationality"
            name={"nationality" as Path<T>}
          />
          <RadioGroup
          //  value={selectedType} onValueChange={setSelectedType}
          >
            <Label htmlFor={"Gender"} className="capitalize">Gender</Label>
            {gender.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className="capitalize">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <RadioGroup
          //  value={selectedType} onValueChange={setSelectedType}
          >
            <Label htmlFor={"BloodType"} className="capitalize">Blood Type</Label>

            {bloodGroup.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className="capitalize">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <InputField
            control={control}
            errors={errors}
            label="Health Conditions"
            name={"healthConditions" as Path<T>}
          />
          <Checkbox id="disabilityStatus" />
          <Label style={{ margin: "0px !important" }} htmlFor="disabilityStatus">Disability Status</Label>

          <InputField
            control={control}
            errors={errors}
            label="Languages Spoken"
            name={"languagesSpoken" as Path<T>}
          />
          <InputField
            control={control}
            errors={errors}
            label="Hobbies"
            name={"hobbies" as Path<T>}
          />
          <InputField
            control={control}
            errors={errors}
            label="Emergency Contact Name"
            name={"emergencyContactname" as Path<T>}
          />
          <InputField
            control={control}
            errors={errors}
            label="Emergency Contact Relationship"
            name={"emergencyContact.relationship" as Path<T>}
          />
          <InputField
            control={control}
            errors={errors}
            label="Occupation"
            name={"occupation" as Path<T>}
          />
          <RadioGroup
          // value={selectedType} onValueChange={setSelectedType}
          >
            {maritalStatuses.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className="capitalize">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <RadioGroup
          // value={selectedType} onValueChange={setSelectedType}
          >
            {insuranceTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <RadioGroupItem value={type} id={type} />
                <Label htmlFor={type} className="capitalize">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <RadioGroup
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

          
          {/*      
      <FormField
        control={form.control}
        name="dateOfBirth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
          {/* <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
          <SelectFields
            control={control}
            errors={errors}
            label="Marital Status"
            name={"maritalStatus" as Path<T>}
            drop_down_selector={[
              { key: "single", value: "Single" },
              { key: "married", value: "Married" },
              { key: "divorced", value: "Divorced" },
              { key: "widowed", value: "Widowed" },
            ]}
          />

        </div>
      </CardContent >
    </Card>
  )
}

export default PersonalInfoForm