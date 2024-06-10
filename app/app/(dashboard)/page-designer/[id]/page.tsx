import { getPage } from "@/actions/designer";
import Designer from "@/components/app/dashboard/designer/designer";
import DesignerContextProvider from "@/components/providers/designer/designer-context-provider";

async function PageDesigner({ params }: {params: { id: string } }) {
    const { id } = params;

    const page = await getPage(Number(id));

    if(!page) {
        return <div>Page not found.</div>
    }
    return (
        <DesignerContextProvider>
            <Designer page={page} />
        </DesignerContextProvider>
    )
}

export default PageDesigner;