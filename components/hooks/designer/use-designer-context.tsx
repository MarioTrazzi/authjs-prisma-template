"use client";

import { DesignerContext } from "@/components/context/designer/designer-context";
import { useContext } from "react";

function useContextDesigner() {
    const context = useContext(DesignerContext);

    if(!context) {
        throw new Error('useContextDesigner must be used within a DesignerContextProvider')
    };

    return context;
}

export default useContextDesigner;
