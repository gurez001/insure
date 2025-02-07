"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InputField from "@/components/fields/InputField";
import MultiSelectField from "@/components/fields/MultiSelectField";
import SelectFields from "@/components/fields/select-field";
import { CustomerSchema } from "@/zod-schema/customer-schema";
import { ImageItem } from "@/hooks/handleMediaDrop";
import { useState } from "react";
import FileUploader from "@/components/uploader/file-uploader";
// import  PersonalInfoForm  from "./personal-info-form";
type FormData = z.infer<typeof CustomerSchema>;
const insurancePaymentModes = [
  { key: "monthly", value: "Monthly" },
  { key: "quarterly", value: "Quarterly" },
  { key: "semi_annual", value: "Semi-Annual (Half-Yearly)" },
  { key: "annual", value: "Annual" },
  { key: "single_premium", value: "Single Premium" },
  { key: "pay_as_you_go", value: "Pay-As-You-Go" },
  { key: "lump_sum", value: "Lump Sum" },
  { key: "flexible", value: "Flexible Payment Plan" },
];


type ExtendedFormData = FormData & {
  addharCard: ImageItem[];
  panCard: ImageItem[];
  document: ImageItem[];
  profileImage: ImageItem[];
};

export default function CustomerForm() {
  const [addharCard, set_AddharCard] = useState<ImageItem[]>([]);
  const [panCard, set_PanCard] = useState<ImageItem[]>([]);
  const [document, set_Document] = useState<ImageItem[]>([]);
  const [profileImage, set_ProfileImage] = useState<ImageItem[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(CustomerSchema),
  });

  const onSubmit = (data: FormData) => {

    const updatedData: ExtendedFormData = { ...data, addharCard, panCard, document, profileImage }
    console.log(updatedData);

    // Here you would typically send this data to your API
  };

  return (<>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="block md:flex gap-4 ">
        <Card className="w-[100%] md:w-[70%]">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <InputField
              control={control}
              errors={errors}
              label="Full name"
              name={"fullname"}
            />
            <InputField
              control={control}
              errors={errors}
              label="Policy no"
              name={"policy_no"}
            />
            <InputField
              control={control}
              errors={errors}
              label="Phone"
              name={"phone"}
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              label="Date of policy"
              name={"dop"}
              type="date"
            />
            <InputField
              control={control}
              errors={errors}
              label="Date of renewal"
              name={"dor"}
              type="date"
            />
            <InputField
              control={control}
              errors={errors}
              label="Issue policy Year"
              name={"issue_policy_year"}
              type="date"
            />
            <InputField
              control={control}
              errors={errors}
              label="S.I."
              name={"si"}
            />
            <InputField
              control={control}
              errors={errors}
              label="Amount"
              name={"amount"}
              type="number"
            />
            <InputField
              control={control}
              errors={errors}
              label="Email"
              name={"email"}
              type="email"
            />
            <MultiSelectField
              control={control}
              errors={errors}
              label="Category"
              name={"category"}
            />
            <SelectFields
              control={control}
              errors={errors}
              label="Health Conditions"
              name={"healthConditions"}
              drop_down_selector={insurancePaymentModes}
            />
          </CardContent>
        </Card>
        <div className="mt-4 md:mt-0 w-[100%] md:w-[30%] space-y-4">

          <FileUploader
            title="Customer Profile Photo"
            field="image"
            set_files={set_ProfileImage}
          />
          <FileUploader
            title="Addhar Card Photo"
            field="image"
            set_files={set_AddharCard}
          />
          <FileUploader
            title="Pan Card"
            field="image"
            set_files={set_PanCard}
          />
          <FileUploader
            title="Insurance Document PDF"
            field="application/pdf"
            set_files={set_Document}
          />
        </div>
      </div>
      <Button type="submit">Submit</Button>
    </form>

  </>
  );
}
