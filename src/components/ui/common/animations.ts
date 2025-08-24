export const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// 若你已經有檔案，只需加上這個 helper 即可
export const reveal = (stagger = 0.08, duration = 0.6) => ({
  hidden: { opacity: 0, y: 24, filter: "blur(2px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * stagger, duration, ease: [0.16, 1, 0.3, 1] },
  }),
});
