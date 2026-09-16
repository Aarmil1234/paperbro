import { useEffect, useState } from "react";
import axios from "../services/api";
import {
  Brain,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function AnalyzePaper() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] =
    useState("");

  const [papers, setPapers] = useState([]);

  const [loading, setLoading] = useState(false);

  async function fetchSubjects() {
    try {
      const res = await axios.get("/subjects");

      setSubjects(res.data.subjects || []);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchPapers() {
    try {
      const res = await axios.get(
        `/papers/subject/${selectedSubject}`
      );

      setPapers(res.data.papers || []);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchPapers();
    } else {
      setPapers([]);
    }
  }, [selectedSubject]);

  const analyzePaper = async (paperId) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `/papers/analyze/${paperId}`
      );

      alert(
        `${res.data.totalQuestions} Questions Extracted`
      );

      fetchPapers();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Analysis Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const analyzeAll = async () => {
    try {
      setLoading(true);

      for (const paper of papers) {
        await axios.post(
          `/papers/analyze/${paper.id}`
        );
      }

      alert("All Papers Analyzed");

      fetchPapers();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Analyze Papers
        </h1>

        <p className="text-gray-500 mt-2">
          Extract questions using Gemini AI
        </p>
      </div>

      <div className="bg-white rounded-2xl border p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
          >
            <option value="">
              Select Subject
            </option>

            {subjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name}
              </option>
            ))}
          </select>

          <button
            onClick={analyzeAll}
            disabled={
              loading ||
              papers.length === 0
            }
            className="bg-purple-600 text-white rounded-xl p-3"
          >
            Analyze All Papers
          </button>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="font-semibold mb-5">
          Papers
        </h2>

        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">
                  Paper
                </th>

                <th className="text-left py-3">
                  Year
                </th>

                <th className="text-left py-3">
                  Status
                </th>

                <th className="text-left py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {papers.map((paper) => (
                <tr
                  key={paper.id}
                  className="border-b"
                >
                  <td className="py-4 flex items-center gap-2">
                    <FileText size={18} />

                    {paper.file_url}
                  </td>

                  <td>{paper.year}</td>

                  <td>
                    {paper.analyzed ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                        <CheckCircle
                          size={14}
                        />
                        Analyzed
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                        Pending
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        analyzePaper(
                          paper.id
                        )
                      }
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
                    >
                      <Brain
                        size={16}
                      />

                      Analyze
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!papers.length && (
            <div className="text-center py-10 text-gray-500">
              No Papers Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
