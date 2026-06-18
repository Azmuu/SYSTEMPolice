import { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import NavSide from "../components/NavSIde";

const ITEMS_PER_PAGE = 5;

function ViewPolicies() {
  const [policies, setPolicies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPolicies = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/policies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Policies response data:", res.data);
      setPolicies(res.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
      toast.error("❌ Failed to load policies.");
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleEditClick = (policy) => {
    setEditingId(policy.id);
    setEditData(policy);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:4000/api/policies/${editData.id}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("✅ Policy updated successfully!");
      setEditingId(null);
      fetchPolicies(); // Refresh list
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update policy.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this policy?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/policies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("🗑️ Policy deleted successfully!");
      fetchPolicies();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete policy.");
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const filtered = policies.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const displayed = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <>
      <NavSide />
      <div className="max-w-6xl mx-auto p-6 mt-10 ml-64">
        <h2 className="text-3xl font-bold mb-4 text-center text-blue-600 dark:text-blue-300">📋 View Policies</h2>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="mb-6 w-full px-4 py-2 rounded-xl border dark:bg-gray-800 dark:text-white"
        />

        {displayed.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">No policies found.</p>
        ) : (
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-900">
              <thead className="bg-blue-100 dark:bg-blue-800">
                <tr>
                  <th className="text-left p-3">Title</th>
                  <th className="text-left p-3">Full Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((p) => (
                  <tr key={p.id} className="border-t border-gray-300 dark:border-gray-700">
                    {editingId === p.id ? (
                      <>
                        <td className="p-2">
                          <input name="title" value={editData.title} onChange={handleChange}
                            className="w-full px-2 py-1 rounded dark:bg-gray-700 dark:text-white" />
                        </td>
                        <td className="p-2">
                          <input name="fullName" value={editData.fullName} onChange={handleChange}
                            className="w-full px-2 py-1 rounded dark:bg-gray-700 dark:text-white" />
                        </td>
                        <td className="p-2">
                          <input name="email" value={editData.email} onChange={handleChange}
                            className="w-full px-2 py-1 rounded dark:bg-gray-700 dark:text-white" />
                        </td>
                        <td className="p-2">
                          <input name="date" type="date" value={editData.date} onChange={handleChange}
                            className="w-full px-2 py-1 rounded dark:bg-gray-700 dark:text-white" />
                        </td>
                        <td className="p-2 flex gap-3">
                          <button onClick={handleSave} className="text-green-600 hover:text-green-800">
                            <FaSave />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 text-gray-900 dark:text-white">{p.title}</td>
                        <td className="p-2 text-gray-900 dark:text-white">{p.fullName}</td>
                        <td className="p-2 text-gray-900 dark:text-white">{p.email}</td>
                        <td className="p-2 text-gray-900 dark:text-white">{p.date}</td>
                        <td className="p-2 flex gap-3">
                          <button onClick={() => handleEditClick(p)} className="text-blue-600 hover:text-blue-800">
                            <FaEdit />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">
                            <FaTrash />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default ViewPolicies;
