"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { PolicyHolderSchema } from "@/zod-schema/policy-holder-schema";
import InputField from "@/components/fields/InputField";
import LocationSelector from "@/components/fields/location-selector";

type FormData = z.infer<typeof PolicyHolderSchema>;

export default function PolicyHolderForm() {
  // const [socialMediaProfiles, setSocialMediaProfiles] = useState([
  //   { platform: "facebook", url: "" },
  // ]);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(PolicyHolderSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("click");
    console.log(data);
    // Here you would typically send this data to your API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <InputField
        control={control}
        errors={errors}
        label="First Name"
        name="firstName"
      />
      <LocationSelector onSelect={(location) => console.log(location)} />
      {/* <div>
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} />
        {errors.address && (
          <p className="text-red-500">{errors.address.message}</p>
        )}
      </div> */}

      {/* <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <Label>Date of Birth</Label>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.dateOfBirth && (
          <p className="text-red-500">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div>
        <Label>Gender</Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
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
          )}
        />
        {errors.gender && (
          <p className="text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div>
        <Label>Emergency Contact</Label>
        <Input
          {...register("emergencyContact.name")}
          placeholder="Name"
          className="mt-1"
        />
        {errors.emergencyContact?.name && (
          <p className="text-red-500">{errors.emergencyContact.name.message}</p>
        )}
        <Input
          {...register("emergencyContact.relationship")}
          placeholder="Relationship"
          className="mt-1"
        />
        {errors.emergencyContact?.relationship && (
          <p className="text-red-500">
            {errors.emergencyContact.relationship.message}
          </p>
        )}
        <Input
          {...register("emergencyContact.phone")}
          placeholder="Phone"
          className="mt-1"
        />
        {errors.emergencyContact?.phone && (
          <p className="text-red-500">
            {errors.emergencyContact.phone.message}
          </p>
        )}
      </div>

      <div>
        <Label>Preferred Communication</Label>
        <Controller
          control={control}
          name="preferredCommunication"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select preferred communication" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="text">Text</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.preferredCommunication && (
          <p className="text-red-500">
            {errors.preferredCommunication.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="occupation">Occupation (optional)</Label>
        <Input id="occupation" {...register("occupation")} />
      </div>

      <div>
        <Label>Marital Status</Label>
        <Controller
          control={control}
          name="maritalStatus"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.maritalStatus && (
          <p className="text-red-500">{errors.maritalStatus.message}</p>
        )}
      </div>

      <div>
        <Label>Insurance Types</Label>
        <div className="mt-2">
          {insuranceTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                {...register("insuranceTypes")}
                value={type}
              />
              <Label htmlFor={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Label>
            </div>
          ))}
        </div>
        {errors.insuranceTypes && (
          <p className="text-red-500">{errors.insuranceTypes.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="memberId">Member ID</Label>
        <Input id="memberId" {...register("memberId")} />
        {errors.memberId && (
          <p className="text-red-500">{errors.memberId.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="consentToTerms" {...register("consentToTerms")} />
        <Label htmlFor="consentToTerms">
          I agree to the terms and conditions
        </Label>
      </div>
      {errors.consentToTerms && (
        <p className="text-red-500">{errors.consentToTerms.message}</p>
      )}

      <div>
        <Label>Payment Method (optional)</Label>
        <Controller
          control={control}
          name="paymentMethod"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="debit_card">Debit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div>
        <Label>Social Media Profiles (optional)</Label>
        {socialMediaProfiles.map((profile, index) => (
          <div key={index} className="mt-2 space-y-2">
            <Select
              onValueChange={(value) => {
                const newProfiles = [...socialMediaProfiles];
                newProfiles[index].platform = value as typeof profile.platform;
                setSocialMediaProfiles(newProfiles);
              }}
              value={profile.platform}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {socialMediaPlatforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Profile URL"
              value={profile.url}
              onChange={(e) => {
                const newProfiles = [...socialMediaProfiles];
                newProfiles[index].url = e.target.value;
                setSocialMediaProfiles(newProfiles);
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() =>
            setSocialMediaProfiles([
              ...socialMediaProfiles,
              { platform: "facebook", url: "" },
            ])
          }
        >
          Add Social Media Profile
        </Button>
      </div>

      <div>
        <Label htmlFor="notes">Notes (optional)</Label>
        <Input id="notes" {...register("notes")} />
      </div> */}

      <Button type="submit">Submit</Button>
    </form>
  );
}
