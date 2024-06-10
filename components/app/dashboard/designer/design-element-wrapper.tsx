"use client";

import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  DesignElementsImpl,
  ElementInstance,
  DesignElements,
} from "@/types/designer";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { XSquare } from "lucide-react";
import { useState } from "react";

function DesignElementWrapper({ element }: { element: ElementInstance }) {

  const { setSelectedElement, removeElement } = useContextDesigner()
  const { id, type, boxHeight } = element;

  const [isMouseOver, setIsMouseOver] = useState<boolean | null>(false);

  const draggable = useDraggable({
    id: `${id}-drag-handler`,
    data: {
      type,
      elementId: id,
      isDesignElementInstance: true,
    },
  });

  const {
    setNodeRef: draggableSetNodeRef,
    listeners,
    attributes,
    isDragging,
  } = draggable;

    const bottomHalfDrop = useDroppable({
        id: `${id}-bottom`,
        data: {
            type,
            elementId: id,
            isDesignElementOnBottom: true,
        }
    })

    const { setNodeRef: setNodeRefBottomHalfDrop, isOver: isOverBottomHalf } = bottomHalfDrop;

    const topHalfDrop = useDroppable({
        id: `${id}-top`,
        data: {
            type,
            elementId: id,
            isDesignElementOnTop: true,
        }
    })

    const { setNodeRef: setNodeRefTopHalfDrop, isOver: isOverTopHalf } = topHalfDrop;

   if(isDragging) return null;

  const DesignElement =
    DesignElementsImpl[type as DesignElements].designerComponent;

  return (
    <div
      className={cn(
        "relative w-full flex flex-col text-foreground hover:cursor-pointer rounded-lg ring-1 ring-primary ring-inset"
      )}
      ref={draggableSetNodeRef}
      {...listeners}
      {...attributes}
      onMouseOver={() => setIsMouseOver((prev) => true)}
      onMouseLeave={() => setIsMouseOver((prev) => false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
        <div 
        ref={setNodeRefTopHalfDrop}
        className="absolute w-full top-0 h-1/2 rounded-t-md"
        />
        {isOverTopHalf && (
          <div className="absolute top-0 w-full animate-pulse rounded-md h-[4px] bg-primary rounded-b-none"></div>
        )}
        <div 
        ref={setNodeRefBottomHalfDrop}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
        />
        {isMouseOver && (
          <>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
            </div>
            <div className="absolute bottom-0 right-0 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">{JSON.stringify(element.type)}</p>
            </div>
            <Button 
            className="absolute right-1 top-1 border rounded-lg hover:bg-red-900 w-6 h-6"
            variant={"ghost"}
            size={"icon"}
            onClick={(e) => {
              e.stopPropagation();
              removeElement(element.id);
              setSelectedElement((prev) => null);
            }}
            >
              <XSquare stroke="gray" strokeWidth={1} fill="none" />
            </Button>
            </>
        )}
      <div className={cn("flex w-full rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100 ", boxHeight)}>
      <DesignElement elementInstance={element}/>
      </div>
      {isOverBottomHalf && (
          <div className="absolute bottom-0 w-full rounded-md h-[4px] bg-primary rounded-b-none animate-pulse "></div>
        )}
    </div>
  );
}

export default DesignElementWrapper;
