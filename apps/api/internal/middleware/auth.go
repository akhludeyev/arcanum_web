package middleware

import (
	"net/http"
	"strings"

	"arcanum/internal/config"
	"arcanum/internal/utils"

	"github.com/gin-gonic/gin"
)

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

		// Валидируем токен используя утилиту
		claims, err := utils.ValidateToken(tokenString, cfg.Secret)
		if err != nil {
			if err == utils.ErrExpiredToken {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Token has expired"})
			} else {
				c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			}
			c.Abort()
			return
		}

		// Сохраняем данные пользователя в контексте
		c.Set("userID", claims.UserID)
		c.Set("email", claims.Email)
		c.Next()
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
