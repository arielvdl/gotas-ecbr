export interface User {
  id: string;
  user_id: string;
  user_auth_id?: string;
  name: string;
  email_principal: string;
  phone_number?: string;
  access_type?: string;
  code?: string;
  lang: string;
  is_admin_gota: boolean;
  email: string;
  internal_admin: boolean;
  profile_picture?: string;
  wallet: string;
  wallet_solana?: string;
  wallet_minusculo: string;
  wallet_type: string;
  created_at: string;
  updated_at: string;
  followers: string;
  blocked: boolean;
  opt_email: boolean;
  opt_wpp: boolean;
  reference_code?: string;
  ai_credits?: string;
}

export interface Gota {
  id: string;
  gota_id: string;
  title: string;
  description: string;
  benefit_text?: string;
  block_to_mint: boolean;
  bucket?: string;
  can_started: boolean;
  code: string;
  start_date: string;
  end_date: string;
  no_end_date: boolean;
  hidden_in_profile: boolean;
  json_nft_url: string;
  thumb: string;
  metadata_type: string;
  owner: string;
  qty_disponible: string;
  qty_total: string;
  required_metamask_verified: boolean;
  created_at: string;
  updated_at: string;
  is_whitelist: boolean;
  need_passwd: boolean;
  pass_code?: string;
  is_gota_simples: boolean;
  price: string;
  gota_simples_date_end_to_mint: string;
  video_id?: string;
  ipfs_video?: string;
  ipfs_thumb?: string;
  is_airdrop: boolean;
  send_push_notification: boolean;
  push_notification_sent: boolean;
}

export interface GotaOrder {
  id: string;
  order_id: string;
  buyer: string;
  gota: string;
  observation?: string;
  resend_for_bug: boolean;
  status: 'pending' | 'minted' | 'failed';
  was_not_minted: boolean;
  token?: string;
  token_id?: string;
  token_number?: string;
  transaction?: string;
  transaction_url?: string;
  created_at: string;
  updated_at: string;
  gota_id: string;
  user_id: string;
  burned: boolean;
  mktplace_order_id: string;
  hidden_in_profile: boolean;
  raffle_id: string;
}

export interface GotaComment {
  id: string;
  gota_id: string;
  user_id: string;
  message: string;
  is_hided: boolean;
  is_highlighted: boolean;
  like_count: string;
  created_at: string;
  user_data: {
    name: string;
    access_type?: string;
    profile_picture?: string;
  };
  gota: string;
  user: string;
}

export interface GotaReport {
  id: string;
  gota_orders_id: string;
  order: string;
  user: string;
  hash_transacao: string;
  resolved: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerGotaSend {
  id: string;
  gota_id: string;
  email: string;
  quantity: string;
  status: 'queued' | 'sent' | 'failed';
  created_at: string;
  updated_at: string;
}