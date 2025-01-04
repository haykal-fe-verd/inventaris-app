import { cn } from '@/lib/utils';
import React from 'react';

export default function InputError({
    message,
    className = '',
    ...props
}: React.HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={cn('mt-1 text-sm text-destructive', className)}
        >
            {message}
        </p>
    ) : null;
}
