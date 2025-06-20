import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Home() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    if (isEditing) {
      // Update existing
      setItems(
        items.map((item) =>
          item.id === form.id ? { ...item, name: form.name, description: form.description } : item
        )
      );
      setIsEditing(false);
    } else {
      // Create new
      setItems([...items, { id: Date.now(), name: form.name, description: form.description }]);
    }
    setForm({ id: null, name: "", description: "" });
  };

  // Edit an item
  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  // Delete an item
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.id !== id));
      // Reset form if editing the deleted item
      if (isEditing && form.id === id) {
        setForm({ id: null, name: "", description: "" });
        setIsEditing(false);
      }
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-6 text-center">Manage Items</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto mb-10 p-6 bg-white rounded shadow"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter description"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          {isEditing ? "Update Item" : "Add Item"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setForm({ id: null, name: "", description: "" });
            }}
            className="ml-4 px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Items List */}
      <div className="max-w-4xl mx-auto overflow-x-auto">
        {items.length === 0 ? (
          <p className="text-center text-gray-500">No items added yet.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Description</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ id, name, description }) => (
                <tr key={id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{name}</td>
                  <td className="px-4 py-2">{description || <em className="text-gray-400">No description</em>}</td>
                  <td className="px-4 py-2 space-x-2 text-center">
                    <button
                      onClick={() => handleEdit({ id, name, description })}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
