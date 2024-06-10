"use client";

import { DesignerContext } from '@/components/context/designer/designer-context';
import { ElementInstance } from '@/types/designer';
import { useState } from 'react';

function DesignerContextProvider({ children }: { children: React.ReactNode }) {
    const [elements, setElements] = useState<ElementInstance[]>([]);

    const [selectedElement, setSelectedElement] =
     useState<ElementInstance | null>(null);

    const addElement = (index: number, element: ElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        });
    };

    const removeElement = (id: string) => {
        setElements((prev) => {
            return prev.filter((element) => element.id !== id);
        });
    };

    const updateElement = (id: string, element: ElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            const index = newElements.findIndex((el) => el.id === id);
            newElements[index] = element;
            return newElements;
        });
    };


    return (
    <DesignerContext.Provider 
    value={{
        elements,
        setElements,
        addElement,
        removeElement,
        updateElement,
        selectedElement,
        setSelectedElement,
    }}
    >
        {children}
    </DesignerContext.Provider>
);
}

export default DesignerContextProvider;