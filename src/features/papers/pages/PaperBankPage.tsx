import {
  BookOpen,
  Calendar,
  FileText,
  ArrowRight,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function PaperBankPage() {
  const navigate = useNavigate();

  const subjects = [
    {
      id: 1,
      name: "Computer Networks",
      papers: 5,
      lastAnalysis: "Today",
    },
    {
      id: 2,
      name: "Operating Systems",
      papers: 3,
      lastAnalysis: "2 Days Ago",
    },
    {
      id: 3,
      name: "DBMS",
      papers: 4,
      lastAnalysis: "Last Week",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">

          <div>
            <h1 className="text-3xl font-bold">
              My Paper Bank
            </h1>

            <p className="text-gray-500 mt-2">
              Manage subjects and view analysis reports
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/dashboard/analyze")
            }
            className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={18} />
            Analyze New Subject
          </button>

        </div>

        {/* Subject Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="bg-white rounded-3xl border p-6 hover:shadow-lg transition cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
                <BookOpen size={28} />
              </div>

              <h2 className="text-xl font-bold mb-3">
                {subject.name}
              </h2>

              <div className="space-y-3 text-gray-600">

                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  {subject.papers} Papers Uploaded
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {subject.lastAnalysis}
                </div>

              </div>

              <button
                className="mt-6 flex items-center gap-2 font-semibold"
              >
                Open Analysis
                <ArrowRight size={16} />
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}