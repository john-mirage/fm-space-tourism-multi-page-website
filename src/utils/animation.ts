export function* fadeAndSlideXKeyframes(toLeft: boolean) {
  if (typeof toLeft === "boolean") {
    yield [
      { opacity: 1, transform: "translateX(0)", offset: 0 },
      {
        opacity: 0,
        transform: toLeft ? "translateX(-4rem)" : "translateX(4rem)",
        offset: 1,
      },
    ];
    return [
      {
        opacity: 0,
        transform: toLeft ? "translateX(4rem)" : "translateX(-4rem)",
        offset: 0,
      },
      { opacity: 1, transform: "translateX(0)", offset: 1 },
    ];
  } else {
    throw new Error("The to left parameter must be a boolean");
  }
}

export function* fadeKeyframes() {
  yield [
    { opacity: 1, offset: 0 },
    { opacity: 0, offset: 1 },
  ];
  return [
    { opacity: 0, offset: 0 },
    { opacity: 1, offset: 1 },
  ];
}
