// =============================================
// CLARIO — TypeScript Types
// Mirror the backend schemas exactly
// =============================================

// ─── User / Auth ───────────────────────────────
export type UserRole = 'brand' | 'writer';

export interface UserSync {
    email: string;
    role: string;
    display_name: string;
}

// ─── Profile ───────────────────────────────────
export interface Profile {
    user_id: string;
    bio?: string | null;
    portfolio_url?: string | null;
    avatar_url?: string | null;
}

export interface ProfileUpdate {
    bio?: string;
    portfolio_url?: string;
    avatar_url?: string;
}

// ─── Brief ─────────────────────────────────────
export type BriefStatus = 'open' | 'funded' | 'in_progress' | 'closed';
export type BriefIndustry = 'skincare' | 'fitness' | 'tech' | 'fashion' | 'food' | 'travel' | 'finance' | 'other';
export type ScriptFormat = 'tiktok' | 'shorts' | 'reel' | 'pinterest' | 'other';

export interface Brief {
    id: string;
    brand_id: string;
    product_name: string;
    product_url?: string | null;
    brief_description: string;
    target_audience?: string | null;
    creative_direction?: string | null;
    script_format?: string | null;
    industry?: string | null;
    budget: number;
    status: BriefStatus;
    created_at: string;
}

export interface BriefCreate {
    product_name: string;
    product_url?: string;
    brief_description: string;
    target_audience?: string;
    creative_direction?: string;
    script_format?: ScriptFormat;
    industry?: BriefIndustry;
    budget: number;
}

// ─── Submission ────────────────────────────────
export type SubmissionStatus = 'pending' | 'approved' | 'rejected' | 'paid';

export interface Submission {
    id: string;
    brief_id: string;
    writer_id: string;
    script_content: string;
    proposed_price?: number | null;
    status: SubmissionStatus;
    created_at: string;
}

export interface SubmissionCreate {
    brief_id: string;
    script_content: string;
    proposed_price?: number;
}

// ─── Review ────────────────────────────────────
export interface Review {
    id: string;
    brand_id: string;
    writer_id: string;
    rating: number;
    comment?: string | null;
    created_at: string;
}

export interface ReviewCreate {
    writer_id: string;
    rating: number;
    comment?: string;
}

// ─── Earnings ──────────────────────────────────
export interface EarningsResponse {
    writer_id: string;
    total_earnings_inr: number;
}

// ─── Payment ───────────────────────────────────
export interface PaymentCreate {
    amount: number;
}

export interface RazorpayOrder {
    order_id: string;
    amount: number;
    currency: string;
}

export interface PaymentVerify {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    submission_id: string;
}
