import { CLIENT_ID, SCOPES } from "../configs/authConfig";
import { REDIRECT_URI, REDIRECT_URI_PROD } from "../configs/commonConfig";
import type { AuthUrlParams } from "../models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto";

export const getSpotifyAuthUrl = async() => {
    const codeVerifier  = generateRandomString(64);
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed);

    const clientId = CLIENT_ID;
    const redirectUri =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? REDIRECT_URI
      : REDIRECT_URI_PROD;

    const scope = SCOPES;
    const authUrl = new URL("https://accounts.spotify.com/authorize")

    // generated in the previous step
    window.localStorage.setItem('code_verifier', codeVerifier);

    const params:AuthUrlParams =  {
      response_type: 'code',
      client_id: clientId,
      scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    }

    authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    window.location.href = authUrl.toString();
}