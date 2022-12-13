import { useEffect } from "react";
import { Box, getBoxes } from "../utils/firebase/boxes";
import { atom, useAtom } from "jotai";

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
