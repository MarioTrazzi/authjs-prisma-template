"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Element } from "@/types/designer";
import { useDraggable } from "@dnd-kit/core";

function DesignElement({ element }: { element: Element }) {

    const { label, icon: Icon } = element.designerButtonElement;
    const { type } = element;

    const draggable = useDraggable({
        id: `${type}-design-element`,
        data: {
            type: type,
            isDesignElement: true,
        },
    });
    const { setNodeRef, listeners, attributes, isDragging } = draggable;
    return <Button className={cn(
        "flex flex-col h-20 w-20 cursor-grab sm:w-24",
        isDragging && "ring-2 ring-secondary-foreground"
        )}
    variant={"default"}
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    >
        <Icon />
        {label}
    </Button>
}

export default DesignElement;   