import { useDispatch } from 'react-redux'
import { AppDispatchType } from '../../state/store/store'

export const useAppDispatch = () => useDispatch<AppDispatchType>()