import { getPage } from "@/actions/designer";
import PublishedDesigner from "@/components/app/dashboard/designer/published-desinger";
import DesignerContextProvider from "@/components/providers/designer/designer-context-provider";

async function PageDesigner({ params }: {params: { id: string } }) {
    const { id } = params;

    const page = await getPage(Number(id));

    if(!page) {
        return <div>Page not found.</div>
    }
    return (
        <DesignerContextProvider>
            <PublishedDesigner page={page} />
        </DesignerContextProvider>
    )
}

export default PageDesigner;