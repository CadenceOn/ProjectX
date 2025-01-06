import * as types from "../api/types";
import * as services from "../api/services";
import { makeAutoObservable } from "mobx";

class Movie {
    constructor() {
        makeAutoObservable(this);
    }

    public readonly getMovie = services.Movie.getMovie;
    public readonly getSeasons = services.Movie.getSeasons;
    public readonly getFacts = services.Movie.getFacts;
    public readonly getDistributions = services.Movie.getDistributions;
    public readonly getBoxOffice = services.Movie.getBoxOffice;
    public readonly getAwards = services.Movie.getAwards;
    public readonly getVideo = services.Movie.getVideo;
    public readonly getSimilars = services.Movie.getSimilars;
    public readonly getImages = services.Movie.getImages;
    public readonly getReviews = services.Movie.getReviews;
}

class ListInfo {
    constructor() {
        makeAutoObservable(this);
    }

    public readonly getList = services.ListMovie.getListTop;
    public readonly getPremieres = services.ListMovie.getPremieres;
    public readonly getFilters = services.ListMovie.getFilters;
    public readonly getFilmsFilter = services.ListMovie.getFilmsFilter;
    public readonly getSequelsAndPrequels =
        services.ListMovie.getSequelsAndPrequels;
    public readonly getSearch = services.ListMovie.getSearch;
}

class WatchMovie{
    constructor(){
        makeAutoObservable(this);
    }
    public readonly getWatchMovieInfo = services.WatchMovie.getMovie;
    public readonly getPlayerInfo = services.WatchMovie.getPlayerInfo;
}

export class Store {
    public readonly movie = new Movie();
    public readonly list = new ListInfo();
    public readonly watchMovie = new WatchMovie();
    public loader = false;
    public error = 0;
    public bookmarks: types.Bookmarks[] = [];

    constructor() {
        makeAutoObservable(this);
        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this);
        this.loadFromLocalStorage();
    }

    toggleBookmark(movie: types.Bookmarks) {
        const index = this.bookmarks.some(
            (item) => item.filmId === movie.filmId
        );
        if (index) {
            this.bookmarks = this.bookmarks.filter(
                (item) => item.filmId !== movie.filmId
            );
        } else {
            this.bookmarks.push(movie); 
        }
        this.saveToLocalStorage();
    }

    loadFromLocalStorage() {
        const storedBookmarks = localStorage.getItem("bookmarks");
        if (storedBookmarks) {
            this.bookmarks = JSON.parse(storedBookmarks);
        }
    }

    saveToLocalStorage() {
        localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    }
}
