"use client";

import Drag_input_field from "@/components/image_compress/Drag_input_field";
import Server_image_card from "@/components/image_compress/Server_image_card";
import React, { useEffect, useState, useCallback } from "react";
import Image_card from "@/components/image_compress/Image_card";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    invoice_files: File[];
    set_invoice_Files: (invoice_files: File[]) => void;
    doket_files: File[];
    set_doket_Files: (doket_files: File[]) => void;
    addharCard: File[];
    set_addharCard: (addharCard: File[]) => void;
    data: Record<string, any>;
}

interface FileItem {
    img: string;
    name: string;
}

interface DataItem {
    path: string;
    originalname: string;
}

export const Form_sidebar: React.FC<SidebarProps> = ({
    invoice_files,
    set_invoice_Files,
    doket_files,
    set_doket_Files,
    addharCard,
    set_addharCard,
    data,
}) => {
    const { toast } = useToast();

    const [items, setItems] = useState<{ invoice: FileItem[]; doket: FileItem[]; image: FileItem[] }>({
        invoice: [],
        doket: [],
        image: [],
    });

    const [field_visible, set_field_visible] = useState<boolean[]>([false, false, false]);
    const [item_visible, set_item_visible] = useState<boolean[]>([false, false, false]);


    const handleDelete = (index: number, type: "invoice" | "doket" | "image") => {
        setItems((prev) => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index),
        }));
    };

    const View_file_handler = (item: { img?: string; path?: string }) => {
        if (item.img) {
            window.open(item.img, "_blank");
        } else if (item.path) {
            window.open(item.path, "_blank");
        }
    };

    useEffect(() => {
        set_field_visible([
            items.invoice.length > 0,
            items.doket.length > 0,
            items.image.length > 0,
        ]);
    }, [items]);

    useEffect(() => {
        set_item_visible([
            Boolean(data?.invoice_id?.length),
            Boolean(data?.doket_id?.length),
            Boolean(data?.image_id?.length),
        ]);
    }, [data]);

    const toggleVisibility = (index: number) => {
        set_item_visible((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    const renderFileSection = (
        field: "invoice" | "doket" | "image",
        index: number,
        files: FileItem[],
        dataKey: string
    ) => (
        <Card className="mt-4">
            <CardContent>
                <p className="my-4">{`${field.charAt(0).toUpperCase() + field.slice(1)} Upload`}</p>
                {field_visible[index] ? (
                    <div className="flex w-full flex-wrap gap-2">
                        {files.map((item, idx) => (
                            <div key={idx} className="w-full">
                                <Image_card item={item} index={idx} onDelete={() => handleDelete(idx, field)} />
                                <Button className="bg-black mt-2 text-white" onClick={() => View_file_handler(item)}>
                                    View {field === "image" ? "Image" : "PDF"}
                                </Button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div>
                            {item_visible[index] ? (
                                <div className="flex w-full flex-wrap gap-2">
                                    {data?.[dataKey]?.map((item: DataItem, i: number) => (
                                        <div key={i} className="w-full">
                                            <Server_image_card src={item.path} alt={item.originalname} width={200} height={200} />
                                            <Button className="bg-black mt-2 text-white" onClick={() => View_file_handler(item)}>
                                                View
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Drag_input_field onDrop={(data) => handleDrop(data, field)} type={field === "image" ? "image/*" : "application/pdf"} />
                            )}
                        </div>
                        <Button className="bg-black mt-2 text-white" onClick={() => toggleVisibility(index)}>
                            {item_visible[index] ? `Upload ${field}` : `View ${field}`}
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );

    return (
        <div className="w-full p-4">
            {renderFileSection("invoice", 0, items.invoice, "invoice_id")}
            {renderFileSection("doket", 1, items.doket, "doket_id")}
            {renderFileSection("image", 2, items.image, "image_id")}
        </div>
    );
};
