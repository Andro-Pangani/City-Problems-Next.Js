import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AboutId() {
  const state = useSelector((state) => state.material_data);
  const router = useRouter();

  useEffect(() => {
    console.log("############### ROUTER ==> ", router.query, state);
  });

  return <div>About with id</div>;
}
