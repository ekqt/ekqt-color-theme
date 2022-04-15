const storageKey = "theme-preference";
const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey);
  else
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
};
const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};
const reflectPreference = () => {
  document.firstElementChild.setAttribute("data-theme", theme.value);
  if (document.querySelector("#theme-toggle")) {
    document
      .querySelector("#theme-toggle")
      ?.setAttribute("aria-label", theme.value);
  }
};
const theme = {
  value: getColorPreference()
};
const onClick = () => {
  theme.value = theme.value === "light" ? "dark" : "light";
  setPreference();
};
reflectPreference();
window.onload = () => {
  reflectPreference();
  document.querySelector("#theme-toggle").addEventListener("click", onClick);
};
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    theme.value = isDark ? "dark" : "light";
    setPreference();
  });
