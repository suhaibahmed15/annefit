
const SUPABASE_URL = "https://hqgxxaflmduofhcmanio.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Khn5sLQDQWkhuIE4_qSBrQ_5-dDGnR0";

const PAYMENT_CONFIG = {
    paypalClientId: "AdWjxsk4IBsdW_goAho4CjXggG27f7E8vfTGqdYHw42DS9-On9FZdh96U_aCXER3sJne3X0OY03PyfPX"
};

 
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);