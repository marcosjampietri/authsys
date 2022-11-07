import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useOutClick = (ref: any, act: Function) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch(act());
            }
        };
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, act, dispatch]);
};

export default useOutClick;