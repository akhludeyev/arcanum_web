package config

import (
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	App      AppConfig
	Database DatabaseConfig
	Redis    RedisConfig
	JWT      JWTConfig
	CORS     CORSConfig
	Stripe   StripeConfig
	Logging  LoggingConfig
}

type AppConfig struct {
	Environment string
	Port        string
	APIVersion  string
}

type DatabaseConfig struct {
	URL                string
	MaxConnections     int
	MaxIdleConnections int
	MaxLifetime        time.Duration
}

type RedisConfig struct {
	URL      string
	Password string
	DB       int
}

type JWTConfig struct {
	Secret               string
	Expiration           time.Duration
	RefreshSecret        string
	RefreshExpiration    time.Duration
}

type CORSConfig struct {
	AllowedOrigins string
}

type StripeConfig struct {
	SecretKey     string
	WebhookSecret string
	PriceID       string
}

type LoggingConfig struct {
	Level string
}

func Load() (*Config, error) {
	// Load .env file if exists
	_ = godotenv.Load()

	config := &Config{
		App: AppConfig{
			Environment: getEnv("APP_ENV", "development"),
			Port:        getEnv("APP_PORT", "3001"),
			APIVersion:  getEnv("API_VERSION", "v1"),
		},
		Database: DatabaseConfig{
			URL:                getEnv("DATABASE_URL", ""),
			MaxConnections:     getEnvAsInt("DATABASE_MAX_CONNECTIONS", 10),
			MaxIdleConnections: getEnvAsInt("DATABASE_MAX_IDLE_CONNECTIONS", 5),
			MaxLifetime:        time.Duration(getEnvAsInt("DATABASE_MAX_LIFETIME_MINUTES", 30)) * time.Minute,
		},
		Redis: RedisConfig{
			URL:      getEnv("REDIS_URL", "redis://localhost:6379"),
			Password: getEnv("REDIS_PASSWORD", ""),
			DB:       getEnvAsInt("REDIS_DB", 0),
		},
		JWT: JWTConfig{
			Secret:            getEnv("JWT_SECRET", ""),
			Expiration:        parseDuration(getEnv("JWT_EXPIRATION", "15m")),
			RefreshSecret:     getEnv("REFRESH_TOKEN_SECRET", ""),
			RefreshExpiration: parseDuration(getEnv("REFRESH_TOKEN_EXPIRATION", "168h")),
		},
		CORS: CORSConfig{
			AllowedOrigins: getEnv("CORS_ALLOWED_ORIGINS", "http://localhost:5173"),
		},
		Stripe: StripeConfig{
			SecretKey:     getEnv("STRIPE_SECRET_KEY", ""),
			WebhookSecret: getEnv("STRIPE_WEBHOOK_SECRET", ""),
			PriceID:       getEnv("STRIPE_PRICE_ID", ""),
		},
		Logging: LoggingConfig{
			Level: getEnv("LOG_LEVEL", "info"),
		},
	}

	if err := config.Validate(); err != nil {
		return nil, err
	}

	return config, nil
}

func (c *Config) Validate() error {
	if c.Database.URL == "" {
		return fmt.Errorf("DATABASE_URL is required")
	}
	if len(c.JWT.Secret) < 32 {
		return fmt.Errorf("JWT_SECRET must be at least 32 characters")
	}
	if len(c.JWT.RefreshSecret) < 32 {
		return fmt.Errorf("REFRESH_TOKEN_SECRET must be at least 32 characters")
	}
	return nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvAsInt(key string, defaultValue int) int {
	valueStr := getEnv(key, "")
	if value, err := strconv.Atoi(valueStr); err == nil {
		return value
	}
	return defaultValue
}

func parseDuration(s string) time.Duration {
	duration, err := time.ParseDuration(s)
	if err != nil {
		return 15 * time.Minute
	}
	return duration
}
