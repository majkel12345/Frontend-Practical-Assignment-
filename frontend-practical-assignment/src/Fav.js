import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { actionTypes } from "./reducer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import "./Fav.css";

const Fav = () => {
  const [{ term }, dispatch] = useStateValue();
  const [favourites, setFavourites] = useState(term);

  useEffect(() => {
    dispatch({
      type: actionTypes.ADD_FAV,
      term: favourites,
    });
  }, [favourites]);

  const handleOnClick = (value) => {
    setFavourites(favourites.filter((obj) => obj.mid !== value.mid));
  };

  const handleOnRemove = (e) => {
    e.preventDefault();
    setFavourites([]);
  };

  return (
    <div className="fav__container">
      <Link to="/">List</Link>
      <h1>Favourites</h1>
      <button onClick={handleOnRemove}>Remove all Favourites</button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Rate mid</TableCell>
            <TableCell>
              <FavoriteBorderIcon />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {term.map((rate, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{rate.currency}</TableCell>
                <TableCell>{rate.code}</TableCell>
                <TableCell>{rate.mid}</TableCell>
                <TableCell onClick={() => handleOnClick(rate)}>
                  <FavoriteIcon />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Fav;
