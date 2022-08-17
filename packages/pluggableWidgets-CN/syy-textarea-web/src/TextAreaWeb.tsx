import { ReactNode, createElement, useCallback } from "react";
import { TextAreaWebContainerProps } from "../typings/TextAreaWebProps";
import { TextAreaComponent } from "./components/TextAreaWeb";
import { executeAction } from "@mendix/piw-utils-internal";
import "./ui/TextAreaWeb.scss";

export function TextAreaWeb(props: TextAreaWebContainerProps): ReactNode {
    const { placeholder, showCount, autoSize, bordered, allowClear, maxLength, minRows, maxRows, value } = props;

    const onChange = useCallback(() => executeAction(props.onChange), [props.onChange]);
    const onResize = useCallback(() => executeAction(props.onResize), [props.onResize]);
    const onPressEnter = useCallback(() => executeAction(props.onPressEnter), [props.onPressEnter]);

    return (
        <div tabIndex={props.tabIndex}>
            <TextAreaComponent
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
