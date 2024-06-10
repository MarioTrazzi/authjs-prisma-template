import { AlignVerticalSpaceAround, BoxIcon, CircleUser, Fingerprint, Search, ShoppingCart, TwitterIcon, X, XIcon, XSquare } from "lucide-react";
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
import { usePathname } from "next/navigation"
import { ModeToggleElement } from "../elements-components/navbar-element-components/moddle-toggle-element";
import Link from "next/link";
import { CommandMenuElement } from "../elements-components/navbar-element-components/command-menu-element";
import LoginBadge from "@/components/auth/login-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const type: DesignElements = "NavbarElement";
const boxHeight = "h-24";
const customAttributes = {
    title: "Navbar",
};

export const NavbarDesignElement: Element = {
    type,
    construct: (id: string) => ({
        id,
        type,
        boxHeight,
        customAttributes,
    }),
    designerButtonElement: {
        icon: AlignVerticalSpaceAround,
        label: "Navbar",
        tooltip: "Add a Navbar element",
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
        <div className="ml-4 flex flex-row gap-8 justify-center items-center text-muted-foreground animate-pulse" >
        <span className="text-xl mr-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-green-400">{title}</span>
      <div>Home</div>
      <div>Loja</div>
      <div>Blog</div>
        </div>
    
);
}

function PreviewComponent({
    elementInstance,
} : {
    elementInstance: ElementInstance
}) {
    const element = elementInstance as ElementInstance;

    const {title} = elementInstance.customAttributes;

    const pathname = usePathname()

    return (
<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl justify-between space-x-3 items-center">
          <div className="flex justify-start items-center ml-2">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base mr-2">
					<Fingerprint className="h-6 w-6 text-green-500 ml-2" />
					<span>{title}</span>
				</Link>
          </div>
          <div className="flex items-center gap-8">
          <Link href="#" className="flex items-center text-lg  md:text-base">
					<span>Home</span>
				</Link>
          <Link href="#" className=" flex items-center text-lg md:text-base">
					<span>Loja</span>
				</Link>
          <Link href="#" className="flex items-center text-lg md:text-base">
					<span>Blog</span>
				</Link>
          </div>
          <div className="flex justify-between space-x-2 items-center">
      
<CommandMenuElement />

          </div>
          <div className="flex justify-end items-center gap-4 mr-2">
          <Avatar className="cursor-pointer">
							<AvatarImage src={"/vercel.svg"} />
							<AvatarFallback className="bg-green-500">
								<CircleUser className="h-5 w-5" />
							</AvatarFallback>
						</Avatar>
          <ShoppingCart />
          <span className="text-sm ml-2 mr-2">(1) 0.002 BTC</span>
          <ModeToggleElement />

          </div>

        </div>

    </header>  );
}

function RenderComponent({
    elementInstance,
} : {
    elementInstance: ElementInstance
}) {
    const element = elementInstance as ElementInstance;

    const {title} = elementInstance.customAttributes;

    const pathname = usePathname()

    return (
<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl justify-between space-x-3 items-center">
          <div className="flex justify-start items-center ml-2">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base mr-2">
					<Fingerprint className="h-6 w-6 text-green-500 ml-2" />
					<span>{title}</span>
				</Link>
          </div>
          <div className="flex items-center gap-8">
          <Link href="#" className="flex items-center text-lg  md:text-base">
					<span>Home</span>
				</Link>
          <Link href="#" className=" flex items-center text-lg md:text-base">
					<span>Loja</span>
				</Link>
          <Link href="#" className="flex items-center text-lg md:text-base">
					<span>Blog</span>
				</Link>
          </div>
          <div className="flex justify-between space-x-2 items-center">
      
<CommandMenuElement />

          </div>
          <div className="flex justify-end items-center gap-4 mr-2">
          <Avatar className="cursor-pointer">
							<AvatarImage src={"/vercel.svg"} />
							<AvatarFallback className="bg-green-500">
								<CircleUser className="h-5 w-5" />
							</AvatarFallback>
						</Avatar>
          <ShoppingCart />
          <span className="text-sm ml-2 mr-2">(1) 0.002 BTC</span>
          <ModeToggleElement />

          </div>

        </div>

    </header>  );
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