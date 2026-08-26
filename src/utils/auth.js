const FAKE_TOKEN = "stage-one-demo-token";
const RESPONSE_DELAY = 400;

function simulateRequest(result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), RESPONSE_DELAY);
  });
}

export function register(email, password, name) {
  const user = { email, name };
  localStorage.setItem("user", JSON.stringify(user));
  return simulateRequest(user);
}

export function authorize(email) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user =
    storedUser && storedUser.email === email
      ? storedUser
      : { email, name: email.split("@")[0] };
  localStorage.setItem("user", JSON.stringify(user));
  return simulateRequest({ token: FAKE_TOKEN, user });
}

export function checkToken(token) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (token === FAKE_TOKEN && user) {
    return simulateRequest(user);
  }
  return Promise.reject(new Error("Invalid token"));
}
