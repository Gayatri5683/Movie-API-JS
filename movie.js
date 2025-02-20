const apiKey = ""  // Replace with your actual API key




function searchMovies() {
    let query = document.getElementById("searchInput").value;
    if (query.trim() === "") {
        alert("Please enter a movie name!");
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.Search);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            alert("Something went wrong. Please try again.");
        });
}

function displayMovies(movies) {
    let movieResults = document.getElementById("movieResults");
    movieResults.innerHTML = "";

    if (!movies) {
        movieResults.innerHTML = "<p>No movies found.</p>";
        return;
    }

    movies.forEach(movie => {
        let posterImage = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x300?text=No+Image";
        
        let movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        movieCard.addEventListener("click", () => getMovieDetails(movie.imdbID));
        movieResults.appendChild(movieCard);
    });
}

function openMovieDetails(movieID) {
    window.open(`https://www.imdb.com/title/${movieID}`, "_blank");
}

// Handle Enter Key Press in Search
function handleKeyPress(event) {
    if (event.key === "Enter") {
        searchMovies();
    }
}
function getMovieDetails(movieID) {
    fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            showMovieDetails(data);
        })
        .catch(error => console.error("Error fetching movie details:", error));
}

function showMovieDetails(movie) {
    let movieDetails = document.getElementById("movieDetails");
    let movieResults = document.getElementById("movieResults");
    movieDetails.innerHTML = `
    <div class="left-section">
                    <img src="${movie.Poster}" alt="${movie.Title}">
                </div>
                <div class="right-section">
                    <button class="back-button" onclick="goBack()">⬅ Back</button>
                    <h2>${movie.Title}</h2>
                    <p><strong>Year:</strong> ${movie.Year}</p>
                    <p><strong>Genre:</strong> ${movie.Genre}</p>
                    <p><strong>Director:</strong> ${movie.Director}</p>
                    <p><strong>Actors:</strong> ${movie.Actors}</p>
                    <p><strong>Plot:</strong> ${movie.Plot}</p>
                    <button onclick="watchTrailer('${movie.Title}')">Watch Trailer</button>
                </div>
                
    `;


    movieDetails.style.display = "flex";
    document.getElementById("movieResults").style.display = "none";
}



    const themeToggle = document.getElementById("themeToggle");
        const body = document.body;
        const themeIcon = document.getElementById("themeIcon");
        const navItems = document.querySelectorAll(".nav-item");
        
        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            body.classList.toggle("light-mode");
            
            if (body.classList.contains("dark-mode")) {
                themeIcon.src = "icons8-dark-mode-50.png";
                themeIcon.alt = "Dark Mode";
                navItems.forEach(item => {
                    item.style.color = "white";
                    item.style.textShadow = "0 0 10px rgba(255, 0, 0, 0.8)";
                });
            } else {
                themeIcon.src = "icons8-light-mode-50.png";
                themeIcon.alt = "Light Mode";
                navItems.forEach(item => {
                    item.style.color = "black";
                    item.style.textShadow = "none";
                });
            }
            
            navItems.forEach(item => {
                item.style.color = body.classList.contains("dark-mode") ? "black" : "white";
            });
        });

function goBack() {
    document.getElementById("movieDetails").style.display = "none";
    document.getElementById("movieResults").style.display = "grid";
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        searchMovies();
    }
}

function watchTrailer(movieTitle) {
    const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)}+trailer`;
    window.open(trailerUrl, '_blank');
}