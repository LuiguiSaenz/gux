import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/Today';
import './styles.scss';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';
import CircularLoading from '../../components/CircularLoading';

import testService from '../../services/TestService';

function Home({ ...props }) {
  const [filters, setFilters] = useState({
    rol: '',
    search: '',
    prevision: '',
    status: '',
    alta_date__gte: null,
    alta_date__lte: null,
  });
  const [search, setSearch] = useState({
    rol: '',
    patient: '',
    hospital_date: null,
    alta_date: null,
    prevision_date: null,
    prevision: '',
    action: '',
    number: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [previsionOptions, setPrevisionOptions] = useState([]);

  useEffect(() => {
    _handleGetOptions()
  }, [])

  const _handleGetOptions = async () => {
    try {
      const response1 = await testService.listStatus()
      const response2 = await testService.listPrevisions()
      setLoading(false);
      if (response1.status === 200) {
        setStatusOptions(response1.data)
      } 
      if (response2.status === 200) {
        setPrevisionOptions(response2.data)
      } 
    } catch (error) {
      console.log(error);
    }
  }

  const _handleCleanFilters = () => {
    setFilters({
      rol: '',
      patient: '',
      prevision: '',
      status: '',
      alta_date__gte: null,
      alta_date__lte: null,
    });
  };
  const _handleSearch = async () => {
    setLoading(true);
    const newFilters = {};
    Object.keys(filters).forEach(key => {
      if (!!filters[key]) newFilters[key] = filters[key];
    });
    try {
      const response = await testService.list(newFilters);
      setLoading(false);
      if (response.status === 200) {
        setTests(response.data);
      } else {
        setTests([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _handleFilterRows = (rows, search) => {
    let newRows = rows;

    Object.keys(search).forEach(key => {
      if (search[key]) {
        if (['prevision', 'status'].includes(key)) {
          newRows = newRows.filter(
            row => row[key].name.toLowerCase().indexOf(search[key].toLowerCase()) !== -1
          );
          return;
        }
        if (['hospital_date', 'alta_date', 'prevision_date'].includes(key)) {
          newRows = newRows.filter(row => moment(row[key]).isSame(moment(search[key])));
        } else {
          newRows = newRows.filter(row => {
            console.log(row[key].toLowerCase(), search[key].toLowerCase());
            return row[key].toLowerCase().indexOf(search[key].toLowerCase()) !== -1;
          });
        }
      }
    });

    return newRows;
  };

  return (
    <Container className="pa-40" id="home">
      <Paper className="pa-20">
        <Typography component="h5" className="font-weight-bold mb-20">
          FILTROS:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Rol"
              name="rol"
              variant="outlined"
              type="number"
              fullWidth
              onChange={e =>
                setFilters({
                  ...filters,
                  rol: e.target.value,
                })
              }
              size="small"
              placeholder="Ingrese Rol"
              value={filters.rol}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Paciente"
              name="patient"
              variant="outlined"
              onChange={e =>
                setFilters({
                  ...filters,
                  search: e.target.value,
                })
              }
              size="small"
              placeholder="Ingrese Paciente"
              value={filters.search}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Prevision"
              placeholder="Seleccione Prevision"
              value={filters.prevision}
              fullWidth
              size="small"
              variant="outlined"
              onChange={e =>
                setFilters({
                  ...filters,
                  prevision: e.target.value,
                })
              }
            >
              <MenuItem key={'prevision-empty'} value={''}>
                Seleccione
              </MenuItem>
              {previsionOptions.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              label="Estado"
              placeholder="Seleccione Estado"
              value={filters.status}
              fullWidth
              size="small"
              variant="outlined"
              onChange={e =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
            >
              <MenuItem key={'status-empty'} value={''}>
                Seleccione
              </MenuItem>
              {statusOptions.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="Fecha Alta Desde"
              size="small"
              variant="outlined"
              clearable
              autoOk={true}
              value={filters.alta_date__gte}
              fullWidth
              onChange={date =>
                setFilters({
                  ...filters,
                  alta_date__gte: date ? moment(date).format('YYYY-MM-DD') : null,
                })
              }
              format="DD/MM/YYYY"
              maxDate={
                filters.alta_date__lte
                  ? moment(filters.alta_date__lte).toDate()
                  : moment().add(100, 'years').toDate()
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="calendar">
                      <CalendarIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <DatePicker
              label="Fecha Alta Hasta"
              size="small"
              variant="outlined"
              clearable
              autoOk={true}
              fullWidth
              value={filters.alta_date__lte}
              onChange={date =>
                setFilters({
                  ...filters,
                  alta_date__lte: date ? moment(date).format('YYYY-MM-DD') : null,
                })
              }
              format="DD/MM/YYYY"
              minDate={
                filters.alta_date__gte
                  ? moment(filters.alta_date__gte).toDate()
                  : moment().subtract(100, 'years').toDate()
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="calendar">
                      <CalendarIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" className="mt-20">
          <Button variant="contained" color="primary" onClick={_handleCleanFilters}>
            LIMPIAR
          </Button>
          <Button
            variant="contained"
            className="button-green ml-20"
            onClick={_handleSearch}
            disabled={loading}
          >
            BUSCAR
          </Button>
        </Grid>
        <Grid className="mt-20 scroll-horizontal">
          {loading ? (
            <CircularLoading />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>N° Rol</TableCell>
                  <TableCell>Nombre Paciente</TableCell>
                  <TableCell>Fecha Hosp.</TableCell>
                  <TableCell>Fecha Alta</TableCell>
                  <TableCell>Fecha Prevision</TableCell>
                  <TableCell>Código Prev.</TableCell>
                  <TableCell>Acción</TableCell>
                  <TableCell>N°</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key="row-search">
                  <TableCell component="th" scope="row">
                    <TextField
                      variant="outlined"
                      value={search.rol}
                      onChange={e =>
                        setSearch({
                          ...search,
                          rol: e.target.value,
                        })
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={search.patient}
                      onChange={e =>
                        setSearch({
                          ...search,
                          patient: e.target.value,
                        })
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      clearable
                      size="small"
                      variant="outlined"
                      autoOk={true}
                      value={search.hospital_date}
                      onChange={date =>
                        setSearch({
                          ...search,
                          hospital_date: date ? moment(date).format('YYYY-MM-DD') : null,
                        })
                      }
                      format="DD/MM/YYYY"
                    />
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      clearable
                      size="small"
                      variant="outlined"
                      autoOk={true}
                      value={search.alta_date}
                      onChange={date =>
                        setSearch({
                          ...search,
                          alta_date: date ? moment(date).format('YYYY-MM-DD') : null,
                        })
                      }
                      format="DD/MM/YYYY"
                    />
                  </TableCell>
                  <TableCell>
                    <DatePicker
                      clearable
                      size="small"
                      variant="outlined"
                      autoOk={true}
                      value={search.prevision_date}
                      onChange={date =>
                        setSearch({
                          ...search,
                          prevision_date: date ? moment(date).format('YYYY-MM-DD') : null,
                        })
                      }
                      format="DD/MM/YYYY"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={search.prevision}
                      onChange={e =>
                        setSearch({
                          ...search,
                          prevision: e.target.value,
                        })
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={search.action}
                      onChange={e =>
                        setSearch({
                          ...search,
                          action: e.target.value,
                        })
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={search.number}
                      onChange={e =>
                        setSearch({
                          ...search,
                          number: e.target.value,
                        })
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      value={search.status}
                      onChange={e =>
                        setSearch({
                          ...search,
                          status: e.target.value,
                        })
                      }
                      size="small"
                    />
                  </TableCell>
                </TableRow>
                {_handleFilterRows(tests, search).map(row => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.rol}
                    </TableCell>
                    <TableCell>{row.patient}</TableCell>
                    <TableCell>{moment(row.hospital_date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{moment(row.alta_date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{moment(row.prevision_date).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>{row.prevision.name}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.status.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Grid>
      </Paper>
    </Container>
  );
}

export default Home;
