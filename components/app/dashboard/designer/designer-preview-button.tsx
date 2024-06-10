"use client"

import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DesignElementsImpl } from "@/types/designer";
import { ScanEye } from "lucide-react";

function DesignerPreviewButton() {
    const { elements } = useContextDesigner();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="" size={"sm"}>
                    <ScanEye className="mr-2" /> Preview
                </Button>
            </DialogTrigger>
            <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0 bg-[/bg-designer.svg] dark:bg-[/bg-designer-dark.svg]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-center m-2 p-2">
                        Preview Mode
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col flex-grow m-6 rounded-lg overflow-y-auto bg-accent">
                    {
                        elements.map((el) => {
                            const PreviewComponent = DesignElementsImpl[el.type].previewComponent;
                            return <PreviewComponent elementInstance={el} key={el.id} />
                        })
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DesignerPreviewButton;