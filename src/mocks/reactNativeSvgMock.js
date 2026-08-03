import React from 'react';

export const Svg = ({ children, style, ...props }) => <svg style={style} {...props}>{children}</svg>;
export const Path = (props) => <path {...props} />;
export const Circle = (props) => <circle {...props} />;
export const Rect = (props) => <rect {...props} />;
export const G = (props) => <g {...props} />;
export const Line = (props) => <line {...props} />;
export const Polygon = (props) => <polygon {...props} />;
export const Polyline = (props) => <polyline {...props} />;
export const Text = ({ children, ...props }) => <text {...props}>{children}</text>;
export const TSpan = ({ children, ...props }) => <tspan {...props}>{children}</tspan>;
export const Defs = ({ children, ...props }) => <defs {...props}>{children}</defs>;
export const Stop = (props) => <stop {...props} />;
export const LinearGradient = ({ children, ...props }) => <linearGradient {...props}>{children}</linearGradient>;
export const RadialGradient = ({ children, ...props }) => <radialGradient {...props}>{children}</radialGradient>;
export const Ellipse = (props) => <ellipse {...props} />;

export default Svg;
