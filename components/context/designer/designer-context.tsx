"use client";

import { ElementInstance } from "@/types/designer";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type context = {
    elements: ElementInstance[];
    setElements: Dispatch<SetStateAction<ElementInstance[]>>;

    addElement: (index: number, element: ElementInstance) => void;
    removeElement: (index: string) => void;

    selectedElement: ElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<ElementInstance | null>>;

    updateElement: (id: string, element: ElementInstance) => void;
};

export const DesignerContext = createContext<context | null>(null)

