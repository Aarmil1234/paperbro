import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../services/api";

export default function Subjects() {
  const [subjects, setSubjects] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [name, setName] =
    useState("");

  const [code, setCode] =
    useState("");

  const selectSubject = (
    subject
  ) => {
    localStorage.setItem(
      "selectedSubjectId",
      subject.id
    );

    localStorage.setItem(
      "selectedSubjectName",
      subject.name
    );
  };

  const fetchSubjects =
    async () => {
      try {
        const res =
          await axios.get(
            "/subjects"
          );

        setSubjects(
          res.data.subjects ||
            []
        );
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const createSubject =
    async (e) => {
      e.preventDefault();

      try {
        await axios.post(
          "/subjects",
          {
            name,
            code,
          }
        );

        setName("");
        setCode("");

        fetchSubjects();
      } catch (err) {
        console.log(err);
      }
    };

  const deleteSubject =
    async (id) => {
      if (
        !window.confirm(
          "Delete subject?"
        )
      )
        return;

      try {
        await axios.delete(
          `/subjects/${id}`
        );

        fetchSubjects();
      } catch (err) {
        console.log(err);
      }
    };

  const filtered =
    subjects.filter((s) =>
      s.name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Subjects
        </h1>

        <p className="text-gray-500">
          Manage Subjects
        </p>
      </div>

      <div className="bg-white border rounded-2xl p-6 mb-8">

        <h2 className="font-semibold mb-4">
          Create Subject
        </h2>

        <form
          onSubmit={
            createSubject
          }
          className="grid md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Subject Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
            required
          />

          <input
            type="text"
            placeholder="Subject Code"
            value={code}
            onChange={(e) =>
              setCode(
                e.target.value
              )
            }
            className="border rounded-xl p-3"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white rounded-xl"
          >
            Create Subject
          </button>
        </form>

      </div>

      <input
        type="text"
        placeholder="Search Subject..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="border rounded-xl p-3 w-full mb-6"
      />

      <div className="bg-white border rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="bg-gray-50">

              <th className="p-4 text-left">
                Subject
              </th>

              <th className="p-4 text-left">
                Code
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {filtered.map(
              (subject) => (
                <tr
                  key={
                    subject.id
                  }
                  className="border-t"
                >
                  <td className="p-4">
                    {
                      subject.name
                    }
                  </td>

                  <td className="p-4">
                    {
                      subject.code
                    }
                  </td>

                  <td className="p-4">

                    <div className="flex flex-wrap gap-2">

                      <Link
                        to={`/papers/${subject.id}`}
                        onClick={() =>
                          selectSubject(
                            subject
                          )
                        }
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Papers
                      </Link>

                      <Link
                        to={`/analytics/${subject.id}`}
                        onClick={() =>
                          selectSubject(
                            subject
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Analytics
                      </Link>

                      <Link
                        to={`/predictions/${subject.id}`}
                        onClick={() =>
                          selectSubject(
                            subject
                          )
                        }
                        className="bg-purple-600 text-white px-3 py-1 rounded"
                      >
                        Predictions
                      </Link>

                      <Link
                        to={`/final-paper/${subject.id}`}
                        onClick={() =>
                          selectSubject(
                            subject
                          )
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Final Paper
                      </Link>

                      <Link
                        to={`/answer-book/${subject.id}`}
                        onClick={() =>
                          selectSubject(
                            subject
                          )
                        }
                        className="bg-indigo-600 text-white px-3 py-1 rounded"
                      >
                        Answer Book
                      </Link>

                      <button
                        onClick={() =>
                          deleteSubject(
                            subject.id
                          )
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
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