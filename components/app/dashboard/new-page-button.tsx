"use client";

import { Button } from "@/components/ui/button";
import { FilePlus2, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { createPage } from "@/actions/designer";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome deve ter no minimo 3 caracteres",
    })
    .max(50, {
      message: "Nome deve ter menos de 50 caracteres ",
    }),
  description: z
    .string()
    .min(10, {
      message: "Nome deve ter no minimo 10 caracteres",
    })
    .max(250, {
      message: "Nome deve ter menos de 250 caracteres ",
    }),
});

type PageFormData = z.infer<typeof formSchema>;

export function NewPageButton() {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<PageFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: PageFormData) => {
    try {
      const { name, description } = values;
      // server action
      const pageId = await createPage(name, description);
      // const pageId = 10; //serverAction
      //toast
      setOpen(false);
      //redirect to app/page-designer/${pageId}
      router.push(`/app/page-designer/${pageId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"}>
          <FilePlus2 className="flex justify-between gap-2 mr-1" />
          Nova Pagina
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crie sua Pagina</DialogTitle>
          <DialogDescription>
            Essa informação é apenas interna, Você podera criar sua pagina em
            seguida.{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    Nome
                    <FormControl>
                      <Input placeholder="ex.: SMARTSell..." {...field} />
                    </FormControl>
                    <FormDescription>Nome da pagina</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    Descrição
                    <FormControl>
                      <Input
                        placeholder="ex.: E-commerce de suplementos..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Descrição da Pagina</FormDescription>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full mt-4"
          disabled={form.formState.isSubmitting}
        >
          {!form.formState.isSubmitting && <span>Create</span>}
          {form.formState.isSubmitting && <Loader className="animate-spin" />}

        </Button>
        </DialogFooter>  
      </DialogContent>
    </Dialog>
  );
}

export default NewPageButton;
