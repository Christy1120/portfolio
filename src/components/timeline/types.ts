// ===============================
// File: src/components/timeline/types.ts
// ===============================
export type TimelineItem = {
title: string;
period: string;
company?: string;
summary: string;
tags?: string[];
href?: string; // external link
slug?: string; // internal route
};