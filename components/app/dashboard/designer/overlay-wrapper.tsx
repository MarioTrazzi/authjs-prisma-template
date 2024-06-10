import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import { DesignElements, DesignElementsImpl } from "@/types/designer";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import DesignElementOverlay from "./design-element-overlay";
// this componnent handles and manage the overlay behaviour
function OverlayWrapper() {
    const { elements } = useContextDesigner();
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
    });

    const createOverlayForAvaliableElementOnDrag = () => {
        if(draggedItem){
            const type = draggedItem.data?.current?.type;
            return (
                <DesignElementOverlay
                 element={DesignElementsImpl[type as DesignElements]} 
                 />
            )
        }
    }

    const createOverlayForElementInstance = () => {
        if(draggedItem){
            const elementId = draggedItem.data?.current?.elementId;
            const element = elements.find((el) => el.id === elementId);
            if(!element)
                return <div>Element not found.</div>;

                const DesignerElemenentComponent = DesignElementsImpl[element.type].designerComponent;
                return (
                    <div className="flex border bg-zinc-900 ring-1 ring-primary rounded-md h-24 w-full py-2 px-4 opacity-90 pointer pointer-events-none">
                    <DesignerElemenentComponent elementInstance={element} />
                    </div>
                )
            }
    }

    let node: React.JSX.Element | undefined;

    if (!draggedItem) {
        return null;
    } else {
        const isDesignElement = draggedItem.data?.current?.isDesignElement;
        const isDesignElementInstance = 
        draggedItem.data?.current?.isDesignElementInstance;
        if (isDesignElement) { 
            node = createOverlayForAvaliableElementOnDrag();
        } else if(isDesignElementInstance){
            node = createOverlayForElementInstance();
        } else {
            null
        }
    }
    return <DragOverlay>{node}</DragOverlay>;
}

export default OverlayWrapper;