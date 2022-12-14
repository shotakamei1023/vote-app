import "../../utils/firebase/init";
import { useBoxes } from "../../hooks/useBoxes";
import {
  collection,
  doc,
  setDoc,
  getFirestore,
  getDoc,
} from "firebase/firestore";
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
import { useUsers } from "../../hooks/useUsers";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Main = ({ isTab }: any) => {
  const { isLoading, boxes } = useBoxes();
  const { users } = useUsers();
  if (isLoading) return <p>Loading...</p>;

  //データ整理
  const labels = boxes.map((item) => item.name);
  const values = boxes.map((item) => Number(item.count));

  //投票数
  const boxvotesCount: number = values.reduce((sum, element) => {
    return sum + element;
  });

  //ユーザー数
  const userCount = users.length;

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

  return (
    <>
      <main className="row-[2] col-[2]">
        {isTab.overview[0] ? (
          <div>
            <section className="bg-white dark:bg-gray-900">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                      {userCount}
                    </dt>
                    <dd className="font-light text-gray-500 dark:text-gray-400">
                      ユーザー数
                    </dd>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                      {boxvotesCount}
                    </dt>
                    <dd className="font-light text-gray-500 dark:text-gray-400">
                      投票数
                    </dd>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl md:text-4xl font-extrabold">
                      {Math.round(100 * (userCount / boxvotesCount))}%
                    </dt>
                    <dd className="font-light text-gray-500 dark:text-gray-400">
                      投票率
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>
        ) : isTab.boxes[0] ? (
          <>
            {" "}
            <section className="bg-white dark:bg-gray-900">
              <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-2 dark:text-white">
                  {boxes.map((item: any, index: number) => {
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
            </section>
          </>
        ) : isTab.boxes[1] ? (
          <>
            <div className="mx-auto mt-8">
              <Bar
                height={100}
                width={200}
                data={graphData}
                options={options}
                id="chart-key"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
};
