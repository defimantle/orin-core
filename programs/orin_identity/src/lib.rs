use anchor_lang::prelude::*;

// Replace this with your actual generated Program ID
declare_id!("FqtrHgdYTph1DSP9jDYD7xrKPrjSjCTtnw6fyKMmboYk");

#[program]
pub mod orin_identity {
    use super::*;

    /// Initializes a new guest identity (On-chain Identity Layer)
    /// @param email_hash: SHA256 hash of the guest's email, used to derive the PDA
    /// @param name: Guest's name or nickname
    pub fn initialize_guest(
        ctx: Context<InitializeGuest>,
        email_hash: [u8; 32],
        name: String,
    ) -> Result<()> {
        // 1. Parameter validation: Limit name length (Max 100 characters/bytes)
        require!(name.as_bytes().len() <= 100, OrinError::NameTooLong);

        let guest_profile = &mut ctx.accounts.guest_profile;

        // 2. Initialize fields
        guest_profile.owner = *ctx.accounts.user.key;    // Bind the current signer as the owner
        guest_profile.email_hash = email_hash;           // Store email hash for off-chain querying
        guest_profile.name = name;                       // Store guest name
        guest_profile.loyalty_points = 0;                // Initialize points to 0
        guest_profile.stay_count = 0;                    // Initialize stay count to 0
        guest_profile.preferences = "{}".to_string();    // Initialize preferences as empty JSON

        msg!("Guest Identity Initialized: {}", guest_profile.name);
        Ok(())
    }

    /// Updates the guest's ambient preferences (Real-time IoT Bridge Logic)
    /// @param new_prefs: The new JSON preference string (e.g., {"temp": 22, "light": "blue"})
    pub fn update_preferences(ctx: Context<UpdatePreferences>, new_prefs: String) -> Result<()> {
        // 1. Parameter validation: Check if preferences fit in allocated space (Max 500 characters/bytes)
        // 500 bytes is sufficient for a complex environment config JSON
        require!(new_prefs.as_bytes().len() <= 500, OrinError::PrefsTooLong);

        let guest_profile = &mut ctx.accounts.guest_profile;

        // 2. Update preferences
        guest_profile.preferences = new_prefs;

        // 3. Automatically increment room adjustments count (simplified logic: each update represents an environmental activation)
        guest_profile.stay_count += 1;

        msg!("Preferences updated for Guest: {}", guest_profile.name);
        Ok(())
    }
}

/// ---------------------------
/// Contexts & Access Control
/// ---------------------------

#[derive(Accounts)]
#[instruction(email_hash: [u8; 32])]
pub struct InitializeGuest<'info> {
    // PDA (Program Derived Address) design:
    // Seeds combine "guest" + user's email hash, ensuring one email maps to exactly one identity account
    #[account(
        init,
        payer = user,
        // Space calculation: 8 (discriminator) + 32 (pubkey) + 32 (hash) + 4+100 (name) + 4+500 (prefs) + 8 (u64) + 4 (u32)
        space = 8 + 32 + 32 + (4 + 100) + (4 + 500) + 8 + 4,
        seeds = [b"guest", email_hash.as_ref()],
        bump
    )]
    pub guest_profile: Account<'info, GuestIdentity>,

    #[account(mut)]
    pub user: Signer<'info>, // The wallet paying for account creation (could be the app's feepayer in AA)

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePreferences<'info> {
    // Access control core: has_one = owner
    // This enforces `guest_profile.owner == owner.key`
    // Only the "account creator" has permission to modify preferences, preventing unauthorized tampering
    #[account(
        mut,
        has_one = owner @ OrinError::UnauthorizedAccess
    )]
    pub guest_profile: Account<'info, GuestIdentity>,

    pub owner: Signer<'info>, // Must be the signature of the account owner
}

/// ---------------------------
/// Data Structures (State)
/// ---------------------------

#[account]
pub struct GuestIdentity {
    pub owner: Pubkey,          // 32 bytes: Account owner (AA context or private key wallet)
    pub email_hash: [u8; 32],   // 32 bytes: Associated email hash
    pub name: String,           // 4 + 100 bytes: User's name/nickname
    pub preferences: String,    // 4 + 500 bytes: Environment preferences JSON string
    pub loyalty_points: u64,    // 8 bytes: Loyalty points (for future Phase extensions)
    pub stay_count: u32,        // 4 bytes: Number of stays/activations
}

/// ---------------------------
/// Error Handling
/// ---------------------------

#[error_code]
pub enum OrinError {
    #[msg("The provided name is too long. Please limit to 100 characters.")]
    NameTooLong,
    #[msg("The preferences configuration data exceeds the maximum allowed size (500 characters).")]
    PrefsTooLong,
    #[msg("Identity verification failed: Only the owner of this account can modify its data.")]
    UnauthorizedAccess,
}
