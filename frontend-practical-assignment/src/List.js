import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { actionTypes } from "./reducer";
import "./List.css";

const List = () => {
  const [{ term }, dispatch] = useStateValue();
  const [rates, setRates] = useState();
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [fav, setFav] = useState(term);

  useEffect(() => {
    fetch("http://api.nbp.pl/api/exchangerates/tables/a/")
      .then((response) => response.json())
      .then((data) => {
        setRates(data[0]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    dispatch({
      type: actionTypes.ADD_FAV,
      term: fav,
    });
  }, [fav]);

  const handleOnClick = (value) => {
    if (fav.includes(value)) {
      setFav(fav.filter((obj) => obj !== value));
    } else {
      setFav([...fav, value]);
    }
  };

  return (
    <div className="container">
      <Link to="/fav">Favourites</Link>
      <h1>List</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Autocomplete
            id="combo-box-demo"
            options={rates.rates}
            getOptionLabel={(option) => option.currency}
            style={{ width: 300 }}
            onInputChange={(event, value) => setInputValue(value)}
            renderInput={(params) => (
              <TextField {...params} label="Find rates" variant="outlined" />
            )}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Rate mid</TableCell>
                <TableCell>
                  <FavoriteIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates.rates
                .filter((rate) => {
                  return rate.currency.includes(inputValue);
                })
                .map((rate, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{rate.currency}</TableCell>
                      <TableCell>{rate.code}</TableCell>
                      <TableCell>{rate.mid}</TableCell>
                      <TableCell onClick={() => handleOnClick(rate)}>
                        {term.find((img) => {
                          return img.code === rate.code;
                        }) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default List;
