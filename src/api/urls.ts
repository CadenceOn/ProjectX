export const film = {
    get(id: number) {
        return `/api/v2.2/films/${id}`;
    },
    getSeasons(id: number) {
        return `/api/v2.2/films/${id}/seasons`;
    },
    getFacts(id: number) {
        return `/api/v2.2/films/${id}/facts`;
    },
    getDistributions(id: number) {
        return `/api/v2.2/films/${id}/distributions`;
    },
    getBoxOffice(id: number) {
        return `/api/v2.2/films/${id}/box_office`;
    },
    getAwards(id: number) {
        return `/api/v2.2/films/${id}/awards`;
    },
    getTrailer(id: number) {
        return `/api/v2.2/films/${id}/videos`;
    },
    getSimilars(id: number) {
        return `/api/v2.2/films/${id}/similars`;
    },
    getImage(id: number) {
        return `/api/v2.2/films/${id}/images`;
    },
    getReviews(id: number) {
        return `/api/v2.2/films/${id}/reviews`;
    },
};

export const listFilm = {
    getListFilmTop() {
        return `/api/v2.2/films/top`;
    },
    getPremieres() {
        return `/api/v2.2/films/premieres`;
    },
    getFilterGenre() {
        return `/api/v2.2/films/filters`;
    },
    getListFilter() {
        return `/api/v2.2/films`;
    },
    getListSequelsAndPrequels(id: number) {
        return `/api/v2.1/films/${id}/sequels_and_prequels`;
    },
    getListSearchByName() {
        return `/api/v2.1/films/search-by-keyword`;
    },
};

export const watchFilm = {
    getPlayerInformation(id:number){
        return `https://dontplayfb.top/kinobox/index.php?kinopoisk=${id}`
    },
    getPlayerOne(movieId: string) {
        return `https://thesaurus.allarknow.online/?token_movie=${movieId}&token=45e20a5f584becf7a64dffb7174ddf&null=`;
    },
    getPlayerTwo(movieId: string) {
        return `https://api.embess.ws/embed/movie/${movieId}?null=`;
    },
    getPlayerThree(movieId: string) {
        return `https://vid1736157775.fotpro135alto.com/movie/${movieId}/iframe?null=`;
    },
    getWatchMovieInfo(kinopoiskId:number){
        return `https://api.apbugall.org/?token=45e20a5f584becf7a64dffb7174ddf&kp=${kinopoiskId}`
    }
};
