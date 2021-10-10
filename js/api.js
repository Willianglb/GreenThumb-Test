export const api = {
  request: fetch,
  baseURL: "https://front-br-challenges.web.app/api/v2/green-thumb/",
  options: {
    method: "GET"
  }
};

export const buildURL = (baseURL, answers) => {
  const queries = [];

  for (let key in answers) {
    queries.push(`${key}=${answers[key]}`);
  }

  const url = `${baseURL}?${queries.join("&")}`;

  return url;
};

export const getImageLocalPath = (url) => {
  const parts = url.split("/");
  const location = parts[parts.length - 1].split(".");
  const name = location[0];

  const path = `images/plants/${name}.jpg`;

  return path;
};
