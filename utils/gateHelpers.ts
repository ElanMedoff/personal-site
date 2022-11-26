const gates = { comments: false } as const;

type Gate = keyof typeof gates;

export const isGateOpen = (gate: Gate) => {
  return gates[gate];
};
