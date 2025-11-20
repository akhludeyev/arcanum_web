package middleware

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/akhludeyev/arcanum/api/internal/database"
)

// RateLimiter middleware для ограничения количества запросов
func RateLimiter(redis *database.RedisClient, requestsPerMinute int) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Получаем идентификатор клиента (IP или userID)
		identifier := c.ClientIP()
		if userID, exists := c.Get("userID"); exists {
			identifier = userID.(string)
		}

		key := fmt.Sprintf("rate_limit:%s", identifier)
		ctx := context.Background()

		// Проверяем текущее количество запросов
		count, err := redis.Client.Get(ctx, key).Int64()
		if err != nil && err.Error() != "redis: nil" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Rate limit check failed"})
			c.Abort()
			return
		}

		if count >= int64(requestsPerMinute) {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error":   "Rate limit exceeded",
				"message": fmt.Sprintf("Maximum %d requests per minute allowed", requestsPerMinute),
			})
			c.Abort()
			return
		}

		// Инкрементируем счетчик
		pipe := redis.Client.Pipeline()
		pipe.Incr(ctx, key)
		pipe.Expire(ctx, key, time.Minute)
		_, err = pipe.Exec(ctx)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Rate limit update failed"})
			c.Abort()
			return
		}

		c.Next()
	}
}
