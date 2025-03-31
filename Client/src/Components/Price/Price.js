import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Box, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, InputAdornment } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { updatePrices } from "../../Redux/Actions/globalActions"
import { blue } from '@mui/material/colors'

export default function Price() {
    const dispatch = useDispatch()
    const { prices } = useSelector(state => state.global)

    const [updatedPrices, setUpdatedPrices] = useState(() => prices)

    useEffect(() => {
        setUpdatedPrices(prices)
    }, [prices])

    const handleChange = (id, field, value) => {
        setUpdatedPrices(prevPrices =>
            prevPrices.map(item =>
                item.id_price === id ? { ...item, [field]: parseFloat(value) || 0 } : item
            )
        )
    }

    const handleConfirm = () => {
        dispatch(updatePrices(updatedPrices))
    }

    const handleAddNewPrice = () => {
        const newPrice = {
            id_price: Date.now(),
            unit_price: 0,
            disc_2: 0,
            disc_3: 0,
            disc_4: 0,
            disc_5: 0
        }
        setUpdatedPrices(prevPrices => [...prevPrices, newPrice])
    }

    const handleDeletePrice = (id) => {
        setUpdatedPrices(prevPrices => prevPrices.filter(price => price.id_price !== id))
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
                <Button onClick={handleAddNewPrice} variant="contained">Afegir nou preu</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ py: 3, color: blue[800], fontWeight: "bold" }}>Id_preu</TableCell>
                            <TableCell sx={{ py: 3, color: blue[800], fontWeight: "bold" }}>Preu unitari</TableCell>
                            <TableCell sx={{ py: 3, color: blue[800], fontWeight: "bold" }}>Desc. 2 classes</TableCell>
                            <TableCell sx={{ py: 3, color: blue[800], fontWeight: "bold" }}>Desc. 3 classes</TableCell>
                            <TableCell sx={{ py: 3, color: blue[800], fontWeight: "bold" }}>Desc. 4 classes</TableCell>
                            <TableCell sx={{ py: 3, color: blue[800], fontWeight: "bold" }}>Desc. 5 classes</TableCell>
                            <TableCell sx={{ py: 3, color: blue[800], fontWeight: "bold" }}>Eliminar preu</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {updatedPrices.map((item) => (
                            <TableRow key={item.id_price}>
                                <TableCell sx={{ py: 3 }}>{item.id_price}</TableCell>
                                <TableCell sx={{ py: 3 }}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        value={item.unit_price}
                                        onChange={(e) => handleChange(item.id_price, "unit_price", e.target.value)}
                                        fullWidth
                                        inputProps={{ step: "0.01" }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 3 }}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        value={item.disc_2}
                                        onChange={(e) => handleChange(item.id_price, "disc_2", e.target.value)}
                                        fullWidth
                                        inputProps={{ step: "0.01" }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 3 }}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        value={item.disc_3}
                                        onChange={(e) => handleChange(item.id_price, "disc_3", e.target.value)}
                                        fullWidth
                                        inputProps={{ step: "0.01" }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 3 }}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        value={item.disc_4}
                                        onChange={(e) => handleChange(item.id_price, "disc_4", e.target.value)}
                                        fullWidth
                                        inputProps={{ step: "0.01" }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ py: 3 }}>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        value={item.disc_5}
                                        onChange={(e) => handleChange(item.id_price, "disc_5", e.target.value)}
                                        fullWidth
                                        inputProps={{ step: "0.01" }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton color="secondary" onClick={() => handleDeletePrice(item.id_price)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button onClick={handleConfirm} variant="contained" sx={{ ml: 2 }}>Actualitzar</Button>
            </Box>
        </>
    )
}
