import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function FinalPaper() {
  const { subjectId } = useParams();

  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);

  const paperRef = useRef();

  async function loadPaper() {
    try {
      console.log("Loading Paper For:", subjectId);

      const res = await axios.get(
        `/predictions/${subjectId}/final-paper`
      );

      console.log(
        "API Response:",
        res.data
      );

      setPaper(res.data);
    } catch (err) {
      console.log(
        "Load Paper Error:",
        err
      );
    } finally {
      setLoading(false);
    }
  }

  const generateAnswer = async (
  predictionId
) => {
  try {
    const res =
      await axios.post(
        `/predictions/generate-answer/${predictionId}`
      );

    setPaper((prev) => ({
      ...prev,
      predictedPaper:
        prev.predictedPaper.map((q) =>
          q.id === predictionId
            ? {
                ...q,
                answer:
                  res.data.answer,
              }
            : q
        ),
    }));
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    if (subjectId) {
      loadPaper();
    }
  }, [subjectId]);

  useEffect(() => {
    console.log(
      "Paper State Updated:",
      paper
    );
  }, [paper]);

  const downloadPDF = async () => {
    const element = paperRef.current;

    if (!element) return;

    const canvas =
      await html2canvas(element);

    const imgData =
      canvas.toDataURL("image/png");

    const pdf = new jsPDF(
      "p",
      "mm",
      "a4"
    );

    const width = 190;

    const height =
      (canvas.height * width) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      10,
      width,
      height
    );

    pdf.save(
      "PaperBro-Final-Paper.pdf"
    );
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="p-10 text-red-600">
        No Paper Found
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Final Predicted Paper
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() =>
              window.print()
            }
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Print
          </button>

          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
          >
            Download PDF
          </button>
        </div>
      </div>

      <div
        ref={paperRef}
        className="bg-white border rounded-xl p-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            PAPERBRO AI
          </h2>

          <h3 className="text-xl mt-2">
            Predicted Examination Paper
          </h3>

          <p className="mt-2">
            Total Questions :
            {" "}
            {paper.totalQuestions || 0}
          </p>

          <p>
            Total Marks :
            {" "}
            {paper.totalMarks || 0}
          </p>
        </div>

        <div className="space-y-6">
          {paper?.predictedPaper?.map(
            (
              question,
              index
            ) => (
              <div
                key={
                  question.id ||
                  index
                }
                className="border-b pb-4"
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    Q.{index + 1}
                  </h3>

                  <span className="font-semibold">
                    {
                      question.expected_marks
                    }{" "}
                    Marks
                  </span>
                </div>

                <p className="mt-2">
                  {
                    question.question
                  }
                </p>

                <div className="mt-2 text-sm text-gray-500">
                  Topic:
                  {" "}
                  {
                    question.topic
                  }
                </div>

                <div className="mt-1 text-sm text-green-600">
                  Probability:
                  {" "}
                  {
                    question.probability
                  }
                  %
                </div>

                <button
  onClick={() =>
    generateAnswer(question.id)
  }
  className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-xl"
>
  Generate Answer
</button>
{question.answer && (
  <div className="mt-4 p-4 bg-gray-100 rounded-xl">
    <h4 className="font-semibold mb-2">
      Generated Answer
    </h4>

    <div className="whitespace-pre-wrap">
      {question.answer}
    </div>
  </div>
)}

                {/* DEBUG */}
                <div className="mt-1 text-xs text-red-500">
                  Marks Debug:
                  {" "}
                  {JSON.stringify(
                    question.expected_marks
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}