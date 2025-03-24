import React from "react";

const YouTubeEmbed = ({ videoId }) => {
  return (
    <div
      style={{
        position: "relative",
        paddingBottom: "56.25%" /* 16:9 Aspect Ratio */,
        height: 0,
        overflow: "hidden",
        maxWidth: "100%",
              background: "#000",
             borderRadius: "10px",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;
