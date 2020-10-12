import React from "react";
import Link from "next/link";

import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { sign_up } from "./../../redux/slices/authSlice";
import { loadingStarted, loadingStopped } from "./../../redux/slices/statusSlice";

import styles from "./../../styles/SignIn.module.css";
import { Flex, Button , Spinner } from "@chakra-ui/core";

const validations = yup.object().shape({
  name: yup
    .string()
    .required("Información requerida")
    .min(3, "Nombre debe tener más de 2 caracteres"),
  last_name: yup
    .string()
    .required("Información requerida")
    .min(2, "Apellido debe tener más de 1 caracter"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("Información requerida"),
  password: yup.string().required("Información requerida"),
});

function UserSignupForm({ dispatch, router, setErrorMessage, errorMessage }) {
  const loading = useSelector((state) => state.status.loading);

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        validationSchema={validations}
        onSubmit={async (values, { setStatus }) => {
          try {
            dispatch(loadingStarted());
            const { error, payload } = await dispatch(sign_up(values));
            if (error) {
              setErrorMessage(error.message);
            } else if (payload.data) {
              router.push(payload.data.role);
            }
            dispatch(loadingStopped());
          } catch (err) {
            console.error("Failed to signup ", err);
          }
        }}
      >
        {({ status }) => (
          <>
            <p className={`${styles.errorMessage} ${styles.error}`}>
              {errorMessage}
            </p>
            <Form>
              <div className={styles.fullField}>
                <label className={styles.label}>Nombre</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Tu nombre"
                  className={styles.field}
                />
                <ErrorMessage name="name">
                  {(msg) => (
                    <div>
                      <p className={styles.error}>{msg}</p>
                    </div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.fullField}>
                <label className={styles.label}>Apellido</label>
                <Field
                  name="last_name"
                  type="text"
                  placeholder="Tu apellido"
                  className={styles.field}
                />
                <ErrorMessage name="last_name">
                  {(msg) => (
                    <div>
                      <p className={styles.error}>{msg}</p>
                    </div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.fullField}>
                <label className={styles.label}>Email</label>
                <Field
                  name="email"
                  type="email"
                  placeholder="tu@correo.com"
                  className={styles.field}
                />
                <ErrorMessage name="email">
                  {(msg) => (
                    <div>
                      <p className={styles.error}>{msg}</p>
                    </div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.fullField}>
                <label className={styles.label}>Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Tu contraseña"
                  className={styles.field}
                />
                <ErrorMessage name="password">
                  {(msg) => (
                    <div>
                      <p className={styles.error}>{msg}</p>
                    </div>
                  )}
                </ErrorMessage>
              </div>
              <Flex flexDirection="column">
                <br />
                <Button type="submit" className={styles.loginButton} variantColor="#4bc0d0">
                  {loading ? <Spinner color="white" size="sm" /> : "Registrarme"}
                </Button>
                <Link href="/signin">
                  <Button className={styles.forgotPasswordButton} variant="outline" variantColor="#4bc0d0">
                    Ya tengo una cuenta
                  </Button>
                </Link>
              </Flex>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default UserSignupForm;
