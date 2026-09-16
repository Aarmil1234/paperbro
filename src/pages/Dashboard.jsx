import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import axios from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [charts, setCharts] = useState(null);

  async function loadDashboard() {
    try {
      const statsRes =
        await axios.get("/dashboard");

      const chartsRes =
        await axios.get(
          "/dashboard/charts"
        );

      setStats(statsRes.data);
      setCharts(chartsRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!stats || !charts) {
    return (
      <div className="p-10">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          PaperBro Dashboard
        </h1>

        <p className="text-gray-500">
          AI Exam Prediction System
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <Card
          title="Subjects"
          value={stats.totalSubjects}
        />

        <Card
          title="Papers"
          value={stats.totalPapers}
        />

        <Card
          title="Questions"
          value={stats.totalQuestions}
        />

        <Card
          title="Predictions"
          value={stats.totalPredictions}
        />

      </div>

      {/* Charts */}

      <div className="grid md:grid-cols-2 gap-8 mb-8">

        <div className="bg-white border rounded-2xl p-5">
          <h2 className="font-semibold mb-4">
            Papers Per Subject
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={
                charts.papersPerSubject
              }
            >
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="papers" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <h2 className="font-semibold mb-4">
            Top Topics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={charts.topTopics}
                dataKey="count"
                nameKey="topic"
                outerRadius={100}
              >
                {charts.topTopics.map(
                  (_, index) => (
                    <Cell
                      key={index}
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Recent Subjects */}

      <div className="bg-white border rounded-2xl p-6 mb-8">

        <h2 className="font-semibold text-xl mb-4">
          Recent Subjects
        </h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Name</th>
              <th>Code</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentSubjects?.map(
              (subject) => (
                <tr
                  key={subject.id}
                  className="border-b"
                >
                  <td className="py-3">
                    {subject.name}
                  </td>

                  <td>
                    {subject.code}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

      </div>

      {/* Recent Papers */}

      <div className="bg-white border rounded-2xl p-6">

        <h2 className="font-semibold text-xl mb-4">
          Recent Papers
        </h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th>Year</th>
              <th>Paper ID</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentPapers?.map(
              (paper) => (
                <tr
                  key={paper.id}
                  className="border-b"
                >
                  <td className="py-3">
                    {paper.year}
                  </td>

                  <td>
                    {paper.id}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
}

function Card({
  title,
  value,
}) {
  return (
    <div className="bg-white border rounded-2xl p-6">
      <p className="text-gray-500">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}
