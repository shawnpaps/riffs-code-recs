import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_CLRq9bMd.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/posts.astro.mjs');
const _page2 = () => import('./pages/api/songs.astro.mjs');
const _page3 = () => import('./pages/api/subscribe.astro.mjs');
const _page4 = () => import('./pages/api/technologies.astro.mjs');
const _page5 = () => import('./pages/api/verify.astro.mjs');
const _page6 = () => import('./pages/code.astro.mjs');
const _page7 = () => import('./pages/join.astro.mjs');
const _page8 = () => import('./pages/music.astro.mjs');
const _page9 = () => import('./pages/subscribers/auth.astro.mjs');
const _page10 = () => import('./pages/subscribers/vault.astro.mjs');
const _page11 = () => import('./pages/subscription-success.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.5.2_@netlify+blobs@8.1.1_@types+node@22.13.10_jiti@2.4.2_lightningcss@1.29.2_rollup@4_mf73dpej6ett4jbuxgkcibzypa/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/posts.ts", _page1],
    ["src/pages/api/songs.ts", _page2],
    ["src/pages/api/subscribe.ts", _page3],
    ["src/pages/api/technologies.ts", _page4],
    ["src/pages/api/verify.ts", _page5],
    ["src/pages/code/index.astro", _page6],
    ["src/pages/join.astro", _page7],
    ["src/pages/music/index.astro", _page8],
    ["src/pages/subscribers/auth.astro", _page9],
    ["src/pages/subscribers/vault/index.astro", _page10],
    ["src/pages/subscription-success.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8479e785-46ae-492a-a977-3b8f0be7efaa"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
