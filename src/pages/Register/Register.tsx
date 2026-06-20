import React from "react";

import { Link } from "react-router-dom";

import { CustomButton, CustomInput } from "@/components";
import { ROUTES } from "@/constants";

import styles from "./Register.module.css";

export const Register = () => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Criar conta</h1>

      <form className={styles.form} onSubmit={handleRegisterSubmit}>
        <CustomInput
          label="Nome completo"
          type="text"
          value={fullName}
          placeholder="João da Silva"
          autoComplete="name"
          onChange={(event) => setFullName(event.target.value)}
        />

        <CustomInput
          label="E-mail"
          type="email"
          value={email}
          placeholder="seu@email.com"
          autoComplete="email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <CustomInput
          label="Senha"
          type="password"
          value={password}
          placeholder="••••••••"
          autoComplete="new-password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <CustomInput
          label="Confirmar senha"
          type="password"
          value={passwordConfirm}
          placeholder="••••••••"
          autoComplete="new-password"
          onChange={(event) => setPasswordConfirm(event.target.value)}
        />

        <CustomButton type="submit" intent="primary">
          Criar conta
        </CustomButton>
      </form>

      <p className={styles.footerText}>
        Já tem uma conta?{" "}
        <Link to={ROUTES.LOGIN.path}>Entrar</Link>
      </p>
    </main>
  );
};
