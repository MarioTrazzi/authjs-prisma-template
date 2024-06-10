import { Heading1DesignElement } from "./elements/heading1-design-element";
import { NavbarDesignElement } from "./elements/navbar-design-element";
import { Paragraph1DesignElement } from "./elements/paragraph1-design-element";



export type DesignElements = "Heading1Element" | "Paragraph1Element" | "NavbarElement";

export interface Element {
    type: DesignElements;

    construct: (id: string) => ElementInstance

    designerButtonElement: {
        icon: React.ElementType;
        label: string;
        tooltip: string;  
    }

    designerComponent: React.FC<{elementInstance: ElementInstance}>;
    propertiesComponent: React.FC<{elementInstance: ElementInstance}>;
    previewComponent: React.FC<{elementInstance: ElementInstance}>;
    renderComponent: React.FC<{elementInstance: ElementInstance}>;
}


export interface ElementInstance {
    id: string;
    type: DesignElements;
    boxHeight: string;
    customAttributes: Record<string, any>;
}

export type DesignElementsTypes = {
    [key in DesignElements]: Element;
}

export const DesignElementsImpl: DesignElementsTypes = {
        Heading1Element: Heading1DesignElement,
        Paragraph1Element: Paragraph1DesignElement,
        NavbarElement: NavbarDesignElement,
}