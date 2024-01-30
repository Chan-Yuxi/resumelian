import type { Theme } from "@/type/definition";
import React from "react";

function generateStyleContent(theme: Theme) {
  let content = "";

  const { colors = [], family, gutter, style } = theme;

  content += `font-family: ${family};`;
  content += `--gutter: ${gutter};`;
  colors.forEach((color, i) => (content += `--color-${i + 1}: ${color};`));

  return `#preview {${content}} ${style}`;
}

const StyleInjection: React.FC<{ theme: Theme }> = ({ theme }) => {
  return (
    <>
      <style lang="scss" data-v-description={`theme name: ${theme.name}`}>
        {generateStyleContent(theme)}
      </style>
      {/* <style>
        {`
        #preview .page:first-child {padding: 0 !important;}
        #preview h1 {margin: 0;padding: 1rem;color: white; background-color: var(--color-1);}
        #preview .lrc:nth-of-type(1) {background-color: var(--color-1); padding-bottom: 2rem;}
        #preview .lrc:nth-of-type(1) * {color: white;}
        #preview .lrc:nth-of-type(2) .r {text-align: left; background-color: #eeeeee}
        #preview h2 {margin: 1rem; padding: .5rem 0; color: var(--color-1); border-bottom: 1px solid #cccccc};
        #preview a {color: white;text-decoration: underline;}
        #preview h3 {margin: 0;padding: 0 1rem;font-size: 18px;}
        #preview hr {margin: 0;border: 1px solid #333;}
        #preview code {padding: .5rem 1rem;}
        #preview ul, ol > li {margin: 0 1rem;list-style-type: disc;}
        `}
      </style> */}
    </>
  );
};

export default StyleInjection;
