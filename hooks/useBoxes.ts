import { useEffect } from "react";
import { getBoxes } from "../utils/firebase/boxes";
import { atom, useAtom } from "jotai";
import { Box } from "../types";

const DEFAULT_OUTPUT = atom<UseBoxesOutput>({
  isLoading: true,
  boxes: [],
});

export type UseBoxesOutput = {
  isLoading: boolean;
  boxes: Box[];
};

export const useBoxes = (): UseBoxesOutput => {
  const [output, setOutput] = useAtom(DEFAULT_OUTPUT);

  useEffect(() => {
    void (async () => {
      const boxes = await getBoxes();
      setOutput({ isLoading: false, boxes });
    })();
  }, []);

  return output;
};
