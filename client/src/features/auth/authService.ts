const API_URL = "http://localhost:3000/api/administrator/";

// Register user
async function register(userData: object) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  if (response.ok && data) {
    localStorage.setItem("user", JSON.stringify(data));
  } else {
    throw new Error(data.message);
  }

  return data;
}

// Login user
async function login(userData: object) {
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();

  if (response.ok && data) {
    localStorage.setItem("user", JSON.stringify(data));
  } else {
    throw new Error(data.message);
  }

  return data;
}

// Logout user
// This is a simple function, has to be updated in the future for a safer option
async function logout() {
  localStorage.removeItem("user");
}

const authService = {
  register,
  logout,
  login,
};

export default authService;
