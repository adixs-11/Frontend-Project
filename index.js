function themeToggle(value){

    localStorage.setItem("theme", value);

    if (value == "light"){
        document.body.classList.add("light");
    }else {
        document.body.classList.remove("light");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
        themeToggle(savedTheme);

        const toggle = document.getElementById("themeToggle");

        if (toggle) {
            toggle.value = savedTheme;
        }
    }
});