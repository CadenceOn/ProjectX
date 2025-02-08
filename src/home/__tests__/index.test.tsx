import { describe, test } from "@jest/globals"
import {render, screen } from "@testing-library/react"
import HomePage from "../HomePage"
import React from "react"
import { BrowserRouter} from "react-router-dom";
import { ListMovie } from "../../api/services";

const Wrapper = ({children}) => <BrowserRouter>{children}</BrowserRouter>

describe('home', () => {

    test('рендер проверка ', () => {

        render(<HomePage/>, {wrapper: Wrapper})

    })

    test('load films',  async () => {
        const getFilmsFilterspy = jest.spyOn(ListMovie, 'getFilmsFilter')
        getFilmsFilterspy.mockResolvedValue({
            "total": 100,
            "totalPages": 5,
            "items": [
                {
                    "kinopoiskId": 1201206,
                    "imdbId": null,
                    "nameRu": null,
                    "nameEn": null,
                    "nameOriginal": "BTS: Blood Sweat & Tears",
                    "countries": [
                        {
                            "country": "Корея Южная"
                        }
                    ],
                    "genres": [
                        {
                            "genre": "музыка"
                        },
                        {
                            "genre": "короткометражка"
                        }
                    ],
                    "ratingKinopoisk": 9.4,
                    "ratingImdb": null,
                    "year": 2016,
                    "type": "VIDEO",
                    "posterUrl": "https://kinopoiskapiunofficial.tech/images/posters/kp/1201206.jpg",
                    "posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/1201206.jpg"
                },
                {
                    "kinopoiskId": 1252447,
                    "imdbId": "tt9257638",
                    "nameRu": "Лорды раздевалки",
                    "nameEn": null,
                    "nameOriginal": "Lords of the Lockerroom",
                    "countries": [
                        {
                            "country": "США"
                        }
                    ],
                    "genres": [
                        {
                            "genre": "спорт"
                        },
                        {
                            "genre": "для взрослых"
                        }
                    ],
                    "ratingKinopoisk": 9.4,
                    "ratingImdb": 9.4,
                    "year": 1999,
                    "type": "VIDEO",
                    "posterUrl": "https://kinopoiskapiunofficial.tech/images/posters/kp/1252447.jpg",
                    "posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/1252447.jpg"
                },
                {
                    "kinopoiskId": 1072974,
                    "imdbId": "tt13535142",
                    "nameRu": "Герои Энвелла",
                    "nameEn": null,
                    "nameOriginal": null,
                    "countries": [
                        {
                            "country": "Россия"
                        }
                    ],
                    "genres": [
                        {
                            "genre": "фантастика"
                        },
                        {
                            "genre": "мультфильм"
                        },
                        {
                            "genre": "детский"
                        }
                    ],
                    "ratingKinopoisk": 9.3,
                    "ratingImdb": null,
                    "year": 2017,
                    "type": "TV_SERIES",
                    "posterUrl": "https://kinopoiskapiunofficial.tech/images/posters/kp/1072974.jpg",
                    "posterUrlPreview": "https://kinopoiskapiunofficial.tech/images/posters/kp_small/1072974.jpg"
                },
               
            ]
        })


        render(<HomePage/>, {wrapper: Wrapper})

        const filmcard = await screen.findByText('Герои Энвелла') 
        expect(filmcard).toBeInTheDocument();

    })

})