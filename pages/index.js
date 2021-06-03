import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(undefined);

  const getPosts = async () => {
    const query = `/api/posts${lastEvaluatedKey ? `?lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}` : ''}`;
    console.log(`@@query`, query);
    const fetchData = await fetch(query);
    const result = await fetchData.json();
    console.log(`@@result`, result);
    const { Items, LastEvaluatedKey } = result;
    console.log(`@@Items`, Items);
    console.log(`@@LastEvaluatedKey`, LastEvaluatedKey);
    setPosts([...posts, ...Items]);
    setLastEvaluatedKey(LastEvaluatedKey);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <ul>
      {posts.map((post) => {
        return(
          <li key={`${post.link.S}`}>
            <p>{post.title.S}</p>
          </li>
        )
      })}
      </ul>
      <button onClick={getPosts}>Load More</button>
    </div>
  )
}
