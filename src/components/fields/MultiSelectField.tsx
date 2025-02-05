import React, { useState } from "react";
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { ChevronsUpDown, X } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"
import { Button } from "../ui/button";


interface MultiSelectFieldProps<T extends FieldValues> {
    control: Control<T>;
    errors?: FieldErrors<T>;
    name: Path<T>;
    label: string;
}

const healthConditionsList = [
    { id: "diabetes", name: "Diabetes" },
    { id: "hypertension", name: "Hypertension" },
    { id: "heart_disease", name: "Heart Disease" },
    { id: "asthma", name: "Asthma" },
    { id: "cancer", name: "Cancer" },
    { id: "arthritis", name: "Arthritis" },
    { id: "kidney_disease", name: "Kidney Disease" },
    { id: "liver_disease", name: "Liver Disease" },
    { id: "thyroid_disorders", name: "Thyroid Disorders" },
    { id: "depression", name: "Depression" },
    { id: "anxiety", name: "Anxiety" },
    { id: "epilepsy", name: "Epilepsy" },
    { id: "alzheimers", name: "Alzheimer's" },
    { id: "parkinsons", name: "Parkinson's" },
    { id: "hiv_aids", name: "HIV/AIDS" },
    { id: "chronic_pain", name: "Chronic Pain" },
    { id: "obesity", name: "Obesity" },
    { id: "stroke", name: "Stroke" },
];

const MultiSelectField = <T extends FieldValues>({
    control,
    errors,
    name,
    label,
}: MultiSelectFieldProps<T>) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false)
    const [select,setSelect ]=useState([])
    return (
        <div className="space-y-2">
            <Label className="capitalize">{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {/* {healthConditionsList.find((item) => ("isoCode" in item ? item.isoCode : item.name) === value)?.name : placeholder} */}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <div className="p-2">
                        <Input placeholder={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-2" />
                        <ScrollArea className="h-[200px]">
                            {healthConditionsList
                                .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((item) => (
                                    <Button
                                        key={("key" in item ? item.id : item.name) as string}
                                        variant="ghost"
                                        className="w-full justify-start"
                                    //  onClick={() => {
                                    //    onSelect(item)
                                    //    setOpen(false)
                                    //  }}
                                    >
                                        {/* <Check
       className={cn(
         "mr-2 h-4 w-4",
         value === ("isoCode" in item ? item.isoCode : item.name) ? "opacity-100" : "opacity-0",
       )}
     /> */}
                                        {item.name}
                                    </Button>
                                ))}
                        </ScrollArea>
                    </div>
                </PopoverContent></Popover>


            {/* Error Message */}
            {errors && errors[name] && (
                <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
            )}
        </div>
    );
};

export default MultiSelectField;
