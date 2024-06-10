import { AlignJustify, XSquare } from "lucide-react";
import { DesignElements, Element, ElementInstance } from "..";
import { Label } from "@/components/ui/label";
import useContextDesigner from "@/components/hooks/designer/use-designer-context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


const type: DesignElements = "Paragraph1Element";
const boxHeight = "h-24";
const customAttributes = {
    text: "Paragraph Element",
};

export const Paragraph1DesignElement: Element = {
    type,
    construct: (id: string) => ({  
        id,
        type,
        boxHeight,
        customAttributes,
    }),
    designerButtonElement: {
        icon: AlignJustify,
        label: "Paragraph 1",
        tooltip: "Add a Paragraph 1 Element",
    },

    designerComponent: DesignerComponent,
    propertiesComponent: PropertiesComponent,
    previewComponent: PreviewComponent,
    renderComponent: RenderComponent,
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: ElementInstance
}) {
    const element = elementInstance as ElementInstance;
    const { text } = element.customAttributes;
    return <div className="flex flex-col gap-2 w-full items-center p-6">
        <p className="mb-8 flex text-center text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 animate-pulse">
        {text.length > 100 ? text.substring(0,100) + "...": text}
							</p>
    </div>;
}

function PreviewComponent({
    elementInstance,
} : {
    elementInstance: ElementInstance
}) {
    const element = elementInstance as ElementInstance;

    const { text } = element.customAttributes;
    return (
        <p className="mb-8 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {text}
    </p>
    );
}

function RenderComponent({
    elementInstance,
} : {
    elementInstance: ElementInstance
}) {
    const element = elementInstance as ElementInstance;

    const { text } = element.customAttributes;
    return (
        <p className="mb-8 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        {text}
    </p>
    );
}


const propertiesSchema = z.object({
    text: z.string().min(3, {
        message: "Tittle must have at least 3 chacracters"
    }).max(200, {
        message: "Tittle must have at max 50 chacracters"
    })
})

function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: ElementInstance
}) {
    const { updateElement, setSelectedElement } = useContextDesigner();
    const { text } = elementInstance.customAttributes;

    const form = useForm<z.infer<typeof propertiesSchema>>({
        resolver: zodResolver(propertiesSchema),
        defaultValues:{
            text
        },
        mode: "onBlur",
    })

    useEffect(() => {
        form.reset(elementInstance.customAttributes);
    }, [elementInstance, form]);

    const onSubmit = async (values: z.infer<typeof propertiesSchema>) => {
        const { text } = values;
        updateElement(elementInstance.id, {
            ...elementInstance,
            customAttributes: {
                text,
            }
        })
    }

    return (
        <div>
            <div>
                <h1>Properties</h1>
                <Button
                size={"icon"}
                variant={"ghost"}
                onClick={() => setSelectedElement((prev) => null)}
                >
                    <XSquare stroke="gray" strokeWidth={1} fill="none" />
                </Button>
            </div>
            <Separator className="border border-muted-foreground my-4" />

            <Form {...form}>
                <form onBlur={form.handleSubmit(onSubmit)}
                onSubmit={(e) => e.preventDefault()}
                className="space-y-2">
                    <FormField 
                    control={form.control} 
                    name="text"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Input placeholder="Your text here"
                                {...field}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter") e.currentTarget.blur();
                                }}
                                />
                            </FormControl>
                            <FormDescription>This is the text</FormDescription>
                        </FormItem>
                    )}
                    
                    />

                </form>
            </Form>
        </div>
    );
}