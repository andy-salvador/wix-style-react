import * as React from 'react';

export interface SelectableAccordionItemCommonProps {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
}

export interface SelectableAccordionItemProps
  extends SelectableAccordionItemCommonProps {
  type?: 'radio' | 'checkbox' | 'toggle';
  open?: boolean;
  onChange?(idx: number, open: boolean): void;
}

export default class SelectableAccordionItem extends React.Component<
  SelectableAccordionItemProps
> {}
