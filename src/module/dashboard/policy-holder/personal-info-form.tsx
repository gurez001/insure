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
          <div className="space-y-2">
            <Label htmlFor={"Gender"} className="capitalize">Gender</Label>
            <RadioGroup className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
            //  value={selectedType} onValueChange={setSelectedType}
            >
              {gender.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor={"BloodType"} className="capitalize">Blood Type</Label>
            <RadioGroup className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
            //  value={selectedType} onValueChange={setSelectedType}
            >

              {bloodGroup.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="capitalize">
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <InputField
            control={control}
            errors={errors}
            label="Health Conditions"
            name={"healthConditions" as Path<T>}
          />
          <div className="flex gap-2 items-center">
            <Checkbox id="disabilityStatus" />
            <Label style={{ margin: "0px !important" }} htmlFor="disabilityStatus">Disability Status</Label>
          </div>
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
       <div className="space-y-2">
            <Label htmlFor="maritalStatus">Marital Status</Label>

            <RadioGroup className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
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
            </RadioGroup></div>
          

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