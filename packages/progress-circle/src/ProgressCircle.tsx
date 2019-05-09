import { DynamicValue, EditableValue, ValueStatus } from "@mendix/pluggable-widgets-api/properties";
import { flattenStyles } from "@native-mobile-resources/util-widgets";
import { Component, createElement } from "react";
import { Text, View } from "react-native";
import { Circle } from "react-native-progress";

import { ProgressCircleProps } from "../typings/ProgressCircleProps";
import { defaultProgressCircleStyle, ProgressCircleStyle } from "./ui/Styles";

export type Props = ProgressCircleProps<ProgressCircleStyle>;

export class ProgressCircle extends Component<Props> {
    private readonly styles = flattenStyles(defaultProgressCircleStyle, this.props.style);

    render(): JSX.Element {
        const validationMessages = this.validate();
        const progress = validationMessages.length === 0 ? this.calculateProgress() : 0;
        const showsText = this.props.circleText !== "none";

        return (
            <View style={this.styles.container}>
                <Circle
                    progress={progress}
                    textStyle={this.styles.text}
                    color={this.styles.fill.backgroundColor}
                    size={Number(this.styles.circle.size)}
                    borderWidth={this.styles.circle.borderWidth}
                    borderColor={this.styles.circle.borderColor}
                    thickness={this.styles.fill.width}
                    showsText={showsText}
                    {...(showsText ? { formatText: () => this.formatText(progress) } : {})}
                    strokeCap={this.styles.fill.lineCapRounded ? "round" : "square"}
                />
                {validationMessages.length > 0 && (
                    <Text style={this.styles.validationMessage}>{validationMessages.join("\n")}</Text>
                )}
            </View>
        );
    }

    private formatText(progress: number): string {
        switch (this.props.circleText as "customText" | "percentage") {
            case "customText":
                return (this.props.customText && this.props.customText.value) || "";
            case "percentage":
                return `${Math.round(progress * 100)}%`;
        }
    }

    private validate(): string[] {
        const messages: string[] = [];
        const { minimumValue, maximumValue, progressValue } = this.props;

        if (minimumValue.status === ValueStatus.Unavailable) {
            messages.push("No minimum value provided.");
        }
        if (maximumValue.status === ValueStatus.Unavailable) {
            messages.push("No maximum value provided.");
        }
        if (progressValue.status === ValueStatus.Unavailable) {
            messages.push("No current value provided.");
        }
        if (available(minimumValue) && available(maximumValue) && available(progressValue)) {
            if (minimumValue.value!.gte(maximumValue.value!)) {
                messages.push("The minimum value can not be greater than or equal to the maximum value.");
            } else {
                if (progressValue.value!.lt(minimumValue.value!)) {
                    messages.push("The current value can not be less than the minimum value.");
                }
                if (progressValue.value!.gt(maximumValue.value!)) {
                    messages.push("The current value can not be greater than the maximum value.");
                }
            }
        }

        return messages;
    }

    private calculateProgress(): number {
        const { minimumValue, maximumValue, progressValue } = this.props;

        if (!available(minimumValue) || !available(maximumValue) || !available(progressValue)) {
            return 0;
        }

        const numerator = progressValue.value!.minus(minimumValue.value!);
        const denominator = maximumValue.value!.minus(minimumValue.value!);
        return Number(numerator.div(denominator));
    }
}

function available(attribute: EditableValue<BigJs.Big> | DynamicValue<BigJs.Big>): boolean {
    return attribute.status === ValueStatus.Available && attribute.value != null;
}
