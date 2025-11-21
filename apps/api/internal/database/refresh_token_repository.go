package database

import (
	"context"
	"database/sql"
	"errors"

	"arcanum/internal/models"
)

var (
	ErrRefreshTokenNotFound = errors.New("refresh token not found")
)

type RefreshTokenRepository struct {
	db *Database
}

func NewRefreshTokenRepository(db *Database) *RefreshTokenRepository {
	return &RefreshTokenRepository{db: db}
}

// Create создает новый refresh токен
func (r *RefreshTokenRepository) Create(ctx context.Context, token *models.RefreshToken) error {
	query := `
		INSERT INTO refresh_tokens (id, user_id, token, expires_at, created_at)
		VALUES ($1, $2, $3, $4, $5)
	`

	_, err := r.db.DB.ExecContext(ctx, query,
		token.ID,
		token.UserID,
		token.Token,
		token.ExpiresAt,
		token.CreatedAt,
	)

	return err
}

// FindByToken находит refresh токен
func (r *RefreshTokenRepository) FindByToken(ctx context.Context, token string) (*models.RefreshToken, error) {
	query := `
		SELECT id, user_id, token, expires_at, created_at
		FROM refresh_tokens
		WHERE token = $1
	`

	rt := &models.RefreshToken{}
	err := r.db.DB.QueryRowContext(ctx, query, token).Scan(
		&rt.ID,
		&rt.UserID,
		&rt.Token,
		&rt.ExpiresAt,
		&rt.CreatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrRefreshTokenNotFound
		}
		return nil, err
	}

	return rt, nil
}

// DeleteByToken удаляет refresh токен
func (r *RefreshTokenRepository) DeleteByToken(ctx context.Context, token string) error {
	query := `
		DELETE FROM refresh_tokens
		WHERE token = $1
	`

	result, err := r.db.DB.ExecContext(ctx, query, token)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrRefreshTokenNotFound
	}

	return nil
}

// DeleteByUserID удаляет все refresh токены пользователя
func (r *RefreshTokenRepository) DeleteByUserID(ctx context.Context, userID string) error {
	query := `
		DELETE FROM refresh_tokens
		WHERE user_id = $1
	`

	_, err := r.db.DB.ExecContext(ctx, query, userID)
	return err
}
