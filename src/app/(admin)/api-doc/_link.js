import path from "path";

export const apiDocLinks = {
  home: (path) => `/api-doc/${path || ""}`,
  content: (type_id) => `/api-doc/content${type_id ? `/${type_id}` : ""}`,
};
