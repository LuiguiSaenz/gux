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
    patient: '',
    prevision: '',
    status: '',
    from_date: null,
    until_date: null,
  });
  const [search, setSearch] = useState({
    rol: '',
    patient: '',
    hospital_date: null,
    alta_date: null,
    prevision_date: null,
    code: '',
    action: '',
    number: '',
    pam: '',
  });
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([
    {
      id: 1,
      rol: 'Adminstrados',
      patient: 'Luigui Saenz',
      hospital_date: '2021-02-02',
      alta_date: '2021-05-09',
      prevision_date: '2021-04-10',
      code: 'CESAREA',
      action: 'C1',
      number: '10',
      pam: 'PAM 1',
    },
    {
      id: 2,
      rol: 'Gerente',
      patient: 'Pepe Casillas',
      hospital_date: '2021-05-10',
      alta_date: '2021-10-04',
      prevision_date: '2021-10-01',
      code: 'PROLAPSO',
      action: 'C2',
      number: '20',
      pam: 'PAM 2',
    },
  ]);

  const _handleCleanFilters = () => {
    setFilters({
      rol: '',
      patient: '',
      prevision: '',
      status: '',
      from_date: null,
      until_date: null,
    });
  };
  const _handleSearch = async () => {
    setLoading(true);
    const newFilters = {};
    Object.keys(filters).forEach(key => {
      if (!!filters[key]) newFilters[key] = filters[key];
    });
    const response = await testService.list(newFilters);
    setLoading(false);
    console.log(response);
  };

  const _handleFilterRows = (rows, search) => {
    let newRows = rows;

    Object.keys(search).forEach(key => {
      if(search[key]) {
        if(moment(search[key]).isValid()) {
          newRows = newRows.filter((row) =>
            moment(row[key]).isSame(moment(search[key]))
          );
        }
        else {
          newRows = newRows.filter((row) => row[key].toLowerCase().indexOf(search[key]) !== -1);
        }
      }
    })

    return newRows;
  };

  return (
    <Container className="pa-40" id="home">
      <Paper className="pa-20">
        <Typography component="h5" className="font-weight-bold mb-20">
          FILTROS:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={3}>
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
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Paciente"
              name="patient"
              variant="outlined"
              onChange={e =>
                setFilters({
                  ...filters,
                  patient: e.target.value,
                })
              }
              size="small"
              placeholder="Ingrese Paciente"
              value={filters.patient}
            />
          </Grid>
          <Grid item xs={3}>
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
              {[
                { value: 1, label: 'label 1' },
                { value: 2, label: 'label 2' },
              ].map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
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
              {[
                { value: 1, label: 'label 1' },
                { value: 2, label: 'label 2' },
              ].map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <DatePicker
              label="Fecha Alta Desde"
              size="small"
              variant="outlined"
              autoOk={true}
              value={filters.from_date}
              onChange={date =>
                setFilters({
                  ...filters,
                  from_date: moment(date).format('YYYY-MM-DD'),
                })
              }
              format="DD/MM/YYYY"
              maxDate={
                filters.until_date
                  ? moment(filters.until_date).toDate()
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
          <Grid item xs={3}>
            <DatePicker
              label="Fecha Alta Hasta"
              size="small"
              variant="outlined"
              autoOk={true}
              value={filters.until_date}
              onChange={date =>
                setFilters({
                  ...filters,
                  until_date: moment(date).format('YYYY-MM-DD'),
                })
              }
              format="DD/MM/YYYY"
              minDate={
                filters.from_date
                  ? moment(filters.from_date).toDate()
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
        <Grid container justifyContent="flex-end">
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
        <Grid className="mt-20">
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
                  <TableCell>Código Pres.</TableCell>
                  <TableCell>Acción</TableCell>
                  <TableCell>N°</TableCell>
                  <TableCell>Tipo PAM</TableCell>
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
                      value={search.code}
                      onChange={e =>
                        setSearch({
                          ...search,
                          code: e.target.value,
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
                      value={search.pam}
                      onChange={e =>
                        setSearch({
                          ...search,
                          pam: e.target.value,
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
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.action}</TableCell>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{row.pam}</TableCell>
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
