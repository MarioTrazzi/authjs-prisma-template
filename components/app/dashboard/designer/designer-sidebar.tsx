"use client"

import { DesignElementsImpl } from "@/types/designer";
import DesignElement from "./design-element";
import { Separator } from "@/components/ui/separator";
import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import DesignElementProperties from "./design-element-properties";

function DesignerSidebar(){
    const { selectedElement } = useContextDesigner();
    return (
        <div 
        className="bg-accent h-[800px] w-1/3 p-2 sm:p-4 rounded-lg"
        >
            {selectedElement && <DesignElementProperties />}
            {!selectedElement && (
            <div>
            <h1>Design Elements</h1>
            <Separator className="border border-muted-foreground my-4 col-span-1 lg:col-span-2" />
            <div className="p-4 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 justify-center items-center gap-4">
            <DesignElement element={DesignElementsImpl.NavbarElement} />
            <DesignElement element={DesignElementsImpl.Heading1Element} />
            <DesignElement element={DesignElementsImpl.Paragraph1Element} />
            </div>
        </div>

            )}
            </div>
    )   
}

export default DesignerSidebar; 