import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/Today';
import './styles.scss';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';

function Home({ ...props }) {
  const [filters, setFilters] = useState({
    rol: '',
    patient: '',
    prevision: '',
    status: '',
    from_date: null,
    until_date: null,
  });

  return (
    <Container className="pa-40">
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
      </Paper>
    </Container>
  );
}

export default Home;
