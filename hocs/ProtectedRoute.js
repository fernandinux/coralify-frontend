import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  getCookieTokenObject,
  removeCookieTokenObject,
} from "./../helpers/cookies.helpers";
import { getUser } from "./../redux/slices/authSlice";
import { loadingStarted, loadingStopped } from "./../redux/slices/statusSlice";

export default function ProtectRoute(Component) {
  return () => {
    const [hasPermission, setHasPermission] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.status.loading);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
      const loadUser = async () => {
        if (getCookieTokenObject && !user) {
          dispatch(loadingStarted());
          const { error, payload: { data } = {} } = await dispatch(getUser());
          dispatch(loadingStopped());

          if (error) {
            removeCookieTokenObject();
            router.push("/signin");
          } else if (!router.route.startsWith(`/${data.role}`)) {
            router.push("404");
          } else {
            setHasPermission(true);
          }
        } else if (!getCookieTokenObject) {
          router.push("/signin");
        } else {
          setHasPermission(true);
        }
      };

      loadUser();
    }, []);

    return loading || !hasPermission ? (
      <>...loading</>
    ) : (
      <>
        <Component {...arguments} />
      </>
    );
  };
}
