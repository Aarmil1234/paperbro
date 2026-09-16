import { useEffect, useState } from "react";
import axios from "../services/api";
import { Upload, FileText } from "lucide-react";

export default function UploadPaper() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] =
    useState("");

  const [year, setYear] = useState("");

  const [file, setFile] = useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [papers, setPapers] = useState([]);

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

  const uploadPaper = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Select PDF");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append(
        "subjectId",
        selectedSubject
      );

      formData.append("year", year);

      formData.append("paper", file);

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

      alert("Paper Uploaded");
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Upload Papers
        </h1>

        <p className="text-gray-500 mt-2">
          Upload previous year question
          papers
        </p>
      </div>

      <div className="bg-white border rounded-2xl p-6 mb-8">
        <form
          onSubmit={uploadPaper}
          className="grid md:grid-cols-4 gap-4"
        >
          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
            required
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

          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) =>
              setYear(e.target.value)
            }
            className="border rounded-xl p-3"
            required
          />

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            className="border rounded-xl p-3"
            required
          />

          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-600 text-white rounded-xl p-3 flex items-center justify-center gap-2"
          >
            <Upload size={18} />

            {uploading
              ? "Uploading..."
              : "Upload"}
          </button>
        </form>
      </div>

      <div className="bg-white border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">
          Uploaded Papers
        </h2>

        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">
                  Year
                </th>

                <th className="text-left py-3">
                  File
                </th>

                <th className="text-left py-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {papers.map((paper) => (
                <tr
                  key={paper.id}
                  className="border-b"
                >
                  <td className="py-4">
                    {paper.year}
                  </td>

                  <td className="py-4 flex items-center gap-2">
                    <FileText
                      size={18}
                    />

                    {paper.file_url}
                  </td>

                  <td className="py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Uploaded
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!papers.length && (
            <div className="text-center py-8 text-gray-500">
              No Papers Uploaded
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
