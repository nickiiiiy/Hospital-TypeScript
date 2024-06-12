type Appointment = {
  appointmentDate: string;
};

export const filterArray = (
  appointments: Appointment[],
  from: string | null,
  to: string | null
): Appointment[] => {
  return appointments.filter((appointment) => {
    const date = appointment.appointmentDate;
    return (!from || date >= from) && (!to || date <= to);
  });
};
