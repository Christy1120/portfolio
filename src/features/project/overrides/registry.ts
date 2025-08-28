// src/features/project/overrides/registry.ts
import React from "react";

type SlotOverrides = {
  Header?: React.FC<any>;
  Overview?: React.FC<any>;
  Sidebar?: React.FC<any>;
  Sections?: React.FC<any>;
};

const REGISTRY: Record<string, SlotOverrides> = {
  // "decentralized-comic-platform": {
  //   Header: (props) => <ComicHero {...props} />,
  //   Sections: (props) => <ComicSections {...props} />,
  // },
};

export function loadProjectOverrides(slug?: string) {
  if (!slug) return undefined;
  return REGISTRY[slug];
}
