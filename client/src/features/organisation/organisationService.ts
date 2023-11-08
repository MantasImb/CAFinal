const API_URL = "http://localhost:3000/api/organisation/";

// Register organisation
async function register(organisationData: object, token: string) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(organisationData),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}

// Get organisation that user is part of
async function getOwnerOrganisation(token: string) {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error(data.message);

  return data;
}

// Register a new reservation
async function registerReservation(
  organisationId: string,
  reservationData: object,
  token: string
) {
  const response = await fetch(API_URL + organisationId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reservationData),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}

// Update a reservation date
async function updateReservationDate(
  organisationId: string,
  reservationId: string,
  timestamp: number,
  token: string
) {
  const response = await fetch(API_URL + organisationId, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reservationId, timestamp }),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}

// Delete a reservation
async function deleteReservation(
  organisationId: string,
  reservationId: string,
  token: string
) {
  const response = await fetch(API_URL + organisationId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reservationId }),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data;
}

const organisationService = {
  register,
  getOwnerOrganisation,
  registerReservation,
  updateReservationDate,
  deleteReservation,
};

export default organisationService;
