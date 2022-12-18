import { useBoxes } from "../../hooks/useBoxes";
import { OverviewAside } from "./Tab/overview";
import { BoxesAside } from "./Tab/boxes";
import { Tab } from "../../types";
import { Loading } from "../Lading";

type Props = {
  isTab: Tab;
};

export const Main = ({ isTab }: Props) => {
  const { isLoading, boxes } = useBoxes();
  if (isLoading) return <Loading />;
  return (
    <>
      <main className="row-[2] col-[2]">
        {isTab.overview.display == true ? (
          <OverviewAside num={isTab.overview.num} boxes={boxes} />
        ) : isTab.boxes.display == true ? (
          <BoxesAside num={isTab.boxes.num} boxes={boxes} />
        ) : (
          <></>
        )}
      </main>
    </>
  );
};
