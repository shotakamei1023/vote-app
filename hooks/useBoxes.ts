import { useEffect, useState } from "react";

import { Box, getBoxes } from "../utils/firebase/boxes";

export type UseBoxesOutput = {
  isLoading: boolean;
  boxes: Box[];
};

const DEFAULT_OUTPUT: UseBoxesOutput = {
  isLoading: true,
  boxes: [],
};

export const useBoxes = (): UseBoxesOutput => {
  const [output, setOutput] = useState(DEFAULT_OUTPUT);

  useEffect(() => {
    void (async () => {
      const boxes = await getBoxes();
      setOutput({ isLoading: false, boxes });
    })();
  }, []);

  return output;
};
