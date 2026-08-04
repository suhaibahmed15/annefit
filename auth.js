// Private Authentication File
// NOTE: This is a static site with no backend, so this file (and the
// credentials in it) are downloadable by anyone who visits the site
// (view-source, browser dev tools, or the network tab). Treat this as a
// basic front-door deterrent, not real security — see the note at the
// bottom of this file for what real protection would require.
const SUPABASE_URL = "https://hqgxxaflmduofhcmanio.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Khn5sLQDQWkhuIE4_qSBrQ_5-dDGnR0";

const PAYMENT_CONFIG = {
    paypalClientId: "AdWjxsk4IBsdW_goAho4CjXggG27f7E8vfTGqdYHw42DS9-On9FZdh96U_aCXER3sJne3X0OY03PyfPX"
};

 
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);