/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                body: ["DM Sans", "sans-serif"],
            },
            colors: {
                primary: "#F62682",
                secondary: "#6F5CF1",
            },
        },
    },
    plugins: [],
};
