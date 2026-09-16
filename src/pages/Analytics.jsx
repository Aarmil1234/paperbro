import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function Analytics() {
  const { subjectId } = useParams();

  const [analytics, setAnalytics] =
    useState(null);

  const [predictions, setPredictions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  async function loadData() {
    try {
      const [
        analyticsRes,
        predictionRes,
      ] = await Promise.all([
        axios.get(
          `/papers/subject/${subjectId}/analytics`
        ),
        axios.get(
          `/predictions/${subjectId}`
        ),
      ]);

      setAnalytics(
        analyticsRes.data
      );

      setPredictions(
        predictionRes.data
          .importantTopics || []
      );

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (subjectId) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [subjectId]);

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  const chartData =
    predictions.slice(0, 10);

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Analytics
          </h1>

          <p className="text-gray-500">
            AI Analysis Report
          </p>
        </div>

        <div className="flex gap-3">

          <Link
            to={`/predictions/${subjectId}`}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl"
          >
            Predictions
          </Link>

          <Link
            to={`/final-paper/${subjectId}`}
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Final Paper
          </Link>

          <Link
            to={`/answer-book/${subjectId}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Answer Book
          </Link>

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500">
            Papers
          </p>

          <h2 className="text-3xl font-bold">
            {analytics?.totalPapers ||
              0}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500">
            Questions
          </p>

          <h2 className="text-3xl font-bold">
            {analytics?.totalQuestions ||
              0}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500">
            Topics
          </p>

          <h2 className="text-3xl font-bold">
            {predictions.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-6">
          <p className="text-gray-500">
            Top Topic
          </p>

          <h2 className="text-lg font-bold">
            {predictions[0]?.topic ||
              "-"}
          </h2>
        </div>

      </div>

      {/* Chart */}

      <div className="bg-white border rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Topic Frequency
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart
            data={chartData}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="topic"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="frequency"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Topics Table */}

      <div className="bg-white border rounded-2xl overflow-hidden">

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            Important Topics
          </h2>
        </div>

        <table className="w-full">

          <thead>

            <tr className="bg-gray-50">

              <th className="p-4 text-left">
                Topic
              </th>

              <th className="p-4 text-left">
                Frequency
              </th>

              <th className="p-4 text-left">
                Marks
              </th>

              <th className="p-4 text-left">
                Probability
              </th>

            </tr>

          </thead>

          <tbody>

            {predictions.map(
              (topic) => (
                <tr
                  key={topic.topic}
                  className="border-t"
                >
                  <td className="p-4">
                    {topic.topic}
                  </td>

                  <td className="p-4">
                    {
                      topic.frequency
                    }
                  </td>

                  <td className="p-4">
                    {
                      topic.totalMarks
                    }
                  </td>

                  <td className="p-4">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      {
                        topic.probability
                      }
                      %
                    </span>

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
