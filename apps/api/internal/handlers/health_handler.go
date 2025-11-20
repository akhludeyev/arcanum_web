package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/akhludeyev/arcanum/api/internal/database"
)

type HealthHandler struct {
	db    *database.Database
	redis *database.RedisClient
}

func NewHealthHandler(db *database.Database, redis *database.RedisClient) *HealthHandler {
	return &HealthHandler{
		db:    db,
		redis: redis,
	}
}

// Health godoc
// @Summary Health check
// @Description Check the health of the API and its dependencies
// @Tags health
// @Produce json
// @Success 200 {object} HealthResponse
// @Failure 503 {object} HealthResponse
// @Router /health [get]
func (h *HealthHandler) Health(c *gin.Context) {
	ctx := c.Request.Context()

	dbHealthy := h.db.HealthCheck(ctx) == nil
	redisHealthy := h.redis.HealthCheck(ctx) == nil

	status := "healthy"
	httpStatus := http.StatusOK

	if !dbHealthy || !redisHealthy {
		status = "unhealthy"
		httpStatus = http.StatusServiceUnavailable
	}

	response := HealthResponse{
		Status: status,
		Services: map[string]bool{
			"database": dbHealthy,
			"redis":    redisHealthy,
		},
	}

	c.JSON(httpStatus, response)
}

type HealthResponse struct {
	Status   string          `json:"status"`
	Services map[string]bool `json:"services"`
}
