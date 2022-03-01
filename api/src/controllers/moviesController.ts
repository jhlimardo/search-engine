import { Request, Response } from "express";
const { Movies } = require("../models/Movies");
const axios = require("axios");
const { Op } = require("@sequelize/core");
require("dotenv").config();
const { APIKey } = process.env;

// Get movies from API and insert them into database
export const getMoviesApi = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    let cant = await Movies.count();
    if (cant === 0) {
      for (let i = 1; i <= 5; i++) {
        let pelis = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=en-US&page=${i}`
        );
        var pelisApi = pelis.data.results;

        if (pelisApi) {
          pelisApi = pelisApi.map(
            (p: {
              id: number;
              title: string;
              backdrop_path: string;
              overview: string;
              shortDescription: string;
            }) => {
              return {
                id: p.id,
                title: p.title.toLowerCase(),
                photo: "https://image.tmdb.org/t/p/w500" + p.backdrop_path,
                description: p.overview,
                shortDescription: p.overview.substring(0, 250) + "...",
              };
            }
          );
        }
        await Movies.bulkCreate(pelisApi);
      }
      return res.send(pelisApi);
    }
    return res.send("Ya existen datos");
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

//Get all movies or get movies by title full or partial
export const getMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const title = req.query.title;
  try {
    if (title) {
      const peliByTitle = await Movies.findAll({
        where: { title: { [Op.like]: `%${title}%` } },
      });
      if (peliByTitle) {
        var resMovie = peliByTitle.map(
          (p: {
            id: number;
            title: string;
            photo: string;
            description: string;
            shortDescription: string;
          }) => {
            return {
              id: p.id,
              title: p.title,
              photo: p.photo,
              description: p.description,
              shortDescription: p.shortDescription,
            };
          }
        );
      }
      return res.send(resMovie);
    } else {
      let pelisDB = await Movies.findAll();
      var resultado = pelisDB.map(
        (p: {
          id: number;
          title: string;
          photo: string;
          description: string;
          shortDescription: string;
        }) => {
          return {
            id: p.id,
            title: p.title,
            photo: p.photo,
            description: p.description,
            shortDescription: p.shortDescription,
          };
        }
      );
    }
    return res.send(resultado);
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server error");
  }
};

export const getMovieById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const movie = await Movies.findAll({
      where: {
        id: req.params.id,
      },
    });
    return res.json(movie);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};
