import React from "react";
export type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export type FlowItem = { icon: IconType; label: string };
