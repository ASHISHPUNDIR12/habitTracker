import React from "react";
import Header from "../components/Header.jsx";
import HabitForm from "../components/HabitForm.jsx";
import Container from "../components/Container.jsx";
import { useAuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Header username={user?.username} />
      <HabitForm />
      <Container />
    </>
  );
};

export default Home;
