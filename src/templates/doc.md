### base url

| -       | -            |
| :------ | :----------- |
| baseurl | `{{url}}`    |
| params  | `{{params}}` |

# client Site using

```jsx
"use client";
//....
const [loading, setLoading] = useState(false);
const [result, setResult] = useState();
const [err, setErr] = useState(false);

const load = async () => {
  setLoading(true);
  await fetch("{{url}}")
    .then(async (response: any) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const d = await response.json();
      setResult(d);
    })
    .catch((err: any) => {
      setErr(err);
    })
    .finally(() => {
      setLoading(false);
    });
};
useEffect(() => {
  load();
}, []);
return (
  <div>
    {loading && "loading"}
    {err && "err"}
    {result && <JSONTree data={result} />}
  </div>
);
//...
```
