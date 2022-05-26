import type { HTMLProps } from 'react';

type BooleanInput = boolean | string | null;

export type AngularInputs<T> = {
  [Property in keyof T]: T[Property] extends boolean | ((x: boolean) => void)
    ? BooleanInput
    : T[Property];
};

export type ReactProps<T, H = HTMLDivElement> = {
  [Property in keyof T]: T[Property];
} & {
  [Property in keyof T as T[Property] extends
    | T[Property] & ((open: T[Property]) => void)
    ? `set${Capitalize<string & Property>}`
    : Exclude<Property, Property>]: T[Property];
} & HTMLProps<H>;

// tests

type TooltipAttributes = {
  open: boolean;
  // open: boolean & ((open: boolean) => void);
  position: 'top' | 'bottom' | 'left' | 'right';
  align: 'start' | 'center' | 'end';
};

type TooltipInputs = AngularInputs<TooltipAttributes>;

type TooltipProps = ReactProps<TooltipAttributes>;
