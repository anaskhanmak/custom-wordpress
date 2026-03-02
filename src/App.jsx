import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useState } from "react";
import { getContentFromGitHub } from "./api/github";
function App() {
  const [content, setContent] = useState(null);
  useEffect(() => {
    getContentFromGitHub().then(setContent);
  }, []);

  if (!content) return <p>Loading...</p>;

  return (
    <>
      <div>
      {content.home.sections.banner.show && (
        <section className="banner">
          <h1>Banner Section</h1>
        </section>
      )}

      {content.home.sections.whyAuthors.show && (
        <section>
          <h2>Why Authors Section</h2>
        </section>
      )}
    </div>
    </>
  )
}

export default App
