/**
 * This file was generated from TextArea.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface TextAreaContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    placeholder: string;
    allowClear: boolean;
    bordered: boolean;
    value: EditableValue<string | Big>;
    maxLength: number;
    showCount: boolean;
    autoSize: boolean;
    minRows: number;
    maxRows: number;
    onChange?: ActionValue;
    onResize?: ActionValue;
    onPressEnter?: ActionValue;
}

export interface TextAreaPreviewProps {
    readOnly: boolean;
    placeholder: string;
    allowClear: boolean;
    bordered: boolean;
    value: string;
    maxLength: number | null;
    showCount: boolean;
    autoSize: boolean;
    minRows: number | null;
    maxRows: number | null;
    onChange: {} | null;
    onResize: {} | null;
    onPressEnter: {} | null;
}
