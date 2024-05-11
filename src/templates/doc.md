###

base url `{{url}}`
| options | description | defaultValue |
| :-------- | :-----------|:----------- |
| where |`{{params_where}}` | `undefined` |
| include |`{{params_include}}` | `undefined` |

### Function

```js
const options = {
  where: {
    contentTypeId: {{type_id}},
  },
}
```

## Function

```js
// import getContents
import { getContents } from "@service/r_content";
// call with parameter
getContents(options)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

## REAST API

```js
async function getContent() {
  const urlWithParams = new URL("{{url}}");
  Object.keys(options).forEach((key) =>
    urlWithParams.searchParams.append(key, params[key])
  );

  const response = await fetch(urlWithParams);
  const data = await response.json();
  console.log(data);
}
```
