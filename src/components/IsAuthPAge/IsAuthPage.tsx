import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../../store/store";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { getMe } from "../../store/Auth/authSlice";

type RouteProps = {
	children: JSX.Element
}

export const IsAuthPage: React.FC<RouteProps> = ({ children }) => {
	const { isAuth } = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const checkAuth = async () => {
			if (!isAuth) {
				await dispatch(getMe());

				const updatedAuth = store.getState().auth.isAuth;

				if (!updatedAuth) {
					navigate('/login');
				}
			}
		};
		checkAuth();
	}, [dispatch, navigate, isAuth]);

	if (isAuth) {
		return (
			<>
				{children}
			</>
		);
	}

	return null;
};