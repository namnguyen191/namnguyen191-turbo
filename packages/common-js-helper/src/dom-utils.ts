export const parentContains = (params: {
  ele: HTMLElement;
  attrName: string;
  attrValue: string;
}): {
  contains: boolean;
  chain: string[];
} => {
  const { ele, attrName, attrValue } = params;
  let parent: HTMLElement | null = ele.parentElement;
  const chain: string[] = [];
  while (parent) {
    const matchedAttr = parent.getAttribute(attrName);
    if (matchedAttr === null) {
      continue;
    }

    chain.push(matchedAttr);
    if (matchedAttr === attrValue) {
      return {
        contains: true,
        chain,
      };
    }
    parent = parent.parentElement;
  }

  return {
    contains: false,
    chain,
  };
};
