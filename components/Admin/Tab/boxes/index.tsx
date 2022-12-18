import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Box } from "../../../../types";

type Props = {
  num: number;
  boxes: Box[];
};

export const BoxesAside = ({ num, boxes }: Props) => {
  //データ整理
  const labels = boxes.map((item) => item.name);
  const values = boxes.map((item) => Number(item.count));

  const graphData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (num == 0) {
    return (
      <aside className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
          <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-2 dark:text-white">
            {boxes.map((item, index: number) => {
              return (
                <div
                  className="flex flex-col items-center justify-center"
                  key={index}
                >
                  <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                    {item.name}
                  </dt>
                  <dd className=" text-gray-500 dark:text-gray-400">
                    {item.count}票
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </aside>
    );
  }
  if (num == 1) {
    return (
      <aside className="mx-auto bg-white min-h-screen pt-8">
        <Bar
          height={100}
          width={200}
          data={graphData}
          options={options}
          id="chart-key"
        />
      </aside>
    );
  } else {
    return <></>;
  }
};
