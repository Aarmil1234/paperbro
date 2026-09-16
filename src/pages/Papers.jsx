import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";

export default function Papers() {
  const { subjectId } = useParams();

  const [papers, setPapers] =
    useState([]);

  const [file, setFile] =
    useState(null);

  const [year, setYear] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function fetchPapers() {
    try {
      const res =
        await axios.get(
          `/papers/subject/${subjectId}`
        );

      setPapers(
        res.data.papers || []
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (subjectId) {
      fetchPapers();
    }
  }, [subjectId]);

  const uploadPaper =
    async (e) => {
      e.preventDefault();

      if (!file) return;

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "paper",
          file
        );

        formData.append(
          "subjectId",
          subjectId
        );

        formData.append(
          "year",
          year
        );

        await axios.post(
          "/papers/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        setFile(null);
        setYear("");

        fetchPapers();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

  const analyzePaper =
    async (paperId) => {
      try {
        await axios.get(
          `/papers/analyze/${paperId}`
        );

        alert(
          "Paper analyzed successfully"
        );
      } catch (err) {
        console.log(err);
      }
    };

  const analyzeAll =
    async () => {
      try {
        await axios.get(
          `/papers/analyze-all/${subjectId}`
        );

        alert(
          "All papers analyzed"
        );

        fetchPapers();
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="p-8">

      <div className="flex justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Papers
          </h1>

          <p className="text-gray-500">
            Upload and analyze papers
          </p>
        </div>

        <button
          onClick={analyzeAll}
          className="bg-purple-600 text-white px-5 py-3 rounded-xl"
        >
          Analyze All
        </button>

      </div>

      {/* Upload */}

      <div className="bg-white p-6 rounded-2xl border mb-8">

        <form
          onSubmit={uploadPaper}
          className="grid md:grid-cols-3 gap-4"
        >

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) =>
              setYear(
                e.target.value
              )
            }
            className="border p-3 rounded-xl"
          />

          <button
            disabled={loading}
            className="bg-blue-600 text-white rounded-xl"
          >
            {loading
              ? "Uploading..."
              : "Upload"}
          </button>

        </form>

      </div>

      {/* Papers Table */}

      <div className="bg-white rounded-2xl border overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="bg-gray-50">
              <th className="p-4">
                Year
              </th>

              <th className="p-4">
                File
              </th>

              <th className="p-4">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {papers.map(
              (paper) => (
                <tr
                  key={paper.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {paper.year}
                  </td>

                  <td className="p-4">
                    {paper.file_url}
                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          analyzePaper(
                            paper.id
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Analyze
                      </button>

                    </div>

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
