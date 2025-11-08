import React from "react";
import { useNavigate } from "react-router-dom";
import HeroesList from "../../../components/HeroesList";

export default function HeroesPage() {
  const navigate = useNavigate();
  return <HeroesList onPick={(id) => navigate(`/hero/${id}`)} />;
}
