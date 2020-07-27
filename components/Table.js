import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import InlineLoader from './InlineLoader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { cssHelper, sort } from '../utils';
import TablePopper from './TablePopper';
import PropTypes from 'prop-types';


const useStyles = makeStyles(theme => ({
    ...cssHelper,
    table: {
        minWidth: 650,
        textAlign: 'left',
        tableLayout: 'fixed',
    },
    titleNsort: {
        width: '100%',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
    wholeTable: {
        background: '#FFFFFF',
        borderRadius: '0.5rem',
        boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.05)',
        width: '100%',
        marginTop: '2rem',
        padding: '1.5rem 1.9rem',

        [theme.breakpoints.down("sm")]: {
            width: '90vw',
            padding: '1rem 0.9rem',
        }
    },
    formatTable: { padding: '16px 0px', borderBottom: 'none' },
    truncate: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        [theme.breakpoints.down("sm")]: {
            textOverflow: 'ellipsis',
            width: '100px',
        }
    },
    actionButton: {
        borderRadius: '50px',
        boxShadow: 'none',
        textTransform: 'lowercase',
    }
}));


export default function CustomTable({ name, columns, lists = [], values = [], actions = [] }) {

    const classes = useStyles();

    const [page, setPage] = React.useState(0);

    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const [currFilter, setCurrentFilter] = React.useState('Newly Added')

    const [products, setProducts] = React.useState(lists);

    React.useEffect(() => {
        setProducts(sort(lists, 'date'))
    }, [lists])

    const [loading, setLoading] = React.useState({

    })
    const done = (identifier) => {
        setLoading({
            [identifier]: false
        })
    }

    const handleClick = (method, identifier) => {
        setLoading({
            [identifier]: true
        })
        return method
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortOnClick = (name) => {
        setCurrentFilter(name);
        if (['Newly Added'].includes(name)) return setProducts(sort(lists, 'date'));
        if (['Date added'].includes(name)) return setProducts(sort(lists, 'oldDate'));
        if (['Alphabetically', 'Name'].includes(name)) return setProducts(sort(lists, 'name'));
        if (['Out of stock'].includes(name)) return setProducts(sort(lists, 'quantity'));
    }

    const tableOptions = ['Newly Added', 'Alphabetically', 'Name', 'Date added']

    return (
        <Grid container>
            <div className={classes.wholeTable}>
                <div className={` ${classes.flex} ${classes.between} ${classes.titleNsort}`}>
                    <Typography variant={'body1'} className={classes.truncate} style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.3rem', fontWeight: 'bolder' }}>{name}</Typography>
                    <div style={{ display: 'flex' }}><span>Sort: </span>
                        <span><TablePopper currFilter={currFilter} options={tableOptions} setFilter={sortOnClick} /></span></div>
                </div>
                <TableContainer >
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow style={{ display: 'table-row', width: '80%' }}>
                                {columns.map((column, i) => (
                                    <TableCell
                                        key={`${column + Math.random()}`}
                                        align={'left'}
                                        style={{ minWidth: column.minWidth, padding: '16px 0px', borderBottom: 'none', fontWeight: 'bold' }}
                                    >
                                        {column}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {(rowsPerPage > 0
                                ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : products
                            ).map((each, rowIndex) => {

                                return (
                                   
                                        <TableRow key={rowIndex} style={{ borderBottom: 'none' }}>

                                            {values.map((value, i )=> {
                                                return (<TableCell key={i} align="left" className={`${classes.formatTable}`}>{each[value]}</TableCell>)
                                            })}
                                            <TableCell align="left">
                                            {actions?.length > 0 && actions.map(({ name, method, args }, index) => {
                                                return (
                                                    
                                                    <Button variant='contained'
                                                    disableRipple={true}
                                                    key={index}
                                                    className={classes.actionButton} color='primary' aria-label="edit productDetails" onClick={() => handleClick(method, `${name}-${rowIndex}-${index}`)(each, done, `${name}-${rowIndex}-${index}`, ...args)} data-id={each.id}>
                                                        {loading[`${name}-${rowIndex}-${index}`] ? <InlineLoader /> : name}
                                                    </Button>
                                                    
                                                )
                                            })}
                                            </TableCell>

                                        </TableRow>
                                    
                                )
                            })}


                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[3, 5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={lists.length}

                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </div>

        </Grid>
    )
}