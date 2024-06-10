"use client"

import { Page } from "@prisma/client";
import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import { DesignElementsImpl } from "@/types/designer";
import { useEffect, useState } from "react";

function PublishedDesigner({ page } : { page: Page }) {

    const [isReady, setIsReady] = useState(false);

    const { elements, setElements} = useContextDesigner()

    const { name, id , content, published } = page;

    useEffect(() => {
        if(isReady) return;
        const elements = JSON.parse(content);
        setElements((prev) => elements);
        setIsReady((prev) => true)
    }, [content, setElements, isReady])


    return (
        <div className="flex flex-col flex-grow rounded-lg overflow-y-auto">
        {
            elements.map((el) => {
                const PreviewComponent = DesignElementsImpl[el.type].previewComponent;
                return <PreviewComponent elementInstance={el} key={el.id} />
            })
        }
    </div>    )
}

export default PublishedDesigner;