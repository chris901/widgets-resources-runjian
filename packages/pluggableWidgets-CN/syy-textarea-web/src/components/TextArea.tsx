import { ReactElement, createElement } from "react";
import "../ui/TextAreaWeb.scss";
import { Input } from "antd";
const { TextArea } = Input;

interface AutoSizeType {
    minRows?: number;
    maxRows?: number;
}

export interface TextAreaProps {
    value: string;
    maxLength?: number;
    allowClear?: boolean;
    showCount?: boolean;
    autoSize?: boolean | AutoSizeType;
    bordered?: boolean;
    placeholder?: string;
    onChange?: undefined | ((event: React.ChangeEvent) => void);
    onResize?: (size: { width: number; height: number }) => void;
    onPressEnter?: React.KeyboardEventHandler<HTMLTextAreaElement>;
}

export function TextAreaComponent(props: TextAreaProps): ReactElement {
    return <TextArea {...props} />;
}
