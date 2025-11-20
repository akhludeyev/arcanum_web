package middleware

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/akhludeyev/arcanum/api/internal/config"
)

type Claims struct {
	UserID    string `json:"userId"`
	Email     string `json:"email"`
	IsPremium bool   `json:"isPremium"`
	jwt.RegisteredClaims
}

func JWTAuth(cfg *config.JWTConfig) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		// Извлекаем токен из заголовка "Bearer <token>"
		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization header format"})
			c.Abort()
			return
		}

		tokenString := parts[1]

		// Парсим и валидируем токен
		token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(cfg.Secret), nil
		})

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(*Claims); ok && token.Valid {
			// Сохраняем данные пользователя в контексте
			c.Set("userID", claims.UserID)
			c.Set("email", claims.Email)
			c.Set("isPremium", claims.IsPremium)
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}
	}
}

// RequirePremium проверяет наличие Premium подписки
func RequirePremium() gin.HandlerFunc {
	return func(c *gin.Context) {
		isPremium, exists := c.Get("isPremium")
		if !exists || !isPremium.(bool) {
			c.JSON(http.StatusForbidden, gin.H{
				"error":   "Premium subscription required",
				"message": "This feature is only available for Premium users",
			})
			c.Abort()
			return
		}
		c.Next()
	}
}
