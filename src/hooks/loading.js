import { loadingUserSelector } from "@selector/userSelector";

const { useSelector } = require("react-redux");

export const loadingUser = () => useSelector(loadingUserSelector)