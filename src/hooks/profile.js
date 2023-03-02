import { profileSelector } from "@selector/userSelector";
import { useSelector } from "react-redux";

export default profile = () => useSelector(profileSelector)