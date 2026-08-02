import { type ComponentPropsWithRef } from 'react';
export interface TimestampLabelProps extends Omit<ComponentPropsWithRef<'time'>, 'children' | 'dateTime'> {
    datetime: string;
}
export declare function TimestampLabel({ datetime, className, ...props }: TimestampLabelProps): import("react").JSX.Element;
