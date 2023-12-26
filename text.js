console.log(
  JSON.stringify({
    name: "ocean",
    colors: ["#224f98", "#78a2e8", "#0487f8"],
    family: "inherit",
    enableAvatar: false,
    avatarPosition: {
      x: 25,
      y: 25,
    },
    default: "<h1>我的简历</h1><p>在此编辑您的简历...</p>",
    gutter: "1rem",
    style:
      "#preview h1 { background-color: var(--color-1); color: white; padding: 1rem; } #preview h3 { background-color: var(--color-2); color: white; width: 17.5%; border-top-right-radius: 1.5rem; border-bottom-right-radius: 1.5rem; padding: .5rem 1rem; } #preview h6 { color: var(--color-3) }",
  })
);
