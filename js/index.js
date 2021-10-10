import { searchPlants } from "./main";
import { getImageLocalPath } from "./api";

export const getPlantsData = async (response) => {
  try {
    const plants = await response.json();

    return plants;
  } catch (err) {
    return null;
  }
};

export const createPlants = (data) => {
  const plants = [];

  for (let item of data) {
    const plant = new PlantCard(item);

    plants.push(plant);
  }

  return plants;
};

export const createDOMPlants = (plants) => {
  const DOMPlants = [];

  for (let plant of plants) {
    const DOMPlant = plant.generateElement();

    DOMPlants.push(DOMPlant);
  }

  return DOMPlants;
};

const getSun = (amount) => {
  switch (amount) {
    case "no":
      return ["images/icons/no-sun.svg", "No sun at all"];
    case "low":
      return ["images/icons/low-sun.svg", "Low sun"];
    case "high":
      return ["images/icons/high-sun.svg", "A lot of sun"];
    default:
      return [null, null];
  }
};

const getWater = (amount) => {
  switch (amount) {
    case "rarely":
      return ["images/icons/1-drop.svg", "Too little water"];
    case "regularly":
      return ["images/icons/2-drops.svg", "Good amount of water"];
    case "daily":
      return ["images/icons/3-drops.svg", "A lot of water"];
    default:
      return [null, null];
  }
};

const getToxicity = (toxicity) => {
  switch (toxicity) {
    case false:
      return ["images/icons/pet.svg", "Pet friendly"];
    case true:
      return ["images/icons/toxic.svg", "Really toxic"];
    default:
      return [null, null];
  }
};

const watcher = {
    create: (event, target, callback) => {
      target.addEventListener(event, callback);
    }
};

function PlantCard({
  id,
  name,
  sun,
  water,
  url,
  price,
  toxicity,
  staff_favorite
}) {
  this.id = id;
  this.name = name;
  this.sun = sun;
  this.water = water;
  this.url = getImageLocalPath(url);
  this.price = price;
  this.toxicity = toxicity;
  this.staff_favorite = staff_favorite;
}

PlantCard.prototype.generateElement = function () {
  const DOMCard = document.createElement("section");
  DOMCard.classList.add("plant-card", "flow");

  if (this.staff_favorite) DOMCard.classList.add("plant-card--favorite");

  const [sunImg, sunAlt] = getSun(this.sun);
  const [waterImg, waterAlt] = getWater(this.water);
  const [toxicityImg, toxicityAlt] = getToxicity(this.toxicity);

  const DOMCardContent = `
    <div class="plant-card__image">
      <img src="${this.url}" alt="Image of ${this.name}" />
    </div>
    <div class="plant-card__info">
      <p class="plant-card__name">${this.name}</p>
      <div class="plant-card__details">
        <p class="plant-card__price">$${this.price}</p>
        <div class="plant-card__icons">
          <img src="${toxicityImg}" alt="${toxicityAlt}" />
          <img src="${sunImg}" alt="${sunAlt}" />
          <img src="${waterImg}" alt="${waterAlt}" />
        </div>
      </div>
    </div>
  `;

  console.log(toxicityImg);

  console.log(toxicityAlt);

  DOMCard.innerHTML = DOMCardContent;

  return DOMCard;
};

watcher.create("change", document.getElementById("menu"), searchPlants);
