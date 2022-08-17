import { Component, ReactNode, createElement } from "react";
import { Input } from "antd";
import { TextAreaWebContainerProps } from "../typings/TextAreaWebProps";
const { TextArea } = Input;
declare function require(name: string): string;

export class preview extends Component<TextAreaWebContainerProps> {
    render(): ReactNode {
        const { props } = this;
        const { placeholder, bordered, allowClear } = props;
        return <TextArea maxLength={300} allowClear={allowClear} bordered={bordered} placeholder={placeholder} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/TextAreaWeb.scss");
}
