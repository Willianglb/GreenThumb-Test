import { api, buildURL } from "./api";
import { getPlantsData, createPlants, createDOMPlants } from "./index";

const getSelects = () => {
  const DOMFilterSun = document.getElementById("filter-sun");
  const DOMFilterWater = document.getElementById("filter-water");
  const DOMFilterPets = document.getElementById("filter-pets");

  return [DOMFilterSun, DOMFilterWater, DOMFilterPets];
};

const getAnswers = (selects) => {
  const answers = {};

  for (let item of selects) {
    const {
      value,
      dataset: { key }
    } = item;

    if (!value) return [false, null];

    answers[key] = value;
  }

  return [true, answers];
};

const hidePlants = () => {
  const DOMNoResult = document.getElementById("no-result");
  DOMNoResult.classList.remove("hidden");

  const DOMSearchResults = document.getElementById("search-results");
  DOMSearchResults.classList.add("hidden");
};

const showPlants = () => {
  const DOMNoResult = document.getElementById("no-result");
  DOMNoResult.classList.add("hidden");

  const DOMSearchResults = document.getElementById("search-results");
  DOMSearchResults.classList.remove("hidden");
};

const renderPlants = (DOMPlants) => {
  const DOMPlantsWrapper = document.getElementById("plants");

  DOMPlantsWrapper.replaceChildren(...DOMPlants);
};

export const searchPlants = async (event) => {
  const { request, baseURL, options } = api;
  const selects = getSelects();
  const [areAnswered, answers] = getAnswers(selects);

  if (!areAnswered) return;

  const url = buildURL(baseURL, answers);
  const response = await request(url, options);
  const data = await getPlantsData(response);

  if (!data || data.error) {
    hidePlants();
    return;
  }

  const plants = createPlants(data);
  const DOMPlants = createDOMPlants(plants);

  showPlants();
  renderPlants(DOMPlants);
};
