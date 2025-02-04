"use client";

import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface GeneralBtnProps {
  title: string;
  loader?: boolean;
  submit?: () => void;
  type?: "submit" | "button" | "reset";
}

export const GeneralBtn: React.FC<GeneralBtnProps> = ({
  title,
  loader = false,
  submit,
  type = "button",
}) => {
  return (
    <Button type={type} disabled={loader} {...(submit && { onClick: submit })}>
      {loader ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {title}
    </Button>
  );
};
