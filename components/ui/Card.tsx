import React, { ReactNode, CSSProperties } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
    hover?: boolean;
    style?: CSSProperties;
}

export default function Card({
    children,
    className = '',
    padding = 'md',
    hover = false,
    style,
}: CardProps) {
    const paddingVariants = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={`
        ${hover ? 'glass-hover' : 'glass'}
        rounded-xl ${paddingVariants[padding]}
        ${className}
      `}
            style={style}
        >
            {children}
        </div>
    );
}
