import { Heading1, XSquare } from "lucide-react";
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


const type: DesignElements = "Heading1Element";
const boxHeight = "h-24";
const customAttributes = {
    title: "Heading 1 Element",
};

export const Heading1DesignElement: Element = {
    type,
    construct: (id: string) => ({
        id,
        type,
        boxHeight,
        customAttributes,
    }),
    designerButtonElement: {
        icon: Heading1,
        label: "Heading 1",
        tooltip: "Add a Heading 1 Element",
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
    const {title} = elementInstance.customAttributes;
    return (
        <div className="flex flex-col gap-2 w-full p-6">
    <h1 className="flex mb-4 text-4xl font-extrabold justify-center tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
    <span className="bg-gradient-to-r text-center from-primary dark:to-white to-gray-600 text-transparent bg-clip-text animate-pulse">
        {title}
    </span>
</h1>
</div>
)
}

function PreviewComponent({
    elementInstance,
} : {
    elementInstance: ElementInstance
}) {
    const element = elementInstance as ElementInstance;

    const {title} = elementInstance.customAttributes;
    return (
        <div className="flex justify-center items-center mt-8">
        <h1 className="flex mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
    <span className="bg-gradient-to-r from-primary dark:to-white to-gray-600 text-transparent bg-clip-text">
        {title}
    </span>
</h1>
</div>
    );
}

function RenderComponent({
    elementInstance,
} : {
    elementInstance: ElementInstance
}) {
    const element = elementInstance as ElementInstance;

    return (
        <div className="flex justify-center items-center mt-8">
        <h1 className="flex mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
    <span className="bg-gradient-to-r from-primary dark:to-white to-gray-600 text-transparent bg-clip-text">
        {element.customAttributes.title}
    </span>
</h1>
</div>
    );
}


const propertiesSchema = z.object({
    title: z.string().min(3, {
        message: "Tittle must have at least 3 chacracters"
    }).max(50, {
        message: "Tittle must have at max 50 chacracters"
    })
})

function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: ElementInstance
}) {
    const { updateElement, setSelectedElement } = useContextDesigner();
    const { title } = elementInstance.customAttributes;

    const form = useForm<z.infer<typeof propertiesSchema>>({
        resolver: zodResolver(propertiesSchema),
        defaultValues:{
            title
        },
        mode: "onBlur",
    })

    useEffect(() => {
        form.reset(elementInstance.customAttributes);
    }, [elementInstance, form]);

    const onSubmit = async (values: z.infer<typeof propertiesSchema>) => {
        const { title } = values;
        updateElement(elementInstance.id, {
            ...elementInstance,
            customAttributes: {
                title,
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
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Your title here"
                                {...field}
                                onKeyDown={(e) => {
                                    if(e.key === "Enter") e.currentTarget.blur();
                                }}
                                />
                            </FormControl>
                            <FormDescription>This is the Title</FormDescription>
                        </FormItem>
                    )}
                    
                    />

                </form>
            </Form>
        </div>
    );
}