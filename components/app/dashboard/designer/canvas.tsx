"use client";
import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import { cn } from "@/lib/utils";
import { DesignElements, DesignElementsImpl, ElementInstance } from "@/types/designer";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import DesignElementWrapper from "./design-element-wrapper";

function Canvas(){
    
    const { elements, addElement, removeElement, selectedElement, setSelectedElement } = useContextDesigner();
    const droppable = useDroppable({
        id: `canvas-drop-area`,
        data: {
            isCanvasDropArea: true,
        },
    });

    const { setNodeRef, isOver } = droppable;

useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
        const { active, over } = event;

        if(!active || !over) return;

        const type = active.data?.current?.type as DesignElements;
        const isDroppingOverArea = over?.data?.current?.isCanvasDropArea;
        const isDesignElement = active?.data?.current?.isDesignElement;
        const isDesignElementInstance = active?.data?.current?.isDesignElementInstance;
        const isOverDesignElementInstance = over?.data?.current?.isDesignElementInstance;

        if(isDroppingOverArea && isDesignElement) {
            const newElement = DesignElementsImpl[type as DesignElements].construct(
                uuidv4()
                );
                addElement(elements.length, newElement);
                return;
        }


        //second scenario: dragging avaliable design elements over a instance
        const isDroppingOverDesignElementTopHalf = over?.data?.current?.isDesignElementOnTop;
        const isDroppingOverDesignElementBottomHalf = over?.data?.current?.isDesignElementOnBottom;
        const isDroppingOverDesignElementInstance = isDroppingOverDesignElementTopHalf || isDroppingOverDesignElementBottomHalf;

        const isDroppingDesignElementOverDesignElementInstance = isDesignElement && isDroppingOverDesignElementInstance;

        if(isDroppingDesignElementOverDesignElementInstance){
            const newElement = DesignElementsImpl[type as DesignElements].construct(
                uuidv4()
                );

                const overId = over?.data?.current?.elementId;

                const overElementIndex = elements.findIndex((element) => element.id === overId
            );
            //handle unsuported behaviour
            if(overElementIndex == -1 && isDroppingOverArea)
                throw new Error("Element not found.");
            if(overElementIndex === -1 && !isDroppingOverArea) return;

            let indexForNewElement = overElementIndex;
            //assume you are dropping over botton
            if(isDroppingOverDesignElementBottomHalf) {
                indexForNewElement = overElementIndex +1;
            }
            addElement(indexForNewElement, newElement);
            return;
         }

         //thrid scenario draggin on instance over another instance
         const dragginDesignElementInstanceOverDesignElementInstance = 
         isDroppingOverDesignElementInstance && isDesignElementInstance;

         if (dragginDesignElementInstanceOverDesignElementInstance) {
            const activeId = active.data?.current?.elementId;
            const overId = over.data?.current?.elementId;

            const activeElementIndex = elements.findIndex(
                (element) => element.id === activeId
            );
            const overElementIndex = elements.findIndex(
                (element) => element.id === overId
            );
            if (activeElementIndex === -1 || overElementIndex === -1) {
                throw new Error("element not found");
            }

            const activeElement = {...elements[activeElementIndex]};
            removeElement(activeId);

            let indexForNewElement = overElementIndex;
            //assume you are dropping over bottom
            if (isDroppingOverDesignElementBottomHalf) {
                indexForNewElement = overElementIndex +1;
            }
            addElement(indexForNewElement, activeElement);
            return;
         }

                 //fourth scenario draggin instance over droparea
         const dragginDesignElementInstanceOverDroppingArea = isDesignElementInstance && isDroppingOverArea;

         if(dragginDesignElementInstanceOverDroppingArea) {
            const activeId = active.data?.current?.elementId;
            const activeElementIndex = elements.findIndex(
                (element) => element.id === activeId
            );
            
            if (activeElementIndex === -1) {
                throw new Error("element not found");
            }
            
            const activeElement = { ...elements[activeElementIndex]};
            removeElement(activeId);
            addElement(elements.length, activeElement);
            return;
         }

    }   
})

    return (
    <div className={cn(
        "flex flex-col items-center justify-start bg-accent h-[800px] w-full rounded-lg p-2 m-auto gap-2 overflow-y-auto",
        isOver && "ring-2 ring-primary"
        )}
    ref={setNodeRef}
    onClick={(e) => {
        e.stopPropagation();
        if(selectedElement) setSelectedElement((prev) => null)
    }}
    >
            {/* when canvas is empty */}

            {elements.length === 0 && !isOver && (
                 <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                 Drop Design Elements here</p>
            )}

            {/* normal flow for drop */}

            {elements.length > 0 && (
                <div className="flex flex-col w-full gap-2 p-4">
                    {elements.map((element) => (
                        <DesignElementWrapper key={element.id} element={element}/>
                    ))}
                    </div>
            )}

            {/* show overlay drop box position empty */}
    {isOver && elements.length === 0 && (
    <div className="p-4 w-full">
        <div className="flex items-center justify-center text-muted-foreground h-24 rounded-md bg-primary/20">
            Place here
         </div>
        </div>
        )}

            {/* show overlay drop box position filled */}

{isOver && elements.length > 0 && (
    <div className="p-4 w-full">
        <div className="flex items-center justify-center text-muted-foreground h-24 rounded-md bg-primary/20">
            Place here
         </div>
        </div>
        )}
        </div>
    );
}

export default Canvas;