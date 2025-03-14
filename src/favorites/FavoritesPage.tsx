// src/favorites/FavoritesPage.tsx
import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Context } from "../store/context";
import styled from "styled-components";
import './FavoritesPage.css';

const FavoritesPage = () => {
    const { store } = useContext(Context);

    return (
        <Container>
            <Title>Ваши закладки</Title>
            {store.bookmarks.length > 0 ? (
                <Grid>
                    {store.bookmarks.map((movie) => (
                        <Card key={movie.filmId}>
                            {/* Оборачиваем часть карточки в Link для навигации */}
                            <StyledLink to={`/project_x/movies/${movie.filmId}`}>
                                <Poster image={movie.image} />
                                <Details>
                                    <h3>{movie.name}</h3>
                                    <p>{movie.rating}</p>
                                </Details>
                            </StyledLink>
                            <RemoveButton onClick={() => store.toggleBookmark(movie)}>
                                Удалить из закладок
                            </RemoveButton>
                        </Card>
                    ))}
                </Grid>
            ) : (
                <EmptyMessage>Нет закладок.</EmptyMessage>
            )}
        </Container>
    );
};

export default observer(FavoritesPage);

// Стили
const Container = styled.div`
    padding: 20px;
    color: var(--white);
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;

const Card = styled.div`
    background-color: var(--secondary);
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Poster = styled.div<{ image: string }>`
    width: 100%;
    height: 300px;
    background-image: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    margin-bottom: 10px;
`;

const Details = styled.div`
    h3 {
        font-size: 18px;
        margin: 10px 0;
    }
    p {
        font-size: 14px;
        color: var(--creator);
    }
`;

const RemoveButton = styled.button`
    background-color: #ff5555;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
        background-color: #ff2222;
    }
`;

const EmptyMessage = styled.p`
    font-size: 18px;
    text-align: center;
    color: var(--creator);
`;
