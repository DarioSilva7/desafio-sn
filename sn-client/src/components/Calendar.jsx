import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// eslint-disable-next-line react/prop-types
export const Calendar = ({ birthdate, currentDate, setBirthdate }) => {
  const placeholderText = currentDate
    ? moment(currentDate).format("MM/DD/YYYY")
    : "YYYY/MM/DD";
  return (
    <DatePicker
      selected={birthdate}
      name="birthdate"
      placeholderText={placeholderText}
      onChange={(d) => setBirthdate(d)}
      dateFormat={"Pp"}
      maxDate={new Date()}
      // showFullMonthYearPicker
      showYearDropdown
      scrollableMonthYearDropdown
    />
  );
};
