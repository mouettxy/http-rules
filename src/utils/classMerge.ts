import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const classMerge = (...classes: ClassValue[]) => twMerge(clsx(...classes));