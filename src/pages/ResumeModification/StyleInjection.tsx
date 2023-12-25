import type { Theme } from "@/type/definition";
import React from "react";

function generateStyleContent(theme: Theme) {
  let content = "";

  const { colors, family, gutter, style } = theme;

  content += `font-family: ${family};`;
  content += `--gutter: ${gutter};`;
  colors.forEach((color, i) => (content += `--color-${i + 1}: ${color};`));

  return `#preview {${content}} ${style}`;
}

const StyleInjection: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <style lang="scss" data-v-description={`theme name: ${theme.name}`}>
      {generateStyleContent(theme)}
    </style>
  );
};

export default StyleInjection;
