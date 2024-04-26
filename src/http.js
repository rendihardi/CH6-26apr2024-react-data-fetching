export async function updatePlaces(places) {
  fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify([places]),
    headeers: {
      "content-type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("failed to update user data");
  }
}
