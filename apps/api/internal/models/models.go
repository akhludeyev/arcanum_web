package models

import (
	"time"
)

type User struct {
	ID               string     `json:"id" db:"id"`
	Email            string     `json:"email" db:"email"`
	PasswordHash     string     `json:"-" db:"password_hash"`
	Name             string     `json:"name" db:"name"`
	IsPremium        bool       `json:"isPremium" db:"is_premium"`
	PremiumExpiresAt *time.Time `json:"premiumExpiresAt,omitempty" db:"premium_expires_at"`
	CreatedAt        time.Time  `json:"createdAt" db:"created_at"`
	UpdatedAt        time.Time  `json:"updatedAt" db:"updated_at"`
}

type CalculationType string

const (
	CalculationTypeMatrix        CalculationType = "matrix"
	CalculationTypePythagoras    CalculationType = "pythagoras"
	CalculationTypeCompatibility CalculationType = "compatibility"
	CalculationTypeChildRole     CalculationType = "child_role"
)

type Calculation struct {
	ID         string          `json:"id" db:"id"`
	UserID     string          `json:"userId" db:"user_id"`
	Type       CalculationType `json:"type" db:"type"`
	InputData  interface{}     `json:"inputData" db:"input_data"`
	ResultData interface{}     `json:"resultData" db:"result_data"`
	CreatedAt  time.Time       `json:"createdAt" db:"created_at"`
}

type SubscriptionStatus string

const (
	SubscriptionStatusActive  SubscriptionStatus = "active"
	SubscriptionStatusCanceled SubscriptionStatus = "canceled"
	SubscriptionStatusExpired  SubscriptionStatus = "expired"
	SubscriptionStatusPastDue  SubscriptionStatus = "past_due"
)

type Subscription struct {
	ID                   string             `json:"id" db:"id"`
	UserID               string             `json:"userId" db:"user_id"`
	StripeCustomerID     string             `json:"stripeCustomerId,omitempty" db:"stripe_customer_id"`
	StripeSubscriptionID string             `json:"stripeSubscriptionId,omitempty" db:"stripe_subscription_id"`
	Status               SubscriptionStatus `json:"status" db:"status"`
	CurrentPeriodStart   *time.Time         `json:"currentPeriodStart,omitempty" db:"current_period_start"`
	CurrentPeriodEnd     *time.Time         `json:"currentPeriodEnd,omitempty" db:"current_period_end"`
	CancelAtPeriodEnd    bool               `json:"cancelAtPeriodEnd" db:"cancel_at_period_end"`
	CreatedAt            time.Time          `json:"createdAt" db:"created_at"`
	UpdatedAt            time.Time          `json:"updatedAt" db:"updated_at"`
}

type RefreshToken struct {
	ID        string    `json:"id" db:"id"`
	UserID    string    `json:"userId" db:"user_id"`
	Token     string    `json:"token" db:"token"`
	ExpiresAt time.Time `json:"expiresAt" db:"expires_at"`
	CreatedAt time.Time `json:"createdAt" db:"created_at"`
}
