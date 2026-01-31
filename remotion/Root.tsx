import React from "react";
import { Composition } from "remotion";
import { HeroComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Hero"
        component={HeroComposition}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          title: "CodeByChai",
          subtitle: "Atthachai · Vibe coded projects",
        }}
      />
    </>
  );
};
