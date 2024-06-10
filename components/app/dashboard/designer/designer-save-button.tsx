"use client";

import { updatePageContent } from "@/actions/designer";
import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface DesignerSaveButtonProps {
    id: number;
}

const DesignerSaveButton = ({ id }: DesignerSaveButtonProps) => {

    const { elements } = useContextDesigner();

    const updatePage = async () => {
        try {
            const jsonContent = JSON.stringify(elements);
            await updatePageContent(id, jsonContent);
            //toast

        } catch(err){
            console.error(err);
            //toast
        }
    }

    return (
        <Button size={"sm"} onClick={updatePage}>
            <Save className="mr-2"/> Save
        </Button>
    )
}

export default DesignerSaveButton;