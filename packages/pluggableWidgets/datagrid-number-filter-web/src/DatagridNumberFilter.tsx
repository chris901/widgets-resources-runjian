import { createElement, ReactElement } from "react";
import { DatagridNumberFilterContainerProps, DefaultFilterEnum } from "../typings/DatagridNumberFilterProps";

import { FilterComponent } from "./components/FilterComponent";
import { Alert, FilterType, getFilterDispatcher } from "@mendix/piw-utils-internal";
import { Big } from "big.js";

import {
    attribute,
    equals,
    greaterThan,
    greaterThanOrEqual,
    lessThan,
    lessThanOrEqual,
    literal,
    notEqual,
    or
} from "mendix/filters/builders";
import { FilterCondition } from "mendix/filters";
import { ListAttributeValue } from "mendix";
import { translateFilters } from "./utils/filters";

export default function DatagridNumberFilter(props: DatagridNumberFilterContainerProps): ReactElement {
    const FilterContext = getFilterDispatcher();
    const alertMessage = (
        <Alert bootstrapStyle="danger">
            The number filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget.
        </Alert>
    );
    const alertMessageMultipleFilters = (
        <Alert bootstrapStyle="danger">
            To use multiple filters you need to define a filter identification in the properties of number filter or
            have a &quot;Auto number, Decimal, Integer or Long&quot; attribute available.
        </Alert>
    );

    return FilterContext?.Consumer ? (
        <FilterContext.Consumer>
            {filterContextValue => {
                if (
                    !filterContextValue ||
                    !filterContextValue.filterDispatcher ||
                    (!filterContextValue.singleAttribute && !filterContextValue.multipleAttributes)
                ) {
                    return alertMessage;
                }
                const {
                    filterDispatcher,
                    singleAttribute,
                    multipleAttributes,
                    singleInitialFilter,
                    multipleInitialFilters
                } = filterContextValue;

                const attribute = singleAttribute ?? findAttributesByType(multipleAttributes)?.[0];

                if (!attribute) {
                    if (multipleAttributes) {
                        return alertMessageMultipleFilters;
                    }
                    return alertMessage;
                }

                const defaultFilter = singleInitialFilter
                    ? translateFilters(singleInitialFilter)
                    : translateFilters(multipleInitialFilters?.[attribute.id]); // TODO: Restore all

                const errorMessage = getAttributeTypeErrorMessage(attribute.type);
                if (errorMessage) {
                    return <Alert bootstrapStyle="danger">{errorMessage}</Alert>;
                }

                return (
                    <FilterComponent
                        adjustable={props.adjustable}
                        defaultFilter={defaultFilter?.type ?? props.defaultFilter}
                        delay={props.delay}
                        name={props.name}
                        placeholder={props.placeholder?.value}
                        screenReaderButtonCaption={props.screenReaderButtonCaption?.value}
                        screenReaderInputCaption={props.screenReaderInputCaption?.value}
                        tabIndex={props.tabIndex}
                        updateFilters={(value: Big | undefined, type: DefaultFilterEnum): void => {
                            const attributes = singleAttribute ? [attribute] : findAttributesByType(multipleAttributes);
                            const conditions = attributes
                                ?.map(attribute => getFilterCondition(attribute, value, type))
                                .filter((filter): filter is FilterCondition => filter !== undefined);
                            filterDispatcher({
                                getFilterCondition: () =>
                                    conditions && conditions.length > 1 ? or(...conditions) : conditions?.[0],
                                filterType: FilterType.NUMBER
                            });
                        }}
                        value={defaultFilter?.value ?? props.defaultValue?.value}
                    />
                );
            }}
        </FilterContext.Consumer>
    ) : (
        alertMessage
    );
}

function findAttributesByType(multipleAttributes?: {
    [key: string]: ListAttributeValue;
}): ListAttributeValue[] | undefined {
    if (!multipleAttributes) {
        return undefined;
    }
    return Object.keys(multipleAttributes)
        .map(key => multipleAttributes[key])
        .filter(attr => attr.type.match(/AutoNumber|Decimal|Integer|Long/));
}

function getAttributeTypeErrorMessage(type?: string): string | null {
    return type && !type.match(/AutoNumber|Decimal|Integer|Long/)
        ? "The attribute type being used for Data grid number filter is not 'Auto number, Decimal, Integer or Long'"
        : null;
}

function getFilterCondition(
    listAttribute: ListAttributeValue,
    value: Big | undefined,
    type: DefaultFilterEnum
): FilterCondition | undefined {
    if (!listAttribute || !listAttribute.filterable || !value) {
        return undefined;
    }

    const filters = {
        greater: greaterThan,
        greaterEqual: greaterThanOrEqual,
        equal: equals,
        notEqual,
        smaller: lessThan,
        smallerEqual: lessThanOrEqual
    };

    return filters[type](attribute(listAttribute.id), literal(value));
}
