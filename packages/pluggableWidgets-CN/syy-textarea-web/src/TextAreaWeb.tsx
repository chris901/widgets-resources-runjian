import { ReactNode, createElement, useCallback } from "react";
import { TextAreaWebContainerProps } from "../typings/TextAreaWebProps";
import { executeAction } from "@mendix/piw-utils-internal";
import { checkPathPermission } from "./utils/utils";
import "./ui/TextAreaWeb.scss";

import { Input } from "antd";
const { TextArea } = Input;

export function TextAreaWeb(props: TextAreaWebContainerProps): ReactNode {
    const { placeholder, showCount, autoSize, bordered, allowClear, maxLength, minRows, maxRows, value } = props;

    const onChange = useCallback(() => executeAction(props.onChange), [props.onChange]);
    const onResize = useCallback(() => executeAction(props.onResize), [props.onResize]);
    const onPressEnter = useCallback(() => executeAction(props.onPressEnter), [props.onPressEnter]);

    return (
        <div className={props.class} style={props.style} tabIndex={props.tabIndex}>
            <TextArea
                value={value?.value + ""}
                maxLength={maxLength}
                allowClear={allowClear}
                showCount={showCount}
                autoSize={autoSize === true ? { minRows, maxRows } : false}
                bordered={bordered}
                placeholder={placeholder}
                onChange={onChange}
                onResize={onResize}
                onPressEnter={onPressEnter}
            />
        </div>
    );
}
