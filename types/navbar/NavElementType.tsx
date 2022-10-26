import { MouseEventHandler, SVGProps } from "react";

export interface NavElementType {
    Icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    label: string;
    onClickFunction?: MouseEventHandler;
}