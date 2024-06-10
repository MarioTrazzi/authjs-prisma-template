"use client";

import { publishPageContent } from "@/actions/designer";
import { Button } from "@/components/ui/button";
import { ArrowBigUpDash  } from "lucide-react";
import { useRouter } from "next/navigation";

interface DesignerPublishButtonProps {  
    id: number;
}

const DesignerPublishButton = ({ id }: DesignerPublishButtonProps) => {

    const router = useRouter()

    const publishPage = async () => {
        try {
            const newPublished = true;
            await publishPageContent(id, newPublished);
            //toast

            router.push(`/ecommer/${id}`)

        } catch(err){
            console.error(err);
            //toast
        }
    }

    return (
        <Button type="submit" onClick={publishPage}>
            <ArrowBigUpDash className="mr-2"/>Publish
        </Button>
    )
}

export default DesignerPublishButton;