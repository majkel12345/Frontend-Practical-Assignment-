import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const List = () => {
  const [rates, setRates] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://api.nbp.pl/api/exchangerates/tables/a/")
      .then((response) => response.json())
      .then((data) => {
        setRates(data[0]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>List</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Rate mid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rates.rates.map((rate, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{rate.currency}</TableCell>
                    <TableCell>{rate.code}</TableCell>
                    <TableCell>{rate.mid}</TableCell>
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
