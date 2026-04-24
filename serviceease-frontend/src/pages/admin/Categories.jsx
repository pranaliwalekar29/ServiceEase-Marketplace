import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCategories, createCategory } from "../../api/adminApi";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const loadCategories = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createCategory({ name, description });
      setName("");
      setDescription("");
      loadCategories();
      alert("Category created successfully");
    } catch {
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Manage Categories</h2>
        <p className="text-gray-600 text-sm">Create and organize service categories. These help customers find what they're looking for.</p>
      </div>

      <form
        onSubmit={handleCreateCategory}
        className="bg-white p-4 rounded shadow-sm max-w-md mb-8"
      >
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          required
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>

      <ul className="space-y-3 max-w-2xl">
        {categories.map((cat) => (
          <li key={cat.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <p className="font-semibold text-gray-800">{cat.name}</p>
            {cat.description && (
              <p className="text-sm text-gray-600 mt-2">
                {cat.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </DashboardLayout>
  );
};

export default Categories;
