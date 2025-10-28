'use client'

import  React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useRouter } from 'next/router';

export default function MyClickerGamePage() {
  // Use root-relative uncompressed filenames so the browser receives plain JS/wasm
  // and not Brotli-compressed files (which would cause illegal U+FFFD when
  // fetched as-is). Put the Unity export in `public/clicker_next/Build/`.
  const { basePath } = useRouter();
  const prefix = basePath || '';
  const { unityProvider } = useUnityContext({
    loaderUrl: `${prefix}/clicker_next/Build/clicker_game.loader.js`,
    dataUrl: `${prefix}/clicker_next/Build/clicker_game.data.gz`,
    frameworkUrl: `${prefix}/clicker_next/Build/clicker_game.framework.js.gz`,
    codeUrl: `${prefix}/clicker_next/Build/clicker_game.wasm.gz`,
  });
  return (
    <div>
      <Unity
        unityProvider={unityProvider}
      />
    </div>
  );
}