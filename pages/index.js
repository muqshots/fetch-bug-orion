import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [result, setResult] = useState();
  const query = router.query.query || "No query";
  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/blah?query=${query}`, { signal: AbortController.signal })
      .then((res) => res.json())
      .then((data) => {
        setResult(data.text);
      });
    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => router.push(`/?query=${e.target.value}`)}
      />
      <div>{JSON.stringify(result)}</div>
    </div>
  );
}
