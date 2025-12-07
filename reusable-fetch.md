To fetch the data and show

```ts
export const fetchAPI = async (url: string, setLoading: (value: boolean) => void,
options?: {
    headers?: Record<string, string>;
  }
) => {
  setLoading(true);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch API error:", error);
    return false;
  } finally {
    setLoading(false);
  }
};
```

Examples

```tsx
const fetchVideosData = async () => {
        const video = await fetchAPI("http://localhost:5000/api/details/", setLoading, {headers: { Accept: "application/json" }})
        if(video){setVideosData(video.data)}
}
const fetchPostsData = async () => {
        const post = await fetchAPI("https://jsonplaceholder.typicode.com/posts/",setLoading);
        if (post) {setPostsData(post);}
}
```
