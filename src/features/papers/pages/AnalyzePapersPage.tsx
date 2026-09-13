import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Upload, ArrowLeft } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface PaperRow {
  id: string;
  year: string;
  file: File | null;
}

export default function AnalyzePapersPage() {
  const navigate = useNavigate();

  const [subjectName, setSubjectName] =
    useState("");

  const [papers, setPapers] =
    useState<PaperRow[]>([
      {
        id: uuidv4(),
        year: "",
        file: null,
      },
      {
        id: uuidv4(),
        year: "",
        file: null,
      },
    ]);

  const addPaper = () => {
    setPapers((prev) => [
      ...prev,
      {
        id: uuidv4(),
        year: "",
        file: null,
      },
    ]);
  };

  const removePaper = (id: string) => {
    if (papers.length <= 2) return;

    setPapers((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  const updateYear = (
    id: string,
    value: string
  ) => {
    setPapers((prev) =>
      prev.map((paper) =>
        paper.id === id
          ? { ...paper, year: value }
          : paper
      )
    );
  };

  const updateFile = (
    id: string,
    file: File | null
  ) => {
    setPapers((prev) =>
      prev.map((paper) =>
        paper.id === id
          ? { ...paper, file }
          : paper
      )
    );
  };

  const handleSubmit = () => {
    if (!subjectName.trim()) {
      alert("Enter subject name");
      return;
    }

    const invalid = papers.some(
      (paper) =>
        !paper.year || !paper.file
    );

    if (invalid) {
      alert(
        "Please complete all paper details"
      );
      return;
    }

    console.log({
      subjectName,
      papers,
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      <div className="max-w-5xl mx-auto py-10 px-6">

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-2 mb-8 text-gray-600"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-sm border">
          
          <h1 className="text-3xl font-bold">
            Analyze Papers
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Upload previous year papers and
            generate prediction insights.
          </p>

          {/* Subject */}
          <div className="mb-8">
            <label className="block font-medium mb-2">
              Subject Name
            </label>

            <input
              type="text"
              value={subjectName}
              onChange={(e) =>
                setSubjectName(
                  e.target.value
                )
              }
              placeholder="Computer Networks"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Papers */}
          <div className="space-y-5">

            {papers.map((paper, index) => (
              <div
                key={paper.id}
                className="border rounded-2xl p-5"
              >
                <div className="flex justify-between items-center mb-4">
                  
                  <h3 className="font-semibold">
                    Paper #{index + 1}
                  </h3>

                  {papers.length > 2 && (
                    <button
                      onClick={() =>
                        removePaper(
                          paper.id
                        )
                      }
                    >
                      <Trash2
                        size={18}
                      />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  {/* Year */}
                  <div>
                    <label className="block mb-2 text-sm">
                      Year
                    </label>

                    <input
                      type="number"
                      value={paper.year}
                      onChange={(e) =>
                        updateYear(
                          paper.id,
                          e.target.value
                        )
                      }
                      placeholder="2024"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* PDF */}
                  <div>
                    <label className="block mb-2 text-sm">
                      PDF File
                    </label>

                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) =>
                        updateFile(
                          paper.id,
                          e.target
                            .files?.[0] ||
                            null
                        )
                      }
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                </div>

                {paper.file && (
                  <div className="mt-3 text-sm text-green-600">
                    {paper.file.name}
                  </div>
                )}
              </div>
            ))}

          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">

            <button
              onClick={addPaper}
              className="border px-5 py-3 rounded-xl flex items-center gap-2"
            >
              <Plus size={18} />
              Add Another Paper
            </button>

            <button
              onClick={handleSubmit}
              className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <Upload size={18} />
              Analyze Papers
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}