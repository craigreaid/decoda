import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#DCE8E2",
          borderRadius: 8,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 32 32">
          <path
            d="M7.2 10.2c3.3-1.4 6.1-.2 8.8 1.2 2.7-1.4 5.5-2.6 8.8-1.2v11.1c-3.3-1.4-6.1-.2-8.8 1.2-2.7-1.4-5.5-2.6-8.8-1.2V10.2Z"
            fill="none"
            stroke="#2F3F38"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M16 11.4v11.1"
            stroke="#2F3F38"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9.2 26.2c2.3-1.5 4.2.3 6.8-.1 2.6-.4 4.5-1.7 6.8-.1"
            fill="none"
            stroke="#5B7C6E"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
