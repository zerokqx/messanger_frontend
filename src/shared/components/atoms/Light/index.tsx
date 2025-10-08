import { useMantineTheme } from "@mantine/core";
import React, { useState } from "react";

const LightSwitch = () => {
  const theme = useMantineTheme();
  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <div
        style={{
          rotate: "-20deg",
          width: "90vw", // адаптивная ширина 90% от ширины окна
          maxWidth: "900px", // максимум 900px
          height: "20vh", // высота 20% от высоты окна
          maxHeight: "200px", // максимум 200px
          margin: "0 auto 20px",
          filter: "blur(300px)",
          
          opacity: "0.1", // лучше записывать в десятичном формате
          backgroundColor: theme.white,
        }}
      />
    </div>
  );
};

export default LightSwitch;
