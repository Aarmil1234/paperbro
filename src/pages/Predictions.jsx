import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

export default function Predictions() {
  const { subjectId } = useParams();

  const [questions, setQuestions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [answerLoading, setAnswerLoading] =
    useState(false);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  async function loadQuestions() {
    try {
      const res = await axios.get(
        `/predictions/${subjectId}/questions`
      );

      setQuestions(
        res.data.predictedQuestions || []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (subjectId) {
      loadQuestions();
    } else {
      setLoading(false);
    }
  }, [subjectId]);

  const generateAnswer = async (
    question,
    topic
  ) => {
    try {
      setAnswerLoading(true);

      const res = await axios.post(
        "/predictions/answer",
        {
          question,
          topic,
        }
      );

      setSelectedAnswer(
        res.data.answer
      );

      setShowModal(true);

    } catch (err) {
      console.log(err);
      alert(
        "Failed to generate answer"
      );
    } finally {
      setAnswerLoading(false);
    }
  };

  const copyAnswer = () => {
    navigator.clipboard.writeText(
      selectedAnswer
    );

    alert("Copied");
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          AI Predicted Questions
        </h1>

        <p className="text-gray-500">
          Most likely exam questions
        </p>

      </div>

      <div className="space-y-5">

        {questions.map(
          (item, index) => (
            <div
              key={index}
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >

              <div className="flex justify-between items-start mb-4">

                <div>

                  <h3 className="font-semibold text-lg">
                    Q{index + 1}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.topic}
                  </p>

                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {item.probability}%
                </span>

              </div>

              <p className="mb-4 text-gray-800">
                {item.question}
              </p>

              <div className="flex items-center gap-4">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {item.expectedMarks} Marks
                </span>

                <button
                  onClick={() =>
                    generateAnswer(
                      item.question,
                      item.topic
                    )
                  }
                  disabled={
                    answerLoading
                  }
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl"
                >
                  Generate Answer
                </button>

              </div>

            </div>
          )
        )}

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl w-[90%] max-w-5xl max-h-[90vh] overflow-y-auto p-6">

            <div className="flex justify-between mb-5">

              <h2 className="text-2xl font-bold">
                Generated Answer
              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                ✕
              </button>

            </div>

            <div className="bg-gray-50 p-5 rounded-xl whitespace-pre-wrap text-sm">
              {selectedAnswer}
            </div>

            <div className="mt-5 flex gap-3">

              <button
                onClick={copyAnswer}
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Copy Answer
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
