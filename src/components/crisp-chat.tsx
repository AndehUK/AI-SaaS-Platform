"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("80f4ec68-5b0d-4239-874a-7c75b5e504be");
  }, []);

  return null;
};
