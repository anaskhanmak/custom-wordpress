// src/AdminPanel.jsx
import { useEffect, useState } from "react";
import { getContentFromGitHub, updateJSONOnGitHub } from "../api/github";

function AdminPanel() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    getContentFromGitHub().then(setContent);
  }, []);

  if (!content) return <p>Loading...</p>;

  const toggleBanner = () => {
    const newContent = { ...content };
    newContent.home.sections.banner.show = !newContent.home.sections.banner.show;
    setContent(newContent);
  };

  const toggleWhyAuthors = () => {
    const newContent = { ...content };
    newContent.home.sections.whyAuthors.show = !newContent.home.sections.whyAuthors.show;
    setContent(newContent);
  };

  const saveChanges = () => {
    updateJSONOnGitHub(content);
  };

  return (
    <div className="p-6">
      <h1>Admin Panel</h1>

      <div className="my-4">
        <label>
          <input
            type="checkbox"
            checked={content.home.sections.banner.show}
            onChange={toggleBanner}
          />{" "}
          Show Banner Section
        </label>
      </div>

      <div className="my-4">
        <label>
          <input
            type="checkbox"
            checked={content.home.sections.whyAuthors.show}
            onChange={toggleWhyAuthors}
          />{" "}
          Show Why Authors Section
        </label>
      </div>

      <button
        onClick={saveChanges}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Changes
      </button>

      <pre className="mt-4">{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
}

export default AdminPanel;