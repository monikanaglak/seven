export let getting_data = async () => {
  return fetch("../data/recepis.json")
    .then((response) => response.json())
    .then((data) => data);
};
export let queen = [];

export function update_queen(data) {
  queen = data;
}

export let all_elements = [];
