import { useBoxes } from "../hooks/useBoxes";

export const BoxList = () => {
  const { isLoading, boxes } = useBoxes();
  console.log(boxes);
  if (isLoading) return <p>Loading...</p>;

  return (
    <ul className="grid grid-cols-2 place-items-center">
      {boxes.map((box) => (
        <li key={box.id}>{box.name}</li>
      ))}
    </ul>
  );
};
