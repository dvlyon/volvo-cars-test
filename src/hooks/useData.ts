import { useContext } from "react"
import { DataContext } from "../contexts/DataContext"

const useData = () => useContext(DataContext)

export default useData
