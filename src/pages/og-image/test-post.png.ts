import SFProRoundedBold from "@/assets/fonts/SF-Pro-Rounded-Bold.latin.base.ttf";
import SFProRoundedSemibold from "@/assets/fonts/SF-Pro-Rounded-Semibold.latin.base.ttf";
import SFProRoundedMedium from "@/assets/fonts/SF-Pro-Rounded-Medium.latin.base.ttf";
import SFProRoundedRegular from "@/assets/fonts/SF-Pro-Rounded-Regular.latin.base.ttf";
import { siteConfig } from "@/site.config";
import { Resvg } from "@resvg/resvg-js";
import type { APIContext } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";

export const prerender = true;

const ogOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      data: Buffer.from(SFProRoundedRegular),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 400,
    },
    {
      data: Buffer.from(SFProRoundedMedium),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 500,
    },
    {
      data: Buffer.from(SFProRoundedSemibold),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 600,
    },
    {
      data: Buffer.from(SFProRoundedBold),
      name: "SF Pro Rounded",
      style: "normal",
      weight: 700,
    },
  ],
};

function markup() {
  const testTitle =
    "An Extraordinarily Long Example Title to Validate Multiline Wrapping Behavior for UR-RAD Open Graph Images Across Platforms";
  const testDate = "Thursday, November 6, 2025";

  // Background palette inspired by index/Base layout gradient blobs (kept vector/SVG-friendly).
  return html`<div
    style="
      position: relative;
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #ffffff 100%);
      color: #1f2937;
      overflow: hidden;
    "
  >
    <div style="position: relative; display: flex; flex: 1; padding: 72px;">
      <div
        style="display:flex; flex-direction:column; justify-content:center; gap:24px; max-width: 100%;"
      >
        <!-- Title block -->
        <p
          style="margin:0; font-family:'SF Pro Rounded'; font-weight:500; font-size:32px; color:#64748b;"
        >
          ${testDate}
        </p>
        <h1
          style="
            margin:0;
            font-family:'SF Pro Rounded';
            font-weight:700;
            font-size:64px;
            line-height:1.15;
            color:#0f172a;
            max-width: 100%;
            word-break: break-word;
          "
        >
          ${testTitle}
        </h1>
      </div>
    </div>

    <div
      style="
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding: 28px 48px;
        border-top: 1px solid rgba(0,0,0,0.08);
        gap: 24px;
      "
    >
      <div style="display:flex; align-items:center; gap:18px;">
        <!-- Inline logo (scaled down) -->
        <div
          style="width: 72px; height: 64px; display:flex; align-items:center; justify-content:center;"
        >
          <svg
            viewBox="0 0 797 693"
            width="72"
            height="64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1,0,0,1,-345,-96.5)">
              <path
                d="M756.942,197.15L756.942,474C701.751,474 656.942,518.808 656.942,574C656.942,629.192 701.751,674 756.942,674L756.942,777L495.122,777C443.175,777 401,734.825 401,682.878L401,614L364.755,614C353.852,614 345,605.148 345,594.245L345,436.814C345,425.878 353.878,417 364.814,417L401,417L401,365.122C401,313.175 443.175,271 495.122,271L715.058,271L715.058,197.15C696.492,189.056 683.5,170.533 683.5,149C683.5,120.024 707.024,96.5 736,96.5C764.976,96.5 788.5,120.024 788.5,149C788.5,170.533 775.508,189.056 756.942,197.15ZM559,388C520.918,388 490,418.918 490,457C490,495.082 520.918,526 559,526C597.082,526 628,495.082 628,457C628,418.918 597.082,388 559,388Z"
                fill="#ad47ff"
              />
              <g
                transform="matrix(-1,1.22465e-16,-1.22465e-16,-1,1486.06,1043)"
              >
                <path
                  d="M401,417L401,348.122C401,296.175 443.175,254 495.122,254L705.058,254L705.058,357C760.249,357 805.058,401.808 805.058,457C805.058,512.192 760.249,557 705.058,557L705.058,760L495.122,760C443.175,760 401,717.825 401,665.878L401,614L364.755,614C353.852,614 345,605.148 345,594.245L345,436.814C345,425.878 353.878,417 364.814,417L401,417ZM552,643C590.082,643 621,612.082 621,574C621,535.918 590.082,505 552,505C513.918,505 483,535.918 483,574C483,612.082 513.918,643 552,643Z"
                  fill="#00d5bd"
                />
              </g>
            </g>
          </svg>
        </div>
        <div style="display:flex; flex-direction:column;">
          <div
            style="font-family:'SF Pro Rounded'; font-weight:700; font-size:36px; color:#0f172a; line-height:1;"
          >
            UR-RAD
          </div>
          <div
            style="font-family:'SF Pro Rounded'; font-weight:600; font-size:20px; color:#334155;"
          >
            ${siteConfig.title}
          </div>
        </div>
      </div>
      <div
        style="font-family:'SF Pro Rounded'; font-weight:600; font-size:22px; color:#334155;"
      >
        ur-rad.github.io
      </div>
    </div>
  </div>`;
}

export async function GET(_context: APIContext) {
  const svg = await satori(markup(), ogOptions);
  const png = new Resvg(svg).render().asPng();

  return new Response(png, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/png",
    },
  });
}
