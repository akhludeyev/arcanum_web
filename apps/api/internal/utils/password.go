package utils

import (
	"golang.org/x/crypto/bcrypt"
)

const (
	// DefaultCost - стандартная стоимость хеширования bcrypt
	DefaultCost = 12
)

// HashPassword хеширует пароль с использованием bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

// VerifyPassword проверяет соответствие пароля хешу
func VerifyPassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
