import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Element } from "@/types/designer";

function DesignElementOverlay({element}:{element: Element}) {
    const { label, icon: Icon} = element.designerButtonElement;

    return (
        <Button
        variant={"default"}
        className={cn(
            "flex flex-col m-8 h-24 cursor-grab ring-2 ring-secondary-foreground")}
        >
            <Icon />
            {label}
        </Button>
    )
}

export default DesignElementOverlay;