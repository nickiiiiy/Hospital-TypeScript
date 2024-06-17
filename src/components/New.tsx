import { applyMiddleware, createStore, Store } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import rootReducer from "./reducers";

export const store: Store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware)
);

export default store;

import { combineReducers } from "redux";
import { userReducer, UserState } from "./user";
import { appointmentReducer, AppointmentState } from "./appointment";

const rootReducer = combineReducers({
  user: userReducer,
  appointment: appointmentReducer,
});

export interface RootState {
  user: UserState;
  appointment: AppointmentState;
}

export default rootReducer;


// //////
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import AddAppointmentForm from "../../AddAppointmentForm";
import AppointmentList from "../../AppointmentList";
import EditAppointmentModal from "../../EditAppointments";
import FilterAppointment from "../../FilterAppointment";
import Header from "../../Header";
import DeleteAppointmentModal from "../../DeleteAppointments";
import SortAppointment from "../../SortAppointment";
import { IRootReduxState, ISnackbar, IAppointment } from "../../../interfaces";
import { sortArray } from "../../../helpers/sortAppointments";
import { filterArray } from "../../../helpers/filterAppointment";
import { Snackbar } from "@mui/material";
import useAction from "../../../hooks/useAction";
import { doctors, sortingField, sortingDirection } from "../../../constants";
import { StyledWrapper, StyledComponentWrapper } from "./style";

export interface IAppointmentReduxState {
  appointment: {
    appointments: IAppointment[];
  };
}

export interface IAppointmentReduxError {
  appointment: {
    error: string[];
  };
}

export interface INewAppointment {
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  complaints: string;
}

export interface IAppointmentError {
  patientNameError: string;
  doctorNameError: string;
  appointmentDateError: string;
  complaintsError: string;
}

export interface ISortConfig {
  field: string;
  direction: string;
}

export interface IFilterConfig {
  fromDate: string;
  toDate: string;
}

const Main = () => {
  const [newAppointment, setNewAppointment] = useState<INewAppointment>({
    patientName: "",
    doctorName: "",
    appointmentDate: "",
    complaints: "",
  });
  const [error, setError] = useState<IAppointmentError>({
    patientNameError: "",
    doctorNameError: "",
    appointmentDateError: "",
    complaintsError: "",
  });
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    message: "",
  });
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [editError, setEditError] = useState<IAppointmentError>({
    patientNameError: "",
    doctorNameError: "",
    appointmentDateError: "",
    complaintsError: "",
  });
  const [sortConfig, setSortConfig] = useState<ISortConfig>({
    field: "",
    direction: sortingDirection[0].name,
  });
  const [filterConfig, setFilterConfig] = useState<IFilterConfig>({
    fromDate: "",
    toDate: "",
  });
  const [filteredAppointments, setFilteredAppointments] = useState<IAppointment[]>([]);
  const [isOpenFilterForm, setIsOpenFilterForm] = useState(false);

  const appointments = useSelector(
    (state: IAppointmentReduxState) => state.appointment.appointments
  );

  const selectUserError = (state: IRootReduxState) => state.user.error;
  const selectAppointmentError = (state: IAppointmentReduxError) => state.appointment.error;

  const errors = createSelector(
    [selectUserError, selectAppointmentError],
    (userError, appointmentError) => {
      if (userError) return userError;
      if (appointmentError) return appointmentError;
      return null;
    }
  );

  const {
    createAppointment,
    getAppointment,
    editAppointment,
    deleteAppointment,
    logoutUser,
  } = useAction();

  useEffect(() => {
    getAppointment();
  }, []);

  useEffect(() => {
    if (errors && errors.length > 0) {
      setSnackbar({
        ...snackbar,
        open: true,
        message:
          "Извините, произошла ошибка. Проверьте данные, которые вы вводили.",
      });
    }
  }, [errors]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterConfig({
      ...filterConfig,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterApply = () => {
    const { fromDate, toDate } = filterConfig;
    const filteredNewAppointments = filterArray(
      sortedAppointments,
      fromDate,
      toDate
    );
    setFilteredAppointments(filteredNewAppointments);
  };

  const handleFilterReset = () => {
    setFilterConfig({
      fromDate: "",
      toDate: "",
    });
    setFilteredAppointments(appointments);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSortConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  };

  const sortedAppointments = useMemo(() => {
    if (filteredAppointments.length > 0) {
      return sortArray(
        filteredAppointments,
        sortConfig.field,
        sortConfig.direction
      );
    }
    return sortArray(appointments, sortConfig.field, sortConfig.direction);
  }, [appointments, filteredAppointments, sortConfig]);

  const handleEditAppointment = (id: string) => {
    const oldAppointments = [...appointments];
    const appointment = oldAppointments.find(
      (appointment) => appointment._id === id
    );
    setSelectedAppointment(appointment || null);
    setIsOpenEditModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAppointment({
      ...selectedAppointment!,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSave = () => {
    if (!selectedAppointment?.patientName.trim()) {
      setEditError({
        ...editError,
        patientNameError: "Поле не может быть пустым ",
      });
      return;
    }

    if (!selectedAppointment?.doctorName.trim()) {
      setEditError({
        ...editError,
        doctorNameError: "Поле не может быть пустым ",
      });
      return;
    }

    if (!selectedAppointment?.complaints.trim()) {
      setEditError({
        ...editError,
        complaintsError: "Поле не может быть пустым ",
      });
      return;
    }

    const date = new Date(selectedAppointment.appointmentDate);
    if (date < new Date()) {
      setEditError({
        ...editError,
        appointmentDateError: "Дата не может быть в прошлом",
      });
      return;
    }

    editAppointment(selectedAppointment);
    setEditError({
      patientNameError: "",
      doctorNameError: "",
      appointmentDateError: "",
      complaintsError: "",
    });
    setSelectedAppointment(null);
    setIsOpenEditModal(false);
  };

  const handleEditModalClose = () => {
    setIsOpenEditModal(false);
    setSelectedAppointment(null);
    setEditError({
      patientNameError: "",
      doctorNameError: "",
      appointmentDateError: "",
      complaintsError: "",
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAppointment({
      ...newAppointment,
      [e.target.name]: