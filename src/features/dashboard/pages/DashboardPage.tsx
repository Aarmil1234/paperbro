import {
  FileSearch,
  Library,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          
          <div>
            <h1 className="text-2xl font-bold">
              PaperRadar
            </h1>

            <p className="text-sm text-gray-500">
              Smart Exam Prediction System
            </p>
          </div>

          <button className="bg-black text-white px-5 py-2 rounded-lg">
            Profile
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="bg-gradient-to-r from-black to-slate-800 rounded-3xl text-white p-10">
          
          <h2 className="text-4xl font-bold mb-4">
            Stop Studying Everything.
          </h2>

          <p className="text-slate-300 text-lg max-w-2xl">
            Upload previous year papers and discover
            the most important questions, weightage,
            and probable exam topics.
          </p>
        </div>
      </section>

      {/* Main Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid md:grid-cols-2 gap-8">

          {/* Analyze Papers */}
          <div
            onClick={() =>
              navigate("/dashboard/analyze")
            }
            className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-8 border"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
              <FileSearch size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              Analyze Papers
            </h3>

            <p className="text-gray-500 mb-8">
              Upload previous year question papers
              and generate probability-based
              predictions.
            </p>

            <div className="flex items-center gap-2 font-semibold">
              Start Analysis
              <ArrowRight size={18} />
            </div>
          </div>

          {/* Paper Bank */}
          <div
            onClick={() =>
              navigate("/dashboard/paper-bank")
            }
            className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-8 border"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
              <Library size={32} />
            </div>

            <h3 className="text-2xl font-bold mb-3">
              My Paper Bank
            </h3>

            <p className="text-gray-500 mb-8">
              Access all your uploaded subjects,
              papers and previous analysis reports.
            </p>

            <div className="flex items-center gap-2 font-semibold">
              View Subjects
              <ArrowRight size={18} />
            </div>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl border">
            <h4 className="text-sm text-gray-500">
              Subjects Analyzed
            </h4>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <h4 className="text-sm text-gray-500">
              Papers Uploaded
            </h4>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <h4 className="text-sm text-gray-500">
              Questions Processed
            </h4>

            <p className="text-3xl font-bold mt-2">
              0
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}