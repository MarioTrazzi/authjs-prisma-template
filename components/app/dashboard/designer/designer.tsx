"use client"

import Canvas from "@/components/app/dashboard/designer/canvas";
import DesignerSidebar from "@/components/app/dashboard/designer/designer-sidebar";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { useEffect, useId, useState } from "react";
import OverlayWrapper from "./overlay-wrapper";
import DesignerPreviewButton from "./designer-preview-button";
import { Page } from "@prisma/client";
import DesignerSaveButton from "./designer-save-button";
import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import DesignerPublishButton from "./designer-publish-button";

function Designer({ page } : { page: Page }) {

    const [isReady, setIsReady] = useState(false);

    const { name, id , content, published } = page;

    const { elements, setElements} = useContextDesigner()

    const dndContextId = useId();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10, //10px
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5,
        },
    });

    useEffect(() => {
        if(isReady) return;
        const elements = JSON.parse(content);
        setElements((prev) => elements);
        setIsReady((prev) => true)
    }, [content, setElements, isReady])

    const sensors = useSensors(mouseSensor, touchSensor)

    if(!isReady) return;

    return (
        <div className="flex flex-col flex-grow p-4 border-[0.5px] border-accent bg-[url(/bg-designer.svg)] dark:bg-[url(/bg-designer-dark.svg)] w-full">
            <div className="flex items-center justify-between border mb-2 p-2 bg-accent space-x-2">
                <div></div>
                <span className="px-6 py-2 bg-zinc-200/50 dark:bg-zinc-700/50 rounded-md">
                    Page: {name} {published && " - Form Published"}
                </span>
                <div className="space-x-2">
                <DesignerPublishButton id={id}/>
                    <DesignerPreviewButton />
                    <DesignerSaveButton id={id}/>
                </div>
            </div>
            <div className="flex h-full w-full gap-8">
                <DndContext id={dndContextId} sensors={sensors}>
                    <Canvas />
                    <DesignerSidebar />
                    <OverlayWrapper />    
                    </ DndContext>             
                </div>
        </div>
    )
}

export default Designer;