"use client";

import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import { DesignElements, DesignElementsImpl } from "@/types/designer";

function DesignElementProperties() {
    const { selectedElement } = useContextDesigner();
    if(!selectedElement) return null;
    const { type } = selectedElement;
    const PropertiesComponent = DesignElementsImpl[type as DesignElements].propertiesComponent;
    return <PropertiesComponent elementInstance={selectedElement} />

}

export default DesignElementProperties;