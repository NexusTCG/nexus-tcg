import { ImageResponse } from "next/og";
import { getCardsDTO } from "@/app/server/data/cards-dto";
import { getBaseUrl } from "@/app/utils/actions/actions";

// Generating dynamic OpenGraph Image with fetched data was not working
// So we are generating a dynamic OG images with static assets for now

export const runtime = "edge";
export const revalidate = 3600;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image({ params }: { params: { slug: string } }) {
  const baseUrl = getBaseUrl();

  const cards = await getCardsDTO({ id: parseInt(params.slug, 10) });
  const card = cards && cards.length > 0 ? cards[0] : null;

  const logoUrl = new URL(
    "/brand-assets/nexus-logo-white.png",
    baseUrl
  ).toString();

  const bgImageUrl = new URL("/images/og-image-bg.png", baseUrl).toString();

  const cardImageUrl =
    card?.card_render?.[0] ||
    new URL("/images/nexus-tcg-card-back.png", baseUrl).toString();

  const [logoData, bgData, cardData] = await Promise.all([
    fetch(logoUrl).then((res) => res.arrayBuffer()),
    fetch(bgImageUrl).then((res) => res.arrayBuffer()),
    fetch(cardImageUrl).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          background: `url(data:image/png;base64,${Buffer.from(bgData).toString(
            "base64"
          )})`,
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "start",
            padding: "auto",
          }}
        >
          <img
            src={`data:image/png;base64,${Buffer.from(logoData).toString(
              "base64"
            )}`}
            alt="Nexus TCG Logo"
            width={300}
            height={72}
            style={{ marginBottom: 20 }}
          />
          <h1 style={{ fontSize: 60, color: "white", marginTop: 30 }}>
            {card?.initialMode?.name || "Nexus TCG Card"}
          </h1>
          <p style={{ fontSize: 30, color: "white", marginTop: 10 }}>
            Join play.nexus to create your own Nexus cards!
          </p>
        </div>
        <div
          style={{
            height: "100%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "auto",
          }}
        >
          <img
            src={`data:image/png;base64,${Buffer.from(cardData).toString(
              "base64"
            )}`}
            alt={`${
              card?.initialMode?.name || "Nexus TCG Card"
            } - Nexus TCG Card`}
            width={300}
            height={420}
            style={{ marginTop: 20, border: "5px solid white" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await fetch(
            new URL(
              "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2",
              "https://fonts.gstatic.com"
            )
          ).then((res) => res.arrayBuffer()),
          weight: 600,
          style: "normal",
        },
      ],
    }
  );
}
