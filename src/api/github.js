// src/api/github.js
export const getContentFromGitHub = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/anaskhanmak/custom-wordpress/main/content.json"
  );
    const data = await response.json();
    console.log(data);
    
  return data;
};


// src/api/github.js
export const updateJSONOnGitHub = async (newData) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN; // Testing only
  const owner = "anaskhanmak";
  const repo = "custom-wordpress";
  const path = "content.json";

  // Step 1 — Get current file SHA
  const fileRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
  const fileData = await fileRes.json();

  // Step 2 — Update file
  await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update content from admin panel",
        content: btoa(JSON.stringify(newData, null, 2)),
        sha: fileData.sha,
      }),
    }
  );

  alert("JSON Updated 🚀");
};