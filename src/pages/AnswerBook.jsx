import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AnswerBook() {
  const { subjectId } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState(null);

  const contentRef = useRef();

  async function loadAnswers() {
    try {
      const res = await axios.get(
        `/predictions/${subjectId}/answer-book`
      );

      setData(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (subjectId) {
      loadAnswers();
    } else {
      setLoading(false);
    }
  }, [subjectId]);

  const downloadPDF = async () => {
    const input = contentRef.current;

    if (!input) return;

    const canvas =
      await html2canvas(input, {
        scale: 2,
      });

    const imgData =
      canvas.toDataURL("image/png");

    const pdf =
      new jsPDF("p", "mm", "a4");

    const imgWidth = 190;

    const imgHeight =
      (canvas.height * imgWidth) /
      canvas.width;

    let heightLeft =
      imgHeight;

    let position = 10;

    pdf.addImage(
      imgData,
      "PNG",
      10,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= 277;

    while (heightLeft > 0) {
      position =
        heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        10,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= 277;
    }

    pdf.save(
      "PaperBro-AnswerBook.pdf"
    );
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <div className="flex justify-between mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            AI Answer Book
          </h1>

          <p className="text-gray-500">
            Complete Study Material
          </p>

        </div>

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
        ref={contentRef}
        className="bg-white rounded-xl border p-8"
      >

        <div className="text-center mb-10">

          <h2 className="text-2xl font-bold">
            PAPERBRO
          </h2>

          <h3 className="text-lg">
            Complete Answer Book
          </h3>

          <p>
            Total Answers:
            {" "}
            {data?.totalAnswers}
          </p>

        </div>

        <div className="space-y-10">

          {data?.answers?.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="border-b pb-8"
              >

                <div className="mb-4">

                  <h3 className="font-bold text-lg">
                    Question
                    {" "}
                    {index + 1}
                  </h3>

                  <p className="mt-2">
                    {
                      item.question
                    }
                  </p>

                  <div className="text-sm text-gray-500 mt-1">
                    Topic:
                    {" "}
                    {
                      item.topic
                    }
                  </div>

                </div>

                <div className="bg-gray-50 p-5 rounded-xl whitespace-pre-wrap">
                  {
                    item.answer
                  }
                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}
