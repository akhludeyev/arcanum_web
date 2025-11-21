package database

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"

	"arcanum/internal/models"
)

var (
	ErrCalculationNotFound = errors.New("calculation not found")
)

type CalculationRepository struct {
	db *Database
}

func NewCalculationRepository(db *Database) *CalculationRepository {
	return &CalculationRepository{db: db}
}

// Create создает новый расчет
func (r *CalculationRepository) Create(ctx context.Context, calc *models.Calculation) error {
	query := `
		INSERT INTO calculations (id, user_id, type, input_data, result_data, created_at)
		VALUES ($1, $2, $3, $4, $5, $6)
	`

	inputDataJSON, err := json.Marshal(calc.InputData)
	if err != nil {
		return err
	}

	resultDataJSON, err := json.Marshal(calc.ResultData)
	if err != nil {
		return err
	}

	_, err = r.db.DB.ExecContext(ctx, query,
		calc.ID,
		calc.UserID,
		calc.Type,
		inputDataJSON,
		resultDataJSON,
		calc.CreatedAt,
	)

	return err
}

// FindByUserID находит все расчеты пользователя
func (r *CalculationRepository) FindByUserID(ctx context.Context, userID string, calcType *models.CalculationType) ([]*models.Calculation, error) {
	var query string
	var args []interface{}

	if calcType != nil {
		query = `
			SELECT id, user_id, type, input_data, result_data, created_at
			FROM calculations
			WHERE user_id = $1 AND type = $2
			ORDER BY created_at DESC
		`
		args = []interface{}{userID, *calcType}
	} else {
		query = `
			SELECT id, user_id, type, input_data, result_data, created_at
			FROM calculations
			WHERE user_id = $1
			ORDER BY created_at DESC
		`
		args = []interface{}{userID}
	}

	rows, err := r.db.DB.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var calculations []*models.Calculation
	for rows.Next() {
		calc := &models.Calculation{}
		var inputDataJSON, resultDataJSON []byte

		err := rows.Scan(
			&calc.ID,
			&calc.UserID,
			&calc.Type,
			&inputDataJSON,
			&resultDataJSON,
			&calc.CreatedAt,
		)
		if err != nil {
			return nil, err
		}

		// Парсим JSON данные
		if err := json.Unmarshal(inputDataJSON, &calc.InputData); err != nil {
			return nil, err
		}
		if err := json.Unmarshal(resultDataJSON, &calc.ResultData); err != nil {
			return nil, err
		}

		calculations = append(calculations, calc)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return calculations, nil
}

// FindByID находит расчет по ID
func (r *CalculationRepository) FindByID(ctx context.Context, id string) (*models.Calculation, error) {
	query := `
		SELECT id, user_id, type, input_data, result_data, created_at
		FROM calculations
		WHERE id = $1
	`

	calc := &models.Calculation{}
	var inputDataJSON, resultDataJSON []byte

	err := r.db.DB.QueryRowContext(ctx, query, id).Scan(
		&calc.ID,
		&calc.UserID,
		&calc.Type,
		&inputDataJSON,
		&resultDataJSON,
		&calc.CreatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, ErrCalculationNotFound
		}
		return nil, err
	}

	// Парсим JSON данные
	if err := json.Unmarshal(inputDataJSON, &calc.InputData); err != nil {
		return nil, err
	}
	if err := json.Unmarshal(resultDataJSON, &calc.ResultData); err != nil {
		return nil, err
	}

	return calc, nil
}

// Delete удаляет расчет
func (r *CalculationRepository) Delete(ctx context.Context, id, userID string) error {
	query := `
		DELETE FROM calculations
		WHERE id = $1 AND user_id = $2
	`

	result, err := r.db.DB.ExecContext(ctx, query, id, userID)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return ErrCalculationNotFound
	}

	return nil
}
