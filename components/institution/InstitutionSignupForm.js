import React from "react";
import Link from "next/link";

import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

import { sign_up } from "../../redux/slices/authSlice";
import { loadingStarted, loadingStopped } from "../../redux/slices/statusSlice";

import styles from "./../../styles/SignIn.module.css";
import { Button, Flex , Spinner  } from "@chakra-ui/core";

const validations = yup.object().shape({
  name: yup
    .string()
    .required("Información requerida")
    .min(3, "Debe tener más de 2 caracteres"),
  web: yup
    .string()
    .matches(
      /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Debe ser un website válido"
    )
    .required("Información requerida"),
  email: yup
    .string()
    .email("Debe ser un email válido")
    .required("Información requerida"),
  password: yup.string().required("Información requerida"),
});

function InstitutionSinupForm({ dispatch, router, setErrorMessage, errorMessage }) {
  const loading = useSelector((state) => state.status.loading);

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          web: "",
          email: "",
          password: "",
        }}
        validationSchema={validations}
        onSubmit={async (values, { setStatus }) => {
          try {
            dispatch(loadingStarted());
            const data = {
              name: values.name,
              web: values.web,
              email: values.email,
              password: values.password,
              role: "institution",
            };
            const { error, payload } = await dispatch(sign_up(data));
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
                <label className={styles.label}>Nombre de la Institución</label>
                <Field
                  name="name"
                  type="text"
                  placeholder="Codeable"
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
                <label className={styles.label}>Página web</label>
                <Field
                  name="web"
                  type="text"
                  placeholder="www.tuweb.com"
                  className={styles.field}
                />
                <ErrorMessage name="web">
                  {(msg) => (
                    <div>
                      <p className={styles.error}>{msg}</p>
                    </div>
                  )}
                </ErrorMessage>
              </div>
              <div className={styles.fullField}>
                <label className={styles.label}>Email institucional</label>
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

export default InstitutionSinupForm;
