import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state/store/store'

//========================================================================================

export const useAppDispatch = () => useDispatch<AppDispatch>()