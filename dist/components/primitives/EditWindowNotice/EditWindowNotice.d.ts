import type { ComponentPropsWithRef } from 'react';
export interface EditWindowNoticeProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
    editableUntil: string;
}
export declare function EditWindowNotice({ editableUntil, className, ...props }: EditWindowNoticeProps): import("react").JSX.Element;
